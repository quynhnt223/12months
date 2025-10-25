<script>
  import { states } from "./c/utils/states.svelte.js";
  import Comp1 from "./c/Comp1.svelte";
  import Comp2 from "./c/Comp2.svelte";
  import Comp3 from "./c/Comp3.svelte";
  import Comp4 from "./c/Comp4.svelte";
  import Comp5 from "./c/Comp5.svelte";
  import Comp6 from "./c/Comp6.svelte";
  import Comp7 from "./c/Comp7.svelte";
  import Comp8 from "./c/Comp8.svelte";
  import Comp9 from "./c/Comp9.svelte";
  import Comp10 from "./c/Comp10.svelte";
  import Comp11 from "./c/Comp11.svelte";
  import Comp12 from "./c/Comp12.svelte";
  import Comp13 from "./c/Comp13.svelte";
  import Comp14 from "./c/Comp14.svelte";
  import Comp15 from "./c/Comp15.svelte";
  import Comp16 from "./c/Comp16.svelte";
  import Comp17 from "./c/Comp17.svelte";
  import Comp18 from "./c/Comp18.svelte";
  import Comp19 from "./c/Comp19.svelte";
  import Comp20 from "./c/Comp20.svelte";
  import Comp21 from "./c/Comp21.svelte";
  import Comp22 from "./c/Comp22.svelte";
  import Comp23 from "./c/Comp23.svelte";
  import Comp24 from "./c/Comp24.svelte";
  import Comp25 from "./c/Comp25.svelte";
  import Comp26 from "./c/Comp26.svelte";
  import Comp27 from "./c/Comp27.svelte";
  import Comp28 from "./c/Comp28.svelte";

  // prettier-ignore
  const components = [Comp1, Comp2, Comp3, Comp4, Comp5, Comp6, Comp7, Comp8, Comp9, Comp10, Comp11, Comp12, Comp13, Comp14, Comp15, Comp16, Comp17, Comp18, Comp19, Comp20, Comp21, Comp22, Comp23, Comp24, Comp25, Comp26, Comp27, Comp28];

  const buttons = [
    { name: "Water", color: "#4a9eff", icon: "💧" },
    { name: "Nutrition", color: "#ff6b6b", icon: "🍎" },
    { name: "Money", color: "#51cf66", icon: "💰" },
    { name: "Routines", color: "#ffd43b", icon: "📋" },
    { name: "Work", color: "#ff922b", icon: "💼" },
    { name: "Fitness", color: "#cc5de8", icon: "💪" },
    { name: "Sleep", color: "#748ffc", icon: "😴" },
    { name: "Reading", color: "#ffa94d", icon: "📚" },
    { name: "Social", color: "#ff6b9d", icon: "👥" },
    { name: "Meditation", color: "#69db7c", icon: "🧘" },
    { name: "Cooking", color: "#ff8787", icon: "👨‍🍳" },
    { name: "Learning", color: "#ffd43b", icon: "🎓" },
    { name: "Cleaning", color: "#74c0fc", icon: "🧹" },
    { name: "Shopping", color: "#ff6b6b", icon: "🛒" },
    { name: "Gaming", color: "#a78bfa", icon: "🎮" },
    { name: "Music", color: "#f783ac", icon: "🎵" },
    { name: "Movies", color: "#ffa94d", icon: "🎬" },
    { name: "Walking", color: "#51cf66", icon: "🚶" },
    { name: "Journaling", color: "#cc5de8", icon: "📝" },
    { name: "Coding", color: "#4a9eff", icon: "💻" },
    { name: "Drawing", color: "#ff6b9d", icon: "🎨" },
    { name: "Yoga", color: "#69db7c", icon: "🧘‍♀️" },
    { name: "Calls", color: "#ffd43b", icon: "📞" },
    { name: "Challenges", color: "#748ffc", icon: "📅" },
    { name: "Drawing", color: "#ff6b9d", icon: "🎨" },
    { name: "Yoga", color: "#69db7c", icon: "🧘‍♀️" },
    { name: "Calls", color: "#ffd43b", icon: "📞" },
    { name: "Pray", color: "orange", icon: "📅" },
  ];

  let isOpen = $state(false);
  let activeComponentIndex = $state(0);
  let startX = $state(0);
  let startY = $state(0);
  let currentX = $state(0);
  let currentY = $state(0);
  let isDragging = $state(false);
  let velocity = $state(0);
  let lastTime = $state(0);
  let lastX = $state(0);

  const Active = $derived(components[activeComponentIndex]);

  function open(index) {
    activeComponentIndex = index;
    states.isOpen = true;
    currentX = 0;
    currentY = 0;
  }

  function close() {
    states.isOpen = false;
    currentX = 0;
    currentY = 0;
  }

  function handleTouchStart(e) {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    currentX = 0;
    currentY = 0;
    isDragging = true;
    velocity = 0;
    lastTime = Date.now();
    lastX = startX;
  }

  function handleTouchMove(e) {
    if (!isDragging) return;

    const touch = e.touches[0];
    const deltaX = touch.clientX - startX;
    const deltaY = touch.clientY - startY;

    // Only track horizontal swipes (with some vertical tolerance)
    if (Math.abs(deltaX) > Math.abs(deltaY) || Math.abs(deltaX) > 10) {
      e.preventDefault(); // Prevent scroll only when horizontally swiping
      currentX = deltaX;

      // Calculate velocity
      const now = Date.now();
      const dt = now - lastTime;
      if (dt > 0) {
        velocity = (touch.clientX - lastX) / dt;
      }
      lastTime = now;
      lastX = touch.clientX;
    }

    currentY = deltaY;
  }

  function handleTouchEnd() {
    if (!isDragging) return;

    const threshold = 100;
    const velocityThreshold = 0.3;

    // Close if:
    // 1. Swiped right more than threshold
    // 2. OR has sufficient velocity to the right
    if (currentX > threshold || velocity > velocityThreshold) {
      // Animate out
      currentX = window.innerWidth;
      setTimeout(() => {
        close();
      }, 300);
    } else {
      // Snap back
      currentX = 0;
    }

    isDragging = false;
  }

  $effect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = "0";
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
    }
  });
</script>

<div class="wrap">
  <div class="grid">
    {#each buttons as btn, index}
      <button class="btn pop1" onclick={() => open(index)}>
        <span class="big-letters" style="color: {btn.color}"
          >{btn.name.slice(0, 2)}</span
        ><span class="small-letters">{btn.name.slice(2)}</span>
      </button>
    {/each}
  </div>
</div>

{#if states.isOpen}
  <div class="backdrop">
    <div class="wrap2">
      <div class="header">
        <div class="title">
          <div class="st">Morning</div>
          <div class="nd">Routine</div>
        </div>
        <div class="btns">
          <button class="btn" onclick={close}>✏️</button>
          <button class="btn" onclick={close}>🗓️</button>
          <button class="btn" onclick={close}>✖️</button>
        </div>
      </div>
      <div class="body">
        {#if components[activeComponentIndex]}
          <Active />
        {/if}
      </div>
    </div>
  </div>
{/if}

<style>
  .wrap {
    position: fixed;
    inset: 0;
    padding: 6px;
    background: #47484c;
    padding-bottom: 86px;
  }
  .wrap2 {
    display: flex;
    flex-direction: column;
  }
  .body {
    flex: 1;
    height: calc(100% - 55px);
    padding-top: 3px;
    background: #37383d;
    padding: 1px;
    padding-bottom: 4px;
    padding-top: 1px;
    border-radius: 8px;
    box-shadow:
      inset -1px -2px 2px rgba(49, 49, 58, 0.81),
      inset 1px 2px 2px #232429;
  }
  .header {
    display: flex;
    align-items: center;
    height: 55px;
  }
  .title {
    font-size: 32px;
    color: var(--gr1);
    text-transform: uppercase;
    font-weight: 800;
    display: flex;
    flex: 1;
    padding-right: 20px;
  }
  .nd {
    font-size: 12px;
    opacity: 0.3;
    font-weight: 900;
    padding-left: 6px;
    padding-top: 6px;
  }
  .btns {
    display: flex;
    padding-left: 20px;
    align-items: center;
    gap: 2px;

    background: #37383d;
    box-shadow:
      inset -1px -2px 1px rgba(49, 49, 58, 0.81),
      inset 1px 1px 1px #232429;
    border-radius: 8px;
    padding: 2px;
  }
  .btns .btn {
    width: 45px;
    height: 45px;
    border-radius: 8px;
    display: grid;
    place-content: center;
    background: #54555c;
    box-shadow:
      inset 0px -1px 1px #292b2e,
      inset 0px 1px 0px #83818e;
  }
  .backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 999;
    -webkit-tap-highlight-color: transparent;
  }

  .wrap2 {
    position: fixed;
    inset: 0;
    padding: 5px;
    background: #47484c;
    padding-bottom: 68px;
    transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    will-change: transform;
    touch-action: pan-y;
    -webkit-user-select: none;
    user-select: none;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(7, 1fr);
    gap: 5px;
    width: 100%;
    height: 100%;
  }

  .btn {
    background-color: #37383d;
    color: white;
    font-size: 1.5rem;
    font-weight: 600;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: opacity 0.2s;
    box-shadow:
      0px 1px 0px #2f2c2c,
      inset 0px 1px 0px rgba(174, 174, 174, 0.17);
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
    position: relative;
    display: flex;
    align-items: start;
    justify-content: start;
    padding: 8px;
  }

  .big-letters {
    font-size: 24px;
    font-weight: 800;
  }

  .small-letters {
    font-size: 9px;
    font-weight: 400;
    color: #ffffff;
    padding-top: 12px;
  }

  .btn:active {
    opacity: 0.8;
  }

  .close {
    width: 45px;
    height: 45px;
    border-radius: 12px;
    color: #fff;
    background-color: #37383d;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    box-shadow:
      0px 1px 0px #2f2c2c,
      inset 0px 1px 0px rgba(174, 174, 174, 0.17);
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
    z-index: 1000;
  }
</style>
