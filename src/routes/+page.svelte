<script>
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { onAuthStateChanged } from "firebase/auth";
    import { auth } from "$lib/data/firebase.js";
    import LandingHeader from "$lib/design/comp/LandingHeader.svelte";

    onMount(() => {
        // 1. If we've already got a userId, skip straight to /app
        const storedUid = localStorage.getItem("userId");
        if (storedUid) {
            goto("/a");
            return;
        }

        // 2. Otherwise, watch Firebase auth state
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                // store their uid and navigate
                localStorage.setItem("userId", user.uid);
                goto("/a");
            }
            // if not signed in, do nothing
        });

        // Cleanup listener if this component ever unmounts
        return () => unsubscribe();
    });
</script>

<div class="surface">
    <LandingHeader></LandingHeader>
</div>

<style>
    .surface {
        background: #34eb71;
        min-height: 100vh;
        padding: 20px;
    }
</style>
