import { dbd } from "$lib/data/dexie.js";
import { dbf } from "$lib/data/firebase.js";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";
import { browser } from "$app/environment";

class DataManager {
  constructor() {
    this.syncQueue = new Map(); // Queue for pending sync operations
    this.listeners = new Map(); // Active Firestore listeners
    this.syncInProgress = new Set(); // Track ongoing syncs to prevent conflicts
    this.retryQueue = new Map(); // Failed operations for retry
    this.maxRetries = 3;
    this.retryDelay = 1000; // Base delay in ms

    // Initialize background sync when online
    if (browser) {
      this.initializeBackgroundSync();
      this.setupNetworkListeners();
    }
  }

  /**
   * Validate docId format (last 5 characters should be mm-yy with year > 2023)
   * @param {string} docId - Document ID to validate
   * @returns {boolean} True if valid format and year > 2023
   */
  validateDocIdFormat(docId) {
    if (!docId || docId.length < 5) return false;

    const last5 = docId.slice(-5);
    const pattern = /^(\d{2})-(\d{2})$/;
    const match = last5.match(pattern);

    if (!match) return false;

    const month = parseInt(match[1], 10);
    const year = parseInt(match[2], 10);

    // Validate month (01-12)
    if (month < 1 || month > 12) return false;

    // Convert 2-digit year to full year (assuming 20xx)
    const fullYear = 2000 + year;

    // Check if year > 2023
    return fullYear > 2023;
  }

  /**
   * Load data with local-first strategy
   * @param {string} collection - Collection name
   * @param {string} docId - Document ID
   * @param {string} field - Field name to load
   * @param {Object} options - Load options
   * @returns {Promise<any>} The loaded data
   */
  async load(collection, docId, field, options = {}) {
    const {
      defaultValue = null,
      createIfMissing = false,
      throwIfMissing = false, // Changed default to false
      validateDocId = false,
      invalidDocIdFallback = {},
    } = options;

    try {
      // Validate docId format if requested
      if (validateDocId && !this.validateDocIdFormat(docId)) {
        console.warn(
          `Invalid docId format: ${docId}. Expected format: ...mm-yy with year > 2023`
        );
        return invalidDocIdFallback;
      }

      // 1. Try loading from local Dexie first (fastest)
      const localData = await this.loadFromLocal(collection, docId, field);

      if (localData && !this.isStale(localData)) {
        // Start background sync to check for updates
        this.backgroundSync(collection, docId, field);
        return localData.data;
      }

      // 2. If local data is stale or doesn't exist, try Firestore
      let remoteData = null;
      if (navigator.onLine) {
        try {
          remoteData = await this.loadFromRemote(collection, docId, field);
        } catch (error) {
          console.warn(`Failed to load from remote: ${error.message}`);
        }

        if (remoteData !== null) {
          // Cache in local storage
          await this.saveToLocal(collection, docId, field, remoteData);
          return remoteData;
        }
      }

      // 3. Fallback to local data even if stale
      if (localData) {
        console.warn(
          `Using stale data for ${collection}/${docId}.${field} - offline mode`
        );
        return localData.data;
      }

      // 4. Handle missing data - this is where the fix is
      if (createIfMissing) {
        // Double-check docId validity before creating
        if (validateDocId && !this.validateDocIdFormat(docId)) {
          console.warn(`Cannot create document with invalid docId: ${docId}`);
          return invalidDocIdFallback;
        }

        console.info(
          `Creating new document ${collection}/${docId}.${field} with default value`
        );

        // Create with defaultValue (even if null)
        const valueToCreate = defaultValue !== null ? defaultValue : {};
        await this.sync(collection, docId, field, valueToCreate);
        return valueToCreate;
      }

      // 5. Return default value if not throwing
      if (!throwIfMissing) {
        return defaultValue;
      }

      // 6. Only throw if explicitly requested
      throw new Error(`No data found for ${collection}/${docId}.${field}`);
    } catch (error) {
      // Handle specific "No data found" errors
      if (error.message.includes("No data found")) {
        if (!throwIfMissing) {
          return defaultValue;
        }
        throw error;
      }

      console.error(`Error loading ${collection}/${docId}.${field}:`, error);

      // Try fallback to local data
      try {
        const localData = await this.loadFromLocal(collection, docId, field);
        if (localData) {
          console.warn(`Using cached data due to error: ${error.message}`);
          return localData.data;
        }
      } catch (localError) {
        console.error("Failed to load from local cache:", localError);
      }

      // Final fallback
      if (!throwIfMissing) {
        return defaultValue;
      }

      throw error;
    }
  }

  /**
   * Sync data to both local and remote storage
   * @param {string} collection - Collection name
   * @param {string} docId - Document ID
   * @param {string} field - Field name
   * @param {any} data - Data to sync
   * @param {Object} options - Sync options
   * @returns {Promise<boolean>} Success status
   */
  async sync(collection, docId, field, data, options = {}) {
    const {
      immediate = false,
      skipLocal = false,
      skipRemote = false,
      retryOnFailure = true,
    } = options;

    const syncKey = `${collection}.${docId}.${field}`;

    try {
      // Prevent concurrent syncs of the same data
      if (this.syncInProgress.has(syncKey)) {
        await this.waitForSync(syncKey);
        return true;
      }

      this.syncInProgress.add(syncKey);

      // 1. Always save to local first (fastest, works offline)
      if (!skipLocal) {
        await this.saveToLocal(collection, docId, field, data);
      }

      // 2. Handle remote sync based on network status
      if (!skipRemote && navigator.onLine) {
        if (immediate) {
          await this.saveToRemote(collection, docId, field, data);
        } else {
          // Queue for background sync
          this.queueSync(collection, docId, field, data);
        }
      } else if (!skipRemote) {
        // Queue for when back online
        this.queueSync(collection, docId, field, data);
      }

      return true;
    } catch (error) {
      console.error(`Sync failed for ${syncKey}:`, error);

      if (retryOnFailure) {
        this.queueRetry(collection, docId, field, data, options);
      }

      throw error;
    } finally {
      this.syncInProgress.delete(syncKey);
    }
  }

  /**
   * Load data from local Dexie storage
   */
  async loadFromLocal(collection, docId, field) {
    try {
      const record = await dbd.syncCache
        .where(["collection", "docId", "field"])
        .equals([collection, docId, field])
        .first();

      return record;
    } catch (error) {
      console.error("Error loading from local storage:", error);
      return null;
    }
  }

  /**
   * Load data from Firestore
   */
  async loadFromRemote(collection, docId, field) {
    try {
      const docRef = doc(dbf, collection, docId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        // Handle case where field doesn't exist in document
        return data.hasOwnProperty(field) ? data[field] : null;
      }

      return null; // Document doesn't exist
    } catch (error) {
      console.error("Error loading from Firestore:", error);
      throw error;
    }
  }

  /**
   * Save data to local Dexie storage
   */
  async saveToLocal(collection, docId, field, data) {
    try {
      const record = {
        collection,
        docId,
        field,
        data,
        lastUpdated: Date.now(),
        synced: false,
      };

      await dbd.syncCache.put(record);
    } catch (error) {
      console.error("Error saving to local storage:", error);
      throw error;
    }
  }

  /**
   * Save data to Firestore
   */
  async saveToRemote(collection, docId, field, data) {
    try {
      const docRef = doc(dbf, collection, docId);

      // Use updateDoc for better performance if document exists
      try {
        await updateDoc(docRef, {
          [field]: data,
          [`${field}_lastUpdated`]: serverTimestamp(),
        });
      } catch (updateError) {
        // Document might not exist, create it
        await setDoc(
          docRef,
          {
            [field]: data,
            [`${field}_lastUpdated`]: serverTimestamp(),
          },
          { merge: true }
        );
      }

      // Mark as synced in local storage
      await this.markAsSynced(collection, docId, field);
    } catch (error) {
      console.error("Error saving to Firestore:", error);
      throw error;
    }
  }

  /**
   * Check if local data is stale
   */
  isStale(localData, maxAge = 5 * 60 * 1000) {
    // 5 minutes default
    if (!localData.lastUpdated) return true;
    return Date.now() - localData.lastUpdated > maxAge;
  }

  /**
   * Background sync without blocking UI
   */
  async backgroundSync(collection, docId, field) {
    setTimeout(async () => {
      try {
        const remoteData = await this.loadFromRemote(collection, docId, field);
        const localData = await this.loadFromLocal(collection, docId, field);

        // Only update if remote data is newer
        if (remoteData && (!localData || this.isNewer(remoteData, localData))) {
          await this.saveToLocal(collection, docId, field, remoteData);
          // Emit event for UI updates
          this.emitDataUpdate(collection, docId, field, remoteData);
        }
      } catch (error) {
        console.warn("Background sync failed:", error);
      }
    }, 0);
  }

  /**
   * Queue sync operation for later execution
   */
  queueSync(collection, docId, field, data) {
    const syncKey = `${collection}.${docId}.${field}`;
    this.syncQueue.set(syncKey, {
      collection,
      docId,
      field,
      data,
      timestamp: Date.now(),
    });
  }

  /**
   * Process sync queue
   */
  async processSyncQueue() {
    if (!navigator.onLine || this.syncQueue.size === 0) return;

    const syncPromises = [];

    for (const [syncKey, { collection, docId, field, data }] of this
      .syncQueue) {
      syncPromises.push(
        this.saveToRemote(collection, docId, field, data)
          .then(() => {
            this.syncQueue.delete(syncKey);
            this.retryQueue.delete(syncKey);
          })
          .catch((error) => {
            console.error(`Queue sync failed for ${syncKey}:`, error);
            this.queueRetry(collection, docId, field, data);
          })
      );
    }

    await Promise.allSettled(syncPromises);
  }

  /**
   * Queue failed operation for retry
   */
  queueRetry(collection, docId, field, data, options = {}, attempt = 1) {
    if (attempt > this.maxRetries) return;

    const syncKey = `${collection}.${docId}.${field}`;
    const delay = this.retryDelay * Math.pow(2, attempt - 1); // Exponential backoff

    setTimeout(() => {
      this.sync(collection, docId, field, data, {
        ...options,
        retryOnFailure: false,
      }).catch(() => {
        this.queueRetry(collection, docId, field, data, options, attempt + 1);
      });
    }, delay);
  }

  /**
   * Setup real-time listeners for specific documents
   */
  setupRealtimeListener(collection, docId, field, callback) {
    const listenerKey = `${collection}.${docId}.${field}`;

    if (this.listeners.has(listenerKey)) {
      this.listeners.get(listenerKey)(); // Unsubscribe existing
    }

    const docRef = doc(dbf, collection, docId);
    const unsubscribe = onSnapshot(
      docRef,
      (doc) => {
        if (doc.exists()) {
          const data = doc.data();
          if (data[field] !== undefined) {
            // Update local cache
            this.saveToLocal(collection, docId, field, data[field]);
            // Notify callback
            callback(data[field]);
          }
        }
      },
      (error) => {
        console.error("Realtime listener error:", error);
      }
    );

    this.listeners.set(listenerKey, unsubscribe);
    return unsubscribe;
  }

  /**
   * Initialize background processes
   */
  initializeBackgroundSync() {
    // Process sync queue every 30 seconds
    setInterval(() => {
      this.processSyncQueue();
    }, 30000);

    // Process retry queue every 60 seconds
    setInterval(() => {
      this.processRetryQueue();
    }, 60000);
  }

  /**
   * Setup network status listeners
   */
  setupNetworkListeners() {
    window.addEventListener("online", () => {
      console.log("Network restored, processing sync queue...");
      this.processSyncQueue();
    });

    window.addEventListener("offline", () => {
      console.log("Network lost, queueing operations...");
    });
  }

  /**
   * Utility methods
   */
  async markAsSynced(collection, docId, field) {
    try {
      await dbd.syncCache
        .where(["collection", "docId", "field"])
        .equals([collection, docId, field])
        .modify({ synced: true });
    } catch (error) {
      console.error("Error marking as synced:", error);
    }
  }

  isNewer(remoteData, localData) {
    // Implement your logic to compare timestamps
    // This depends on your data structure
    return true; // Simplified for example
  }

  async waitForSync(syncKey) {
    return new Promise((resolve) => {
      const checkInterval = setInterval(() => {
        if (!this.syncInProgress.has(syncKey)) {
          clearInterval(checkInterval);
          resolve();
        }
      }, 100);
    });
  }

  emitDataUpdate(collection, docId, field, data) {
    // Emit custom event for reactive UI updates
    if (browser && window.dispatchEvent) {
      window.dispatchEvent(
        new CustomEvent("dataUpdate", {
          detail: { collection, docId, field, data },
        })
      );
    }
  }

  async processRetryQueue() {
    // Process any remaining retry operations
    for (const [syncKey, { collection, docId, field, data, attempt }] of this
      .retryQueue) {
      if (attempt <= this.maxRetries) {
        this.queueRetry(collection, docId, field, data, {}, attempt);
      } else {
        this.retryQueue.delete(syncKey);
      }
    }
  }

  /**
   * Clean up resources
   */
  cleanup() {
    // Unsubscribe all listeners
    for (const unsubscribe of this.listeners.values()) {
      unsubscribe();
    }
    this.listeners.clear();
  }

  /**
   * Get sync status for debugging
   */
  getSyncStatus() {
    return {
      queueSize: this.syncQueue.size,
      activeListeners: this.listeners.size,
      activeSyncs: this.syncInProgress.size,
      retryQueue: this.retryQueue.size,
    };
  }
}

export const dataManager = new DataManager();
