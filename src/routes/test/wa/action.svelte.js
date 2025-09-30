import { dbf } from "$lib/data/firebase.js";
import { doc, setDoc } from "firebase/firestore";

class Action {
  async add() {
    try {
      await setDoc(
        doc(dbf, "test", "someid"),
        {
          day2: "cool",
        },
        { merge: true }
      );
      console.log("Document successfully written!");
    } catch (error) {
      console.error("Error writing document: ", error);
    }
  }
}

export const action = new Action();
