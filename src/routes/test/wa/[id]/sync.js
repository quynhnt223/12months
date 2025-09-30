import { dbd } from "$lib/data/dexie.js";
import { dbf } from "$lib/data/firebase.js";
import { doc, setDoc, getDoc } from "firebase/firestore";

class DataManager {
  async load(docId, field) {
    //load from local dexie first for fast
  }
  async sync(docId, field, data) {}

  async loadFromLocal() {}
  async saveToLocal() {}
  async loadFromFirestore() {}
  async saveToFirestore() {}
  async backgroundSync() {}
  async processSyncQueue() {}
  async markAsSynced() {}
  async waitForSync() {}
  setupRealtimeListener() {}
  setupNetworkListeners() {}
  initializeBackgroundSync() {}
  queueRetry() {}
  queueSync() {}
  getSyncStatus() {}
}

export const dataManager = new DataManager();
