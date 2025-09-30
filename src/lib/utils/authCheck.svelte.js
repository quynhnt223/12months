import { goto } from "$app/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, dbf } from "$lib/data/firebase.js";
import { states } from "$lib/states.svelte.js";

export function useAuth() {
  $effect(() => {
    const authUnsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        states.userId = user.uid;
        console.log(states.userId);

        if (localStorage.getItem("12monthsuser") !== "true") {
          localStorage.setItem("12monthsuser", "true");
        }

        // Fetch user document once
        try {
          const userDocRef = doc(dbf, "users", user.uid);
          const docSnap = await getDoc(userDocRef);

          if (docSnap.exists()) {
            const userData = docSnap.data();
            states.isPro = userData.isPro || false;
          } else {
            states.isPro = false;
          }
          console.log("User isPro:", states.isPro);

          if (!states.isPro) {
            goto("/d");
          }
        } catch (error) {
          console.error("Error fetching user document:", error);
          states.isPro = false;
        }
      } else {
        states.userId = null;
        states.isPro = false;

        if (localStorage.getItem("12monthsuser") !== null) {
          localStorage.removeItem("12monthsuser");
        }
      }
    });

    return () => authUnsub();
  });
}
