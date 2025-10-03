import { dbf } from "$lib/data/firebase.js";
import { dbd } from "$lib/data/dexie.js";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

class Dm {
  status = $state("white");
  // be careful. don't use async as it will block return unsub
  async loadData(docId, docObject) {
    this.status = "white";
    this.loadFromLocal(docId, docObject);

    try {
      const docRef = doc(dbf, "docs", docId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        docObject.mainData = docSnap.data().mainData; // ✅ normalize recursively
        this.status = "green";
        console.log("✓ Data loaded from Firestore", docId);
      } else {
        this.status = "purple";
        console.log("ℹ No Firestore document found for", docId);
      }
    } catch (error) {
      console.log("Error loading document:", error);
      this.status = "red";
    }
  }

  async loadFromLocal(docId, docObject) {
    try {
      const localData = await dbd.docs.get(docId);
      if (localData?.mainData) {
        docObject.mainData = localData.mainData;
        console.log("✓ Data loaded from local database", docId);
      } else {
        console.log("ℹ No local data found for", docId);
      }
    } catch (error) {
      this.status = "red";
      console.log(error);
    }
  }

  async saveData(docId, docObject) {
    this.status = "white";
    // Fire-and-forget for local save
    this.saveToLocal(docId, docObject).catch((error) => {
      console.error("Local save failed:", error);
      this.status = "red";
    });

    // Fire-and-forget to Firestore with confirmation
    setDoc(doc(dbf, "docs", docId), JSON.parse(JSON.stringify(docObject)), {
      merge: true,
    })
      .then(() => {
        this.status = "green";
        console.log("✓ Data synced to cloud successfully");
        // Could update a sync status indicator in UI
      })
      .catch((error) => {
        this.status = "red";
        console.log("✗ Firestore sync failed:", error);
        // Could show "sync failed" indicator
      });

    console.log("Saving data locally and to cloud...");
  }

  async saveToLocal(docId, docObject) {
    try {
      await dbd.docs.put({
        id: docId,
        mainData: JSON.parse(JSON.stringify(docObject.mainData)),
      });
    } catch (error) {
      console.log("Error saving to local database:", error);
      this.status = "red";
    }
  }
}

export const dm = new Dm();
