import { dbd } from "$lib/data/dexie.js";
import { dbf } from "$lib/data/firebase.js";
class DataManager {
  constructor() {}

  async load() {
    // 1. load from local first
    if ("localData") {
      return "localData.data";
    }
    // 2. handle missing data

    // 3.
  }
  async sync() {}
  async loadFromLocal(docId) {
    try {
    } catch {
      console.log("Error saving to local storage2:", error);
      alert("⚠️ Error loading from local storage. Please try again later.");
    }
  }
  async saveToLocal(docId, days) {
    try {
      const record = {
        docId,
        days,
        lastUpdated: Date.now(),
      };

      await dbd.docs.put(record);
    } catch (error) {
      console.log("Error saving to local storage2:", error);
      alert("⚠️ Could not save to local storage. Please try again later.");
    }
  }
  async loadFromRemote() {}
  async saveToRemote() {}
  isNewr() {}
}

export const dataManager = new DataManager();
