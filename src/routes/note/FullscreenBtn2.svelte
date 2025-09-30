<script>
  import Icon from "$lib/Icon.svelte";

  let isFullscreen = false;

  async function toggleFullscreen() {
    const el = document.querySelector(".fullable");
    if (!el) {
      console.warn("No element with class .fullable found");
      return;
    }

    if (!isFullscreen) {
      await el.requestFullscreen();
      isFullscreen = true;
    } else {
      await document.exitFullscreen();
      isFullscreen = false;
    }
  }

  function handleChange() {
    isFullscreen = !!document.fullscreenElement;
  }

  document.addEventListener("fullscreenchange", handleChange);
</script>

<button on:click={toggleFullscreen}>
  <Icon name={isFullscreen ? "nofull" : "full"} color="#5d5c5f" size="14"
  ></Icon>
</button>

<style>
  button {
    width: 36px;
    height: 36px;
    display: grid;
    place-content: center;
    background: rgba(0, 128, 0, 0);
    border-bottom-left-radius: 12px;
  }
  button:hover {
    opacity: 0.6;
  }
</style>
