<script>
  import Icon from "$lib/Icon.svelte";
  import { goto } from "$app/navigation";
  import { auth } from "$lib/data/firebase.js";
  import { signOut } from "firebase/auth";

  async function handleLogout() {
    try {
      // Sign out from Firebase
      await signOut(auth);
      // Remove stored userId
      localStorage.removeItem("12monthsuser");
      // Redirect to landing page
      goto("/");
    } catch (error) {
      console.error("Error logging out:", error);
      // Optionally, show an error message to the user
    }
  }
</script>

<button data-sound="1" on:click={handleLogout} class="logout">
  <Icon name="power" color="#38f57e" />
</button>

<style>
  .logout {
    background: var(--gray);
    border-radius: 16px;
    border: none;
    outline: none;
    height: 52px;
    width: 52px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    box-shadow: var(--shadow1);
    cursor: pointer;
    transition: all 0.2s ease;
  }
  .logout:hover {
    background: var(--gray2);
    transform: translateY(-1px);
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
  }
</style>
