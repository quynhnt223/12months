import { writable } from "svelte/store";
import Dexie from "dexie";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  onSnapshot,
  setDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  enableNetwork,
  disableNetwork,
} from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  // Add your Firebase config here
  apiKey: "AIzaSyDqVCdfvYLwD9WE4bJOcOzZEbRL2QEGTF8",
  authDomain: "project-12months.firebaseapp.com",
  projectId: "project-12months",
  storageBucket: "project-12months.firebasestorage.app",
  messagingSenderId: "184768465546",
  appId: "1:184768465546:web:35ecf9516176f81fb17b73",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Initialize Dexie (IndexedDB)
class SyncDatabase extends Dexie {
  constructor() {
    super("SyncDatabase1");
    this.version(1).stores({
      items:
        "++id, firebaseId, title, content, lastModified, syncStatus, deleted",
      syncQueue: "++id, action, collection, docId, data, timestamp, retryCount",
    });
  }
}

const localDB = new SyncDatabase();

// Sync statuses
const SYNC_STATUS = {
  SYNCED: "synced",
  PENDING: "pending",
  CONFLICT: "conflict",
  ERROR: "error",
};

// Queue actions
const QUEUE_ACTIONS = {
  CREATE: "create",
  UPDATE: "update",
  DELETE: "delete",
};

// Svelte stores
export const items = writable([]);
export const syncStatus = writable("offline");
export const isOnline = writable(navigator.onLine);
export const pendingChanges = writable(0);

// Connection status tracking
let isConnected = navigator.onLine;
let firestoreListeners = new Map();

// Update online status
window.addEventListener("online", () => {
  isConnected = true;
  isOnline.set(true);
  enableNetwork(db);
  processSyncQueue();
});

window.addEventListener("offline", () => {
  isConnected = false;
  isOnline.set(false);
  disableNetwork(db);
});

class DataSync {
  constructor() {
    this.initialize();
  }

  async initialize() {
    try {
      // Load local data first for immediate UI rendering
      await this.loadLocalData();

      // Set up Firestore listeners if online
      if (isConnected) {
        await this.setupFirestoreListeners();
        await this.processSyncQueue();
      }

      // Update sync status
      this.updateSyncStatus();
    } catch (error) {
      console.error("Sync initialization error:", error);
      syncStatus.set("error");
    }
  }

  // Load data from local IndexedDB
  async loadLocalData() {
    try {
      const localItems = await localDB.items
        .where("deleted")
        .notEqual(true)
        .toArray();

      items.set(localItems);
    } catch (error) {
      console.error("Error loading local data:", error);
    }
  }

  // Set up real-time Firestore listeners
  async setupFirestoreListeners() {
    try {
      const itemsQuery = query(
        collection(db, "items"),
        orderBy("lastModified", "desc")
      );

      const unsubscribe = onSnapshot(
        itemsQuery,
        (snapshot) => this.handleFirestoreSnapshot(snapshot),
        (error) => {
          console.error("Firestore listener error:", error);
          syncStatus.set("error");
        }
      );

      firestoreListeners.set("items", unsubscribe);
      syncStatus.set("online");
    } catch (error) {
      console.error("Error setting up Firestore listeners:", error);
      syncStatus.set("error");
    }
  }

  // Handle Firestore snapshot updates
  async handleFirestoreSnapshot(snapshot) {
    const batch = [];

    snapshot.docChanges().forEach((change) => {
      const docData = {
        firebaseId: change.doc.id,
        ...change.doc.data(),
        lastModified: change.doc.data().lastModified?.toMillis() || Date.now(),
      };

      switch (change.type) {
        case "added":
        case "modified":
          batch.push(this.mergeRemoteData(docData));
          break;
        case "removed":
          batch.push(this.handleRemoteDelete(change.doc.id));
          break;
      }
    });

    await Promise.all(batch);
    await this.loadLocalData(); // Refresh UI
  }

  // Merge remote data with local data
  async mergeRemoteData(remoteData) {
    try {
      const existingItem = await localDB.items
        .where("firebaseId")
        .equals(remoteData.firebaseId)
        .first();

      if (!existingItem) {
        // New item from remote
        await localDB.items.add({
          ...remoteData,
          syncStatus: SYNC_STATUS.SYNCED,
        });
      } else {
        // Check for conflicts
        const localModified = existingItem.lastModified;
        const remoteModified = remoteData.lastModified;

        if (
          existingItem.syncStatus === SYNC_STATUS.PENDING &&
          remoteModified > localModified
        ) {
          // Conflict detected - remote wins for now
          await localDB.items.update(existingItem.id, {
            ...remoteData,
            syncStatus: SYNC_STATUS.CONFLICT,
          });
        } else if (existingItem.syncStatus === SYNC_STATUS.SYNCED) {
          // Safe to update
          await localDB.items.update(existingItem.id, {
            ...remoteData,
            syncStatus: SYNC_STATUS.SYNCED,
          });
        }
      }
    } catch (error) {
      console.error("Error merging remote data:", error);
    }
  }

  // Handle remote delete
  async handleRemoteDelete(firebaseId) {
    try {
      const existingItem = await localDB.items
        .where("firebaseId")
        .equals(firebaseId)
        .first();

      if (existingItem) {
        await localDB.items.update(existingItem.id, {
          deleted: true,
          syncStatus: SYNC_STATUS.SYNCED,
        });
      }
    } catch (error) {
      console.error("Error handling remote delete:", error);
    }
  }

  // Create new item
  async createItem(itemData) {
    try {
      const newItem = {
        ...itemData,
        id: Date.now(), // Temporary local ID
        lastModified: Date.now(),
        syncStatus: isConnected ? SYNC_STATUS.PENDING : SYNC_STATUS.PENDING,
        deleted: false,
      };

      // Add to local DB first
      const localId = await localDB.items.add(newItem);

      // Add to sync queue
      await this.addToSyncQueue(QUEUE_ACTIONS.CREATE, "items", null, {
        ...newItem,
        localId,
      });

      // Try immediate sync if online
      if (isConnected) {
        await this.processSyncQueue();
      }

      await this.loadLocalData();
      return localId;
    } catch (error) {
      console.error("Error creating item:", error);
      throw error;
    }
  }

  // Update existing item
  async updateItem(localId, updates) {
    try {
      const existingItem = await localDB.items.get(localId);
      if (!existingItem) {
        throw new Error("Item not found");
      }

      const updatedItem = {
        ...existingItem,
        ...updates,
        lastModified: Date.now(),
        syncStatus: SYNC_STATUS.PENDING,
      };

      // Update local DB
      await localDB.items.update(localId, updatedItem);

      // Add to sync queue
      await this.addToSyncQueue(
        QUEUE_ACTIONS.UPDATE,
        "items",
        existingItem.firebaseId,
        updatedItem
      );

      // Try immediate sync if online
      if (isConnected) {
        await this.processSyncQueue();
      }

      await this.loadLocalData();
    } catch (error) {
      console.error("Error updating item:", error);
      throw error;
    }
  }

  // Delete item
  async deleteItem(localId) {
    try {
      const existingItem = await localDB.items.get(localId);
      if (!existingItem) {
        return;
      }

      // Mark as deleted locally
      await localDB.items.update(localId, {
        deleted: true,
        lastModified: Date.now(),
        syncStatus: SYNC_STATUS.PENDING,
      });

      // Add to sync queue if it exists in Firebase
      if (existingItem.firebaseId) {
        await this.addToSyncQueue(
          QUEUE_ACTIONS.DELETE,
          "items",
          existingItem.firebaseId,
          null
        );
      }

      // Try immediate sync if online
      if (isConnected) {
        await this.processSyncQueue();
      }

      await this.loadLocalData();
    } catch (error) {
      console.error("Error deleting item:", error);
      throw error;
    }
  }

  // Add operation to sync queue
  async addToSyncQueue(action, collection, docId, data) {
    try {
      await localDB.syncQueue.add({
        action,
        collection,
        docId,
        data,
        timestamp: Date.now(),
        retryCount: 0,
      });

      this.updatePendingChangesCount();
    } catch (error) {
      console.error("Error adding to sync queue:", error);
    }
  }

  // Process sync queue
  async processSyncQueue() {
    if (!isConnected) {
      return;
    }

    try {
      const queueItems = await localDB.syncQueue.orderBy("timestamp").toArray();

      for (const queueItem of queueItems) {
        try {
          await this.processSyncQueueItem(queueItem);
          await localDB.syncQueue.delete(queueItem.id);
        } catch (error) {
          console.error("Error processing queue item:", error);

          // Increment retry count
          await localDB.syncQueue.update(queueItem.id, {
            retryCount: (queueItem.retryCount || 0) + 1,
          });

          // Remove from queue if too many retries
          if (queueItem.retryCount >= 3) {
            await localDB.syncQueue.delete(queueItem.id);

            // Mark local item as error
            if (queueItem.data && queueItem.data.localId) {
              await localDB.items.update(queueItem.data.localId, {
                syncStatus: SYNC_STATUS.ERROR,
              });
            }
          }
        }
      }

      this.updatePendingChangesCount();
      await this.loadLocalData();
    } catch (error) {
      console.error("Error processing sync queue:", error);
    }
  }

  // Process individual sync queue item
  async processSyncQueueItem(queueItem) {
    const { action, collection, docId, data } = queueItem;

    switch (action) {
      case QUEUE_ACTIONS.CREATE:
        await this.syncCreate(collection, data);
        break;
      case QUEUE_ACTIONS.UPDATE:
        await this.syncUpdate(collection, docId, data);
        break;
      case QUEUE_ACTIONS.DELETE:
        await this.syncDelete(collection, docId);
        break;
    }
  }

  // Sync create operation
  async syncCreate(collection, data) {
    const firebaseData = {
      title: data.title,
      content: data.content,
      lastModified: serverTimestamp(),
    };

    const docRef = doc(db, collection);
    await setDoc(docRef, firebaseData);

    // Update local item with Firebase ID
    if (data.localId) {
      await localDB.items.update(data.localId, {
        firebaseId: docRef.id,
        syncStatus: SYNC_STATUS.SYNCED,
      });
    }
  }

  // Sync update operation
  async syncUpdate(collection, docId, data) {
    const firebaseData = {
      title: data.title,
      content: data.content,
      lastModified: serverTimestamp(),
    };

    await setDoc(doc(db, collection, docId), firebaseData, { merge: true });

    // Update local sync status
    const localItem = await localDB.items
      .where("firebaseId")
      .equals(docId)
      .first();

    if (localItem) {
      await localDB.items.update(localItem.id, {
        syncStatus: SYNC_STATUS.SYNCED,
      });
    }
  }

  // Sync nested field update operation
  async syncUpdateNested(collection, docId, data) {
    const { fieldPath, value } = data;

    // Create the update object for Firestore
    const updateData = {
      [fieldPath]: value,
      lastModified: serverTimestamp(),
    };

    await setDoc(doc(db, collection, docId), updateData, { merge: true });

    // Update local sync status
    const localItem = await localDB.items
      .where("firebaseId")
      .equals(docId)
      .first();

    if (localItem) {
      await localDB.items.update(localItem.id, {
        syncStatus: SYNC_STATUS.SYNCED,
      });
    }
  }

  // Sync delete operation
  async syncDelete(collection, docId) {
    await deleteDoc(doc(db, collection, docId));
  }

  // Update pending changes count
  async updatePendingChangesCount() {
    try {
      const count = await localDB.syncQueue.count();
      pendingChanges.set(count);
    } catch (error) {
      console.error("Error updating pending changes count:", error);
    }
  }

  // Update sync status
  updateSyncStatus() {
    if (!isConnected) {
      syncStatus.set("offline");
    } else {
      syncStatus.set("online");
    }
  }

  // Manual sync trigger
  async forcSync() {
    if (isConnected) {
      await this.processSyncQueue();
      syncStatus.set("syncing");
      setTimeout(() => {
        this.updateSyncStatus();
      }, 1000);
    }
  }

  // Clear all data (useful for logout)
  async clearAllData() {
    try {
      // Clear local database
      await localDB.items.clear();
      await localDB.syncQueue.clear();

      // Clear Svelte stores
      items.set([]);
      pendingChanges.set(0);

      // Unsubscribe from Firestore listeners
      firestoreListeners.forEach((unsubscribe) => unsubscribe());
      firestoreListeners.clear();

      syncStatus.set("offline");
    } catch (error) {
      console.error("Error clearing data:", error);
    }
  }

  // Get sync statistics
  async getSyncStats() {
    try {
      const totalItems = await localDB.items.count();
      const pendingItems = await localDB.items
        .where("syncStatus")
        .equals(SYNC_STATUS.PENDING)
        .count();
      const conflictItems = await localDB.items
        .where("syncStatus")
        .equals(SYNC_STATUS.CONFLICT)
        .count();
      const queuedOperations = await localDB.syncQueue.count();

      return {
        totalItems,
        pendingItems,
        conflictItems,
        queuedOperations,
        isOnline: isConnected,
      };
    } catch (error) {
      console.error("Error getting sync stats:", error);
      return null;
    }
  }
}

// Create and export sync instance
const dataSync = new DataSync();

export default dataSync;

// Export additional utilities
export { SYNC_STATUS, QUEUE_ACTIONS, localDB };
