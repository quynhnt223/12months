// sync.js - Offline-first data sync system for Svelte with Dexie.js and Firestore

import Dexie from "dexie";
import { writable, derived } from "svelte/store";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore";

// Configuration
const SYNC_CONFIG = {
  batchSize: 50,
  retryAttempts: 3,
  retryDelay: 1000,
  conflictResolution: "server-wins", // 'server-wins', 'client-wins', 'merge'
};

// Database Schema
class SyncDatabase extends Dexie {
  constructor() {
    super("SyncDB");
    this.version(1).stores({
      // Main data tables
      documents:
        "++id, firebaseId, collection, data, lastModified, syncStatus, version",
      // Sync metadata
      syncQueue:
        "++id, operation, collection, documentId, data, timestamp, retryCount",
      syncMetadata: "collection, lastSyncTimestamp, version",
    });
  }
}

const db = new SyncDatabase();

// Sync statuses
const SYNC_STATUS = {
  SYNCED: "synced",
  PENDING: "pending",
  CONFLICT: "conflict",
  ERROR: "error",
};

// Operations
const OPERATIONS = {
  CREATE: "create",
  UPDATE: "update",
  DELETE: "delete",
};

// Stores
export const isOnline = writable(navigator.onLine);
export const syncStatus = writable("idle"); // 'idle', 'syncing', 'error'
export const syncProgress = writable({ current: 0, total: 0 });

// Update online status
window.addEventListener("online", () => isOnline.set(true));
window.addEventListener("offline", () => isOnline.set(false));

class DataSyncManager {
  constructor(firestore) {
    this.firestore = firestore;
    this.listeners = new Map();
    this.syncInProgress = false;
    this.collections = new Map(); // Store collection configurations
  }

  // Register a collection for sync
  registerCollection(collectionName, config = {}) {
    const defaultConfig = {
      realtime: true,
      conflictResolution: SYNC_CONFIG.conflictResolution,
      transform: {
        toFirestore: (data) => this.flattenNestedData(data),
        fromFirestore: (data) => this.expandNestedData(data),
      },
      validation: (data) => true,
      indexes: [],
    };

    this.collections.set(collectionName, { ...defaultConfig, ...config });

    // Initialize sync metadata
    this.initializeSyncMetadata(collectionName);
  }

  async initializeSyncMetadata(collectionName) {
    const existing = await db.syncMetadata.get(collectionName);
    if (!existing) {
      await db.syncMetadata.add({
        collection: collectionName,
        lastSyncTimestamp: 0,
        version: 1,
      });
    }
  }

  // Flatten nested data for Firestore storage
  flattenNestedData(data, prefix = "", result = {}) {
    for (const key in data) {
      const value = data[key];
      const newKey = prefix ? `${prefix}.${key}` : key;

      if (
        value &&
        typeof value === "object" &&
        !Array.isArray(value) &&
        !(value instanceof Date)
      ) {
        this.flattenNestedData(value, newKey, result);
      } else {
        result[newKey] = value;
      }
    }
    return result;
  }

  // Expand flattened data back to nested structure
  expandNestedData(flatData) {
    const result = {};

    for (const key in flatData) {
      const keys = key.split(".");
      let current = result;

      for (let i = 0; i < keys.length - 1; i++) {
        if (!(keys[i] in current)) {
          current[keys[i]] = {};
        }
        current = current[keys[i]];
      }

      current[keys[keys.length - 1]] = flatData[key];
    }

    return result;
  }

  // Create or update document (offline-first)
  async saveDocument(collectionName, documentId, data, options = {}) {
    const timestamp = Date.now();
    const version = await this.generateVersion();

    try {
      // Validate data if validator exists
      const config = this.collections.get(collectionName);
      if (config && config.validation && !config.validation(data)) {
        throw new Error("Data validation failed");
      }

      // Save to local database
      const localDoc = {
        firebaseId: documentId,
        collection: collectionName,
        data: data,
        lastModified: timestamp,
        syncStatus: SYNC_STATUS.PENDING,
        version: version,
      };

      const localId = await db.documents.put(localDoc);

      // Add to sync queue
      await this.addToSyncQueue(
        OPERATIONS.UPDATE,
        collectionName,
        documentId,
        data
      );

      // Attempt sync if online
      if (navigator.onLine && !options.offlineOnly) {
        this.syncDocument(collectionName, documentId);
      }

      return { id: localId, firebaseId: documentId, ...localDoc };
    } catch (error) {
      console.error("Error saving document:", error);
      throw error;
    }
  }

  // Delete document (offline-first)
  async deleteDocument(collectionName, documentId, options = {}) {
    try {
      // Mark as deleted locally
      await db.documents
        .where({ firebaseId: documentId, collection: collectionName })
        .modify({
          syncStatus: SYNC_STATUS.PENDING,
          lastModified: Date.now(),
        });

      // Add to sync queue
      await this.addToSyncQueue(OPERATIONS.DELETE, collectionName, documentId);

      // Attempt sync if online
      if (navigator.onLine && !options.offlineOnly) {
        this.syncDocument(collectionName, documentId);
      }
    } catch (error) {
      console.error("Error deleting document:", error);
      throw error;
    }
  }

  // Get documents from local database
  async getDocuments(collectionName, filters = {}) {
    try {
      let query = db.documents.where("collection").equals(collectionName);

      // Apply filters
      if (filters.where) {
        filters.where.forEach(([field, operator, value]) => {
          // Simple filtering - extend as needed
          if (operator === "==") {
            query = query.filter(
              (doc) => this.getNestedValue(doc.data, field) === value
            );
          }
        });
      }

      const documents = await query.toArray();
      return documents.filter(
        (doc) =>
          doc.syncStatus !== SYNC_STATUS.PENDING ||
          doc.operation !== OPERATIONS.DELETE
      );
    } catch (error) {
      console.error("Error getting documents:", error);
      throw error;
    }
  }

  // Get single document
  async getDocument(collectionName, documentId) {
    try {
      const doc = await db.documents
        .where({ firebaseId: documentId, collection: collectionName })
        .first();
      return doc;
    } catch (error) {
      console.error("Error getting document:", error);
      throw error;
    }
  }

  // Add operation to sync queue
  async addToSyncQueue(operation, collection, documentId, data = null) {
    await db.syncQueue.add({
      operation,
      collection,
      documentId,
      data,
      timestamp: Date.now(),
      retryCount: 0,
    });
  }

  // Sync single document
  async syncDocument(collectionName, documentId) {
    if (this.syncInProgress) return;

    try {
      const config = this.collections.get(collectionName);
      const localDoc = await this.getDocument(collectionName, documentId);

      if (!localDoc) return;

      const docRef = doc(this.firestore, collectionName, documentId);

      if (localDoc.syncStatus === SYNC_STATUS.PENDING) {
        // Transform data for Firestore if needed
        const firestoreData = config.transform
          ? config.transform.toFirestore(localDoc.data)
          : localDoc.data;

        // Add metadata
        firestoreData._lastModified = serverTimestamp();
        firestoreData._version = localDoc.version;

        await setDoc(docRef, firestoreData, { merge: true });

        // Update local status
        await db.documents.where("id").equals(localDoc.id).modify({
          syncStatus: SYNC_STATUS.SYNCED,
        });

        // Remove from sync queue
        await db.syncQueue
          .where({ collection: collectionName, documentId: documentId })
          .delete();
      }
    } catch (error) {
      console.error("Error syncing document:", error);

      // Mark as error status
      await db.documents
        .where({ firebaseId: documentId, collection: collectionName })
        .modify({ syncStatus: SYNC_STATUS.ERROR });
    }
  }

  // Full sync process
  async syncAll() {
    if (this.syncInProgress || !navigator.onLine) return;

    this.syncInProgress = true;
    syncStatus.set("syncing");

    try {
      // Sync pending local changes first
      await this.syncPendingChanges();

      // Then sync remote changes
      await this.syncRemoteChanges();

      syncStatus.set("idle");
    } catch (error) {
      console.error("Sync error:", error);
      syncStatus.set("error");
    } finally {
      this.syncInProgress = false;
    }
  }

  // Sync pending local changes to server
  async syncPendingChanges() {
    const pendingItems = await db.syncQueue.orderBy("timestamp").toArray();
    const total = pendingItems.length;

    for (let i = 0; i < pendingItems.length; i++) {
      const item = pendingItems[i];
      syncProgress.set({ current: i + 1, total });

      try {
        await this.processSyncQueueItem(item);
        await db.syncQueue.delete(item.id);
      } catch (error) {
        console.error("Error processing sync queue item:", error);

        // Increment retry count
        if (item.retryCount < SYNC_CONFIG.retryAttempts) {
          await db.syncQueue.update(item.id, {
            retryCount: item.retryCount + 1,
          });
        } else {
          // Max retries reached, remove from queue
          await db.syncQueue.delete(item.id);
        }
      }
    }

    syncProgress.set({ current: 0, total: 0 });
  }

  // Process individual sync queue item
  async processSyncQueueItem(item) {
    const { operation, collection, documentId, data } = item;
    const docRef = doc(this.firestore, collection, documentId);
    const config = this.collections.get(collection);

    switch (operation) {
      case OPERATIONS.CREATE:
      case OPERATIONS.UPDATE:
        const firestoreData = config.transform
          ? config.transform.toFirestore(data)
          : data;
        firestoreData._lastModified = serverTimestamp();
        await setDoc(docRef, firestoreData, { merge: true });
        break;

      case OPERATIONS.DELETE:
        await deleteDoc(docRef);
        await db.documents
          .where({ firebaseId: documentId, collection })
          .delete();
        break;
    }
  }

  // Sync remote changes to local
  async syncRemoteChanges() {
    for (const [collectionName, config] of this.collections) {
      await this.syncCollectionFromRemote(collectionName, config);
    }
  }

  async syncCollectionFromRemote(collectionName, config) {
    const metadata = await db.syncMetadata.get(collectionName);
    const collectionRef = collection(this.firestore, collectionName);

    // Get documents modified since last sync
    const q = query(
      collectionRef,
      where("_lastModified", ">", new Date(metadata.lastSyncTimestamp)),
      orderBy("_lastModified")
    );

    const snapshot = await getDocs(q);
    const batch = writeBatch(this.firestore);
    let hasChanges = false;

    for (const docSnapshot of snapshot.docs) {
      const remoteData = docSnapshot.data();
      const documentId = docSnapshot.id;

      // Transform data from Firestore if needed
      const localData = config.transform
        ? config.transform.fromFirestore(remoteData)
        : remoteData;

      // Check for local version
      const localDoc = await this.getDocument(collectionName, documentId);

      if (!localDoc) {
        // New document from server
        await db.documents.add({
          firebaseId: documentId,
          collection: collectionName,
          data: localData,
          lastModified: remoteData._lastModified?.toMillis() || Date.now(),
          syncStatus: SYNC_STATUS.SYNCED,
          version: remoteData._version || 1,
        });
      } else if (localDoc.syncStatus !== SYNC_STATUS.PENDING) {
        // Update existing document (no local changes)
        await db.documents.update(localDoc.id, {
          data: localData,
          lastModified: remoteData._lastModified?.toMillis() || Date.now(),
          syncStatus: SYNC_STATUS.SYNCED,
          version: remoteData._version || 1,
        });
      } else {
        // Conflict resolution needed
        await this.resolveConflict(localDoc, remoteData, config);
      }

      hasChanges = true;
    }

    if (hasChanges) {
      // Update last sync timestamp
      await db.syncMetadata.update(collectionName, {
        lastSyncTimestamp: Date.now(),
      });
    }
  }

  // Resolve conflicts between local and remote data
  async resolveConflict(localDoc, remoteData, config) {
    const strategy =
      config.conflictResolution || SYNC_CONFIG.conflictResolution;

    switch (strategy) {
      case "server-wins":
        const serverData = config.transform
          ? config.transform.fromFirestore(remoteData)
          : remoteData;
        await db.documents.update(localDoc.id, {
          data: serverData,
          syncStatus: SYNC_STATUS.SYNCED,
        });
        break;

      case "client-wins":
        // Keep local changes, they will be synced later
        break;

      case "merge":
        // Simple merge strategy - extend as needed
        const mergedData = { ...remoteData, ...localDoc.data };
        await db.documents.update(localDoc.id, {
          data: mergedData,
          syncStatus: SYNC_STATUS.PENDING, // Will need to sync merged data
        });
        break;

      default:
        await db.documents.update(localDoc.id, {
          syncStatus: SYNC_STATUS.CONFLICT,
        });
    }
  }

  // Start real-time listeners
  startRealtimeSync(collectionName) {
    if (this.listeners.has(collectionName)) return;

    const collectionRef = collection(this.firestore, collectionName);
    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      snapshot.docChanges().forEach(async (change) => {
        const documentId = change.doc.id;
        const data = change.doc.data();
        const config = this.collections.get(collectionName);

        if (change.type === "added" || change.type === "modified") {
          const localData = config.transform
            ? config.transform.fromFirestore(data)
            : data;

          const existingDoc = await this.getDocument(
            collectionName,
            documentId
          );

          if (!existingDoc) {
            await db.documents.add({
              firebaseId: documentId,
              collection: collectionName,
              data: localData,
              lastModified: data._lastModified?.toMillis() || Date.now(),
              syncStatus: SYNC_STATUS.SYNCED,
              version: data._version || 1,
            });
          } else if (existingDoc.syncStatus !== SYNC_STATUS.PENDING) {
            await db.documents.update(existingDoc.id, {
              data: localData,
              lastModified: data._lastModified?.toMillis() || Date.now(),
              syncStatus: SYNC_STATUS.SYNCED,
            });
          }
        }

        if (change.type === "removed") {
          await db.documents
            .where({ firebaseId: documentId, collection: collectionName })
            .delete();
        }
      });
    });

    this.listeners.set(collectionName, unsubscribe);
  }

  // Stop real-time listeners
  stopRealtimeSync(collectionName) {
    const unsubscribe = this.listeners.get(collectionName);
    if (unsubscribe) {
      unsubscribe();
      this.listeners.delete(collectionName);
    }
  }

  // Utility functions
  async generateVersion() {
    return Date.now();
  }

  getNestedValue(obj, path) {
    return path.split(".").reduce((current, key) => current?.[key], obj);
  }

  // Get sync statistics
  async getSyncStats() {
    const pendingCount = await db.syncQueue.count();
    const conflictCount = await db.documents
      .where("syncStatus")
      .equals(SYNC_STATUS.CONFLICT)
      .count();
    const errorCount = await db.documents
      .where("syncStatus")
      .equals(SYNC_STATUS.ERROR)
      .count();

    return {
      pending: pendingCount,
      conflicts: conflictCount,
      errors: errorCount,
    };
  }

  // Clear all local data (useful for logout)
  async clearAllData() {
    await db.documents.clear();
    await db.syncQueue.clear();
    await db.syncMetadata.clear();
  }
}

// Export singleton instance
export const createSyncManager = (firestore) => {
  return new DataSyncManager(firestore);
};

// Utility stores for reactive UI
export const createCollectionStore = (
  syncManager,
  collectionName,
  filters = {}
) => {
  const { subscribe, set } = writable([]);

  let unsubscribeTimer;

  const loadData = async () => {
    try {
      const documents = await syncManager.getDocuments(collectionName, filters);
      set(documents);
    } catch (error) {
      console.error("Error loading collection data:", error);
      set([]);
    }
  };

  // Load initial data
  loadData();

  // Auto-refresh every 5 seconds or when online status changes
  const startPolling = () => {
    unsubscribeTimer = setInterval(loadData, 5000);
  };

  const stopPolling = () => {
    if (unsubscribeTimer) {
      clearInterval(unsubscribeTimer);
    }
  };

  startPolling();

  return {
    subscribe,
    refresh: loadData,
    destroy: stopPolling,
  };
};

export default DataSyncManager;
