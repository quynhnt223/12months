<script>
  import FullscreenButton from "$lib/design/comp/FullscreenButton.svelte";
  import { autoScale } from "$lib/utils/autoScale.svelte.js";
  import { states } from "$lib/states.svelte.js";
  import Icon from "$lib/Icon.svelte";
  import DashHeader from "./DashHeader.svelte";
  import Temprary from "./Temprary.svelte";
  import DashMenu from "./DashMenu.svelte";
  import DashLeft from "./DashLeft.svelte";
  import DashRight from "./DashRight.svelte";
  import DashMiddle from "./DashMiddle.svelte";
  import DashFade from "./DashFade.svelte";

  let { layerLevel2 } = $props();

  $effect(() => autoScale());
</script>

<div class="dash-surface">
  <Temprary></Temprary>

  <div class="dash-logo">
    <span class="logo-num">12</span>
    <span class="logo-text">months</span>
  </div>
  <div
    class="scaleable-area"
    style="
        --base-w: {states.scaleInfo.w}px;
        --base-h: {states.scaleInfo.h}px;
        transform: scale({states.scaleInfo.s});
        margin-left: {states.scaleInfo.x}px;
        margin-top: {states.scaleInfo.y}px;
      "
  >
    <!--DashLayout is layerLevel1-->
    {@render layerLevel2()}
    <div class="dash-content">
      {#if states.isMenuOpen}
        <DashMenu></DashMenu>
      {/if}

      <div class="notebook">
        <div class="dash-header"><DashHeader></DashHeader></div>
        {#if states.isFading}
          <DashFade></DashFade>
        {/if}
        <div class="dash-body">
          <DashLeft></DashLeft>
          <DashMiddle></DashMiddle>
          <DashRight></DashRight>
        </div>
      </div>
      <div class="dash-nav">
        <div class="full-btn"><FullscreenButton></FullscreenButton></div>
        <button
          class="menu-btn"
          data-label="menu"
          onclick={() => (states.isMenuOpen = !states.isMenuOpen)}
          ><Icon name="menu"></Icon></button
        >
        <img class="dash-pen" src="/pen.png" alt="pen" />
      </div>
    </div>
  </div>
</div>

<style>
  :root {
    --dashblue: #2f4791ff;
    --dashlime: #b6fd32;
    --dargreenhover: rgb(15, 150, 64);
    --dashlightblue: rgb(65, 109, 241);
  }
  .dash-surface {
    position: fixed;
    inset: 0;
    background-color: #27272f;
    opacity: 1;
    background-image: radial-gradient(#2d430c 0.2px, #27272f 0.2px);
    background-size: 4px 4px;
    -webkit-user-select: none; /* Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+/Edge */
    user-select: none; /* Standard */
  }

  .scaleable-area {
    transform-origin: top left;
    width: var(--base-w);
    height: var(--base-h);
  }
  .dash-content {
    width: 100%;
    height: 100%;
    display: flex;
    padding: 15px;
    padding-right: 0;
  }
  .notebook {
    position: relative;
    flex: 1;
    z-index: 2;
    overflow: hidden;
    background: #3e3f4d;
    border-radius: 12px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.35);
  }
  .dash-nav {
    width: 40px;
    padding-top: 30px;
  }
  .dash-logo {
    color: var(--dashlime);
    font-weight: 900;
    position: absolute;
    left: 20px;
    top: 20px;
    display: flex;
    align-items: center;
  }
  .logo-num {
    display: grid;
    place-content: center;
    width: 28px;
    height: 28px;
    font-size: 24px;
    background: var(--dashlime);
    color: #27272f;
    border-radius: 2px;
    margin-right: 3px;
    box-shadow:
      rgba(0, 0, 0, 0.4) 0px 2px 4px,
      rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
      rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  }
  .logo-text {
    font-size: 24px;
    font-weight: 900;
  }
  .dash-pen {
    position: absolute;
    bottom: 30px;
    right: 10px;
    width: 28px;
    filter: drop-shadow(-5px 2px 12px #282323);
  }
  .menu-btn,
  .full-btn {
    width: 36px;
    height: 36px;
    margin-top: 6px;
    display: grid;
    place-content: center;
    background: var(--dashlime);
    border-bottom-right-radius: 8px;
    border-top-right-radius: 8px;
  }
  .menu-btn:hover,
  .full-btn:hover {
    background: var(--dargreenhover);
  }
  .dash-body {
    display: flex;
    height: calc(100% - 55px);
  }
</style>
