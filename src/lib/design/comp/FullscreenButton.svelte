<script>
  import Icon from "$lib/Icon.svelte";
  import { states } from "$lib/states.svelte.js";

  // Toggle fullscreen function
  async function toggleFullscreen() {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.warn("Fullscreen operation failed:", err);
    }
  }
</script>

<button
  class="fullscreen-btn"
  onclick={toggleFullscreen}
  data-label={states.isFullscreen ? "Close Full Screen" : "Full Screen"}
>
  <Icon name={states.isFullscreen ? "nofull" : "full"}></Icon>
</button>

<style>
  .fullscreen-btn {
    width: 36px;
    height: 36px;
    background: none;
    display: grid;
    place-content: center;
  }
</style>
