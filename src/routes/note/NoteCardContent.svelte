<script>
  import Icon from "$lib/Icon.svelte";
  import FullscreenBtn2 from "./FullscreenBtn2.svelte";
  import { states } from "./states.svelte.js";
</script>

<div class="wrap move fullable">
  <div class="movegrab"></div>
  <div class="header">
    <FullscreenBtn2></FullscreenBtn2>
    <button class="close" onclick={() => (states.isCardOpen = false)}
      ><Icon name="close" color="#5d5c5f" size="16"></Icon></button
    >
    <a
      href={states.editCardLink}
      target="_blank"
      class="edit-card-link"
      onclick={() => (states.isCardOpen = false)}
      ><Icon name="edit" color="#5d5c5f" size="16"></Icon></a
    >
  </div>
  <div class="body">
    <iframe
      src={states.cardLink}
      frameborder="0"
      allowfullscreen="true"
      mozallowfullscreen="true"
      webkitallowfullscreen="true"
      title="Google Slides Presentation"
    ></iframe>
  </div>
</div>

<style>
  .wrap {
    position: absolute;
    z-index: 9;
    top: 68px;
    right: 200px;
    width: 800px;
    height: 450px;
    border-radius: 12px;
    background: radial-gradient(50% 50% at 50% 50%, #434e62 0%, #353e4c 100%);
    box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.25);
    overflow: hidden;
  }

  .body {
    width: 100%;
    height: 100%;
  }

  .close,
  .edit-card-link {
    display: grid;
    place-content: center;
    width: 36px;
    height: 36px;
    background: none;
  }

  iframe {
    position: absolute;
    top: -6px;
    left: -6px;
    width: calc(100% + 7px);
    height: calc(100% + 50px);
    outline: none;
  }

  .header {
    position: absolute;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 45px;
    right: 0;
  }

  /* Fullscreen styles */
  .wrap:fullscreen {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100vw;
    height: 100vh;
    border-radius: 0;
    z-index: 999999;
    border-radius: 0;
  }

  .wrap:fullscreen .body {
    width: 100vw;
    height: 100%; /* Account for header height */
  }

  .wrap:fullscreen iframe {
    top: 0;
    left: 0;
    width: 100vw;
    height: calc(100% + 36px);
  }
  .movegrab {
    width: 200px;
    height: 45px;
    position: absolute;
    z-index: 99999;
    top: 0;
    left: 0;
    background: rgba(0, 128, 0, 0);
  }
</style>
