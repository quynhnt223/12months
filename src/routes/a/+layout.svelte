<script>
  import { useAuth } from "$lib/utils/authCheck.svelte.js";
  import Body from "$lib/design/comp/Body.svelte";
  import Header from "$lib/design/comp/Header.svelte";
  import { onMount, onDestroy } from "svelte";

  useAuth();

  let { children, baseWidth = 1018, baseHeight = 720 } = $props();

  let slideEl = $state();
  let scale = $state(1);
  let offsetX = $state(0);
  let offsetY = $state(0);
  let isFullscreen = $state(false);

  function computeScale() {
    const ww = window.innerWidth;
    const wh = window.innerHeight;

    const s = Math.min(ww / baseWidth, wh / baseHeight);
    scale = s;

    // center the scaled slide
    offsetX = (ww - baseWidth * s) / 2;
    offsetY = (wh - baseHeight * s) / 2;
  }

  const handleResize = () => computeScale();

  // Handle fullscreen change events
  const handleFullscreenChange = () => {
    isFullscreen = !!document.fullscreenElement;
    // Recompute scale when entering/exiting fullscreen
    setTimeout(computeScale, 100);
  };

  onMount(() => {
    computeScale();
    window.addEventListener("resize", handleResize);
    document.addEventListener("fullscreenchange", handleFullscreenChange);
  });

  onDestroy(() => {
    window.removeEventListener("resize", handleResize);
    document.removeEventListener("fullscreenchange", handleFullscreenChange);
  });

  // Toggle fullscreen
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

<div class="stage">
  <h3 class="logo">
    <span class="logon">12</span><span class="logot">months</span>
  </h3>
  <div
    class="slide"
    bind:this={slideEl}
    style="
              --base-w: {baseWidth}px;
              --base-h: {baseHeight}px;
              transform: scale({scale});
              margin-left: {offsetX}px;
              margin-top: {offsetY}px;
            "
  >
    <!-- Replace this slot with your actual slide content -->

    <div class="content">
      <Header></Header>
      <Body></Body>
      {@render children()}
      <img class="line" src="/line.jpg" alt="line decoration" />
    </div>
    <a class="btn3 sound1" href="/a/p" data-label="Menu">☷</a>
    <button
      class="btn1"
      onclick={toggleFullscreen}
      data-label={isFullscreen ? "Close Full Screen" : "Full Screen"}
      >{isFullscreen ? "✖" : "⛶"}</button
    > <a class="btn2 sound1" href="/a/p" data-label="Menu">☷</a>

    <img class="pen" src="/pen.png" alt="pen decoration" />
  </div>
</div>

<style>
  .stage {
    position: fixed;
    inset: 0;
    background: var(--dblue);
  }
  .logo {
    color: #54f161;
    font-weight: 900;
    position: absolute;
    left: 20px;
    top: 20px;
    display: flex;
    align-items: center;
  }
  .logon {
    display: grid;
    place-content: center;
    width: 28px;
    height: 28px;
    font-size: 24px;
    background: #54f161;
    color: var(--dblue);
    border-radius: 2px;
    margin-right: 3px;
    box-shadow:
      rgba(0, 0, 0, 0.4) 0px 2px 4px,
      rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
      rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  }
  .logot {
    font-size: 24px;
    font-weight: 900;
  }
  .slide {
    width: var(--base-w);
    height: var(--base-h);

    transform-origin: top left;
    padding: 25px;
    padding-top: 15px;
    padding-bottom: 15px;
    padding-right: 40px;
  }
  .content {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 2;
    background: var(--bg);
    border-radius: 21px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.35);
    font-weight: 500;
    color: var(--dblue);
  }

  /* Optional helper UI */
  .toolbar {
    position: fixed;
    right: 16px;
    bottom: 16px;
    display: flex;
    gap: 8px;
  }
  .btn {
    appearance: none;
    border: 0;
    padding: 10px 14px;
    border-radius: 10px;
    background: var(--dblue);
    color: #fff;
    cursor: pointer;
  }
  .bigtext {
    font-size: 36px;
    font-weight: 700;
  }
  .btn1,
  .btn2,
  .btn3 {
    position: absolute;
    top: 80px;
    right: 4px;
    height: 36px;
    width: 36px;
    background: linear-gradient(270deg, #54f161 81.03%, #47ce53 100%);
    border-radius: 0 6px 6px 0;
    color: var(--dblue);
    font-weight: 900;
    font-size: 21px;
  }
  .btn1:hover {
    background: #1ecb5a;
  }
  .btn2 {
    top: 125px;
    display: grid;
    place-content: center;
    font-weight: 900;
    font-size: 16px;
  }
  .btn2:hover {
    background: #1ecb5a;
  }
  .btn3 {
    top: 36px;
    display: grid;
    place-content: center;
    font-weight: 900;
    font-size: 16px;
  }
  .btn3:hover {
    background: #1ecb5a;
  }
  .pen {
    position: absolute;
    bottom: 30px;
    right: 10px;
    width: 28px;
    filter: drop-shadow(-5px 2px 12px #282323);
  }
  .line {
    position: absolute;
    left: 50%;
    right: 50%;
    z-index: 1;
    top: 0;
    height: 100%;
  }
</style>
