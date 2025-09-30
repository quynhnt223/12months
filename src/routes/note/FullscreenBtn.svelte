<script>
  import Icon from "$lib/Icon.svelte";
  let isFullscreen = $state(false);

  // Toggle fullscreen function
  async function toggleFullscreen() {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        isFullscreen = true;
      } else {
        await document.exitFullscreen();
        isFullscreen = false;
      }
    } catch (err) {
      console.warn("Fullscreen operation failed:", err);
    }
  }
</script>

<button
  class="fullscreen-btn"
  onclick={toggleFullscreen}
  data-label={isFullscreen ? "Close Full Screen" : "Full Screen"}
>
  <Icon name={isFullscreen ? "nofull" : "full"} color="#5d5c5f" size="14"
  ></Icon>
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
