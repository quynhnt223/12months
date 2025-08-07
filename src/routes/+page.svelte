<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { onAuthStateChanged } from "firebase/auth";
  import { auth } from "$lib/config/firebase.js";
  import Header from "$lib/comp/Header.svelte";

  onMount(() => {
    // 1. If we've already got a userId, skip straight to /app
    const storedUid = localStorage.getItem("userId");
    if (storedUid) {
      goto("/app");
      return;
    }

    // 2. Otherwise, watch Firebase auth state
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // store their uid and navigate
        localStorage.setItem("userId", user.uid);
        goto("/app");
      }
      // if not signed in, do nothing
    });

    // Cleanup listener if this component ever unmounts
    return () => unsubscribe();
  });
</script>

<div class="surface">
  <Header />
  <!-- your landing content here -->
</div>

<style>
  .surface {
    background: #34eb71;
    min-height: 100vh;
    padding: 20px;
  }
</style>
