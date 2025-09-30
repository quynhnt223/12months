import { auth, dbf } from "$lib/data/firebase.js";
import { goto } from "$app/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { browser } from "$app/environment";

class States {
  isFloatingCard = $state(false);
  isFading = $state(false);
  isSoundOn = $state(true);
  isMenuOpen = $state(false);
  startOnMonday = $state(true);
  userId = $state(null);
  isPro = $state(false);
  pageId = $state(null);
  docId = $state(null);
  isFullscreen = $state(false);
  scaleInfo = $state({
    w: 1018,
    h: 720,
    s: 1,
    x: 0,
    y: 0,
  });

  currentTemplate = $state({
    water: "Watertemp1",
    fitness: "fitnessTemp2",
    money: "moneytemp1",
  });

  cdi(appName) {
    return `${this.userId}-${appName}-${this.pageId.substring(3)}`;
  }

  // Track if we've initialized authentication
  authInitialized = $state(false);

  constructor() {
    if (browser) {
      this.initializeAuth();
    }
  }

  async initializeAuth() {
    try {
      // First, try to get userId from localStorage
      const storedUserId = localStorage.getItem("12monthsUserId");

      if (storedUserId) {
        console.log("Found stored userId:", storedUserId);
        this.userId = storedUserId;
        await this.checkUserProStatus(storedUserId);
      } else {
        // If no stored userId, listen for auth state changes
        console.log("No stored userId, waiting for auth state change...");
        this.setupAuthStateListener();
      }
    } catch (error) {
      console.error("Error initializing auth:", error);
      // Fallback to auth state listener
      this.setupAuthStateListener();
    }
  }

  setupAuthStateListener() {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("Auth state changed - user found:", user.uid);
        this.userId = user.uid;

        // Store userId in localStorage for future use
        localStorage.setItem("12monthsUserId", user.uid);

        await this.checkUserProStatus(user.uid);
      } else {
        console.log("Auth state changed - no user");
        this.userId = null;
        this.isPro = false;
        localStorage.removeItem("12monthsUserId");
      }

      this.authInitialized = true;
    });
  }

  async checkUserProStatus(userId) {
    try {
      console.log("Checking pro status for user:", userId);

      // Get user document from Firestore
      const userDocRef = doc(dbf, "users", userId);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        this.isPro = userData.isPro || false;

        console.log("User isPro status:", this.isPro);

        // If user is not pro, redirect to home page
        if (!this.isPro) {
          console.log("User is not pro, redirecting to home...");
          goto("/");
        }
      } else {
        console.log("User document not found");
        this.isPro = false;
        goto("/");
      }
    } catch (error) {
      console.error("Error checking user pro status:", error);
      this.isPro = false;
      // Don't redirect on error to avoid infinite loops
    }
  }

  // Method to manually refresh user status
  async refreshUserStatus() {
    if (this.userId) {
      await this.checkUserProStatus(this.userId);
    }
  }

  // Method to clear user data (useful for logout)
  clearUserData() {
    this.userId = null;
    this.isPro = false;
    localStorage.removeItem("12monthsUserId");
  }
}

export const states = new States();
