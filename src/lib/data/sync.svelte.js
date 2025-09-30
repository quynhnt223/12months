import { doc, getDoc } from "firebase/firestore";
import { dbf } from "$lib/data/firebase.js";
import { dbd } from "$lib/data/dexie.js";
import { states } from "$lib/states.svelte.js";

class Dm {
  async test(data, state) {
    alert("cool");
    // Set false immediately
    data[state] = false;

    // Wait for 3 seconds
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Set true after delay
    data[state] = true;
  }
  async loadData(docId) {
    try {
      // 1. Load from local for fast data
      const localData = await this.loadFromLocal(docId);

      // 2. Load from Firestore
      const firestoreData = await this.loadFromFirestore(docId);

      // 3. Check fresher one and decide to overwrite or not
      const mergedData = this.mergeData(localData, firestoreData);

      // Update local storage if Firestore data is newer
      if (mergedData.source === "firestore" || mergedData.source === "merged") {
        await this.saveToLocal(docId, mergedData.data);
      }

      return mergedData.data;
    } catch (error) {
      console.error(`Error loading data for ${docId}:`, error);
      // Return local data as fallback if available
      const localData = await this.loadFromLocal(docId);
      return localData?.data || null;
    }
  }

  async loadFromLocal(docId) {
    try {
      const localDoc = await dbd.documents.get(docId);
      return localDoc
        ? {
            data: localDoc.data,
            lastModified: localDoc.lastModified || new Date(0),
            source: "local",
          }
        : null;
    } catch (error) {
      console.error(`Error loading from local storage for ${docId}:`, error);
      return null;
    }
  }

  async loadFromFirestore(docId) {
    try {
      const doc = await dbf.collection("documents").doc(docId).get();
      if (doc.exists) {
        const data = doc.data();
        return {
          data: data,
          lastModified: data.lastModified?.toDate() || new Date(0),
          source: "firestore",
        };
      }
      return null;
    } catch (error) {
      console.error(`Error loading from Firestore for ${docId}:`, error);
      return null;
    }
  }

  mergeData(localData, firestoreData) {
    // If only one source has data, return that
    if (!localData && !firestoreData) {
      return { data: null, source: "none" };
    }
    if (!localData) {
      return { data: firestoreData.data, source: "firestore" };
    }
    if (!firestoreData) {
      return { data: localData.data, source: "local" };
    }

    // Compare timestamps to determine which is fresher
    const localTime = new Date(localData.lastModified).getTime();
    const firestoreTime = new Date(firestoreData.lastModified).getTime();

    if (firestoreTime > localTime) {
      // Firestore is newer
      return { data: firestoreData.data, source: "firestore" };
    } else if (localTime > firestoreTime) {
      // Local is newer
      return { data: localData.data, source: "local" };
    } else {
      // Same timestamp, prefer Firestore but could merge specific fields if needed
      return { data: firestoreData.data, source: "firestore" };
    }
  }

  async saveToLocal(docId, data) {
    try {
      await dbd.documents.put({
        id: docId,
        data: data,
        lastModified: new Date(),
      });
    } catch (error) {
      console.error(`Error saving to local storage for ${docId}:`, error);
    }
  }

  // Helper method to save data to both local and Firestore
  async saveData(docId, data) {
    const timestamp = new Date();
    const dataWithTimestamp = {
      ...data,
      lastModified: timestamp,
    };

    try {
      // Save to Firestore first
      await dbf.collection("documents").doc(docId).set(dataWithTimestamp);

      // Then save to local
      await this.saveToLocal(docId, dataWithTimestamp);

      return dataWithTimestamp;
    } catch (error) {
      console.error(`Error saving data for ${docId}:`, error);
      throw error;
    }
  }
}

export const dm = new Dm();
