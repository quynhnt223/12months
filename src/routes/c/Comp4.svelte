<script>
  import { onMount, onDestroy } from "svelte";

  let scrollArea;
  let gameScrollbar;
  let gameScrollbarThumb;

  let isDragging = false;
  let startY = 0;
  let startScrollTop = 0;

  function updateScrollbar() {
    if (!scrollArea || !gameScrollbar || !gameScrollbarThumb) return;
    const scrollHeight = scrollArea.scrollHeight;
    const clientHeight = scrollArea.clientHeight;
    const scrollTop = scrollArea.scrollTop;

    if (scrollHeight <= clientHeight) {
      gameScrollbar.style.opacity = "0";
      return;
    }

    gameScrollbar.style.opacity = "1";

    const trackHeight = gameScrollbar.clientHeight - 16;
    const thumbHeight = Math.max(
      (clientHeight / scrollHeight) * trackHeight,
      40
    );
    const maxScrollTop = scrollHeight - clientHeight;
    const thumbTop =
      8 + (scrollTop / maxScrollTop) * (trackHeight - thumbHeight);

    gameScrollbarThumb.style.height = thumbHeight + "px";
    gameScrollbarThumb.style.top = thumbTop + "px";
  }

  function handleMouseDown(e) {
    isDragging = true;
    startY = e.clientY;
    startScrollTop = scrollArea.scrollTop;
    e.preventDefault();
  }

  function handleMouseMove(e) {
    if (!isDragging) return;
    const deltaY = e.clientY - startY;
    const trackHeight = gameScrollbar.clientHeight - 16;
    const thumbHeight = parseFloat(gameScrollbarThumb.style.height);
    const maxThumbTop = trackHeight - thumbHeight;
    const scrollHeight = scrollArea.scrollHeight;
    const clientHeight = scrollArea.clientHeight;
    const maxScrollTop = scrollHeight - clientHeight;
    const scrollRatio = maxScrollTop / maxThumbTop;
    scrollArea.scrollTop = startScrollTop + deltaY * scrollRatio;
  }

  function handleMouseUp() {
    isDragging = false;
  }

  function handleScrollbarClick(e) {
    if (e.target === gameScrollbarThumb) return;
    const rect = gameScrollbar.getBoundingClientRect();
    const clickY = e.clientY - rect.top - 8;
    const trackHeight = gameScrollbar.clientHeight - 16;
    const thumbHeight = parseFloat(gameScrollbarThumb.style.height);
    const scrollHeight = scrollArea.scrollHeight;
    const clientHeight = scrollArea.clientHeight;
    const maxScrollTop = scrollHeight - clientHeight;
    const clickRatio = clickY / (trackHeight - thumbHeight);
    scrollArea.scrollTop = clickRatio * maxScrollTop;
  }

  onMount(() => {
    updateScrollbar();
    scrollArea.addEventListener("scroll", updateScrollbar);
    window.addEventListener("resize", updateScrollbar);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  });

  onDestroy(() => {
    scrollArea?.removeEventListener("scroll", updateScrollbar);
    window.removeEventListener("resize", updateScrollbar);
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  });
</script>

<div class="game-container">
  <div class="game-panel">
    <div class="scrollable-area" bind:this={scrollArea}>
      <div class="game-content">
        <div class="title">⚔ GAME MENU ⚔</div>

        <div class="section">
          <div class="section-title">▶ INVENTORY</div>
          <div class="text">▪ Health Potion x12</div>
          <div class="text">▪ Mana Potion x8</div>
          <div class="text">▪ Steel Sword +5</div>
          <div class="text">▪ Dragon Scale Armor</div>
          <div class="text">▪ Ancient Amulet</div>
        </div>

        <div class="section">
          <div class="section-title">▶ QUEST LOG</div>
          <div class="text">▪ The Lost Temple - In Progress</div>
          <div class="text">▪ Defeat the Shadow Lord - Active</div>
          <div class="text">▪ Gather Ancient Artifacts - 3/5 Complete</div>
          <div class="text">▪ Save the Village - Completed</div>
        </div>

        <div class="section">
          <div class="section-title">▶ CHARACTER STATS</div>
          <div class="text">▪ Level: 45</div>
          <div class="text">▪ Health: 850/850</div>
          <div class="text">▪ Mana: 620/620</div>
          <div class="text">▪ Strength: 78</div>
          <div class="text">▪ Agility: 65</div>
          <div class="text">▪ Intelligence: 82</div>
          <div class="text">▪ Defense: 71</div>
        </div>

        <div class="section">
          <div class="section-title">▶ ABILITIES</div>
          <div class="text">▪ Flame Strike - Master Level</div>
          <div class="text">▪ Ice Shield - Expert Level</div>
          <div class="text">▪ Lightning Bolt - Advanced Level</div>
          <div class="text">▪ Healing Touch - Master Level</div>
          <div class="text">▪ Shadow Step - Expert Level</div>
        </div>

        <div class="section">
          <div class="section-title">▶ ACHIEVEMENTS</div>
          <div class="text">▪ Dragon Slayer - Unlocked</div>
          <div class="text">▪ Master Explorer - Unlocked</div>
          <div class="text">▪ Legendary Warrior - In Progress 87%</div>
          <div class="text">▪ Treasure Hunter - Unlocked</div>
          <div class="text">▪ Combat Specialist - Unlocked</div>
        </div>

        <div class="section">
          <div class="section-title">▶ LOCATIONS</div>
          <div class="text">▪ Dark Forest - Discovered</div>
          <div class="text">▪ Crystal Caverns - Discovered</div>
          <div class="text">▪ Mountain Peak - Discovered</div>
          <div class="text">▪ Ancient Ruins - Discovered</div>
          <div class="text">▪ Shadow Realm - Locked</div>
          <div class="text">▪ Celestial Tower - Locked</div>
        </div>

        <div class="section">
          <div class="section-title">▶ COMPANIONS</div>
          <div class="text">▪ Elena the Archer - Level 42</div>
          <div class="text">▪ Marcus the Knight - Level 44</div>
          <div class="text">▪ Luna the Mage - Level 43</div>
          <div class="text">▪ Shadow the Wolf - Level 40</div>
        </div>

        <div class="section">
          <div class="section-title">▶ SETTINGS</div>
          <div class="text">▪ Graphics: Ultra</div>
          <div class="text">▪ Sound Volume: 80%</div>
          <div class="text">▪ Music Volume: 60%</div>
          <div class="text">▪ Difficulty: Hard</div>
        </div>
      </div>
    </div>

    <div
      class="game-scrollbar"
      bind:this={gameScrollbar}
      on:click={handleScrollbarClick}
    >
      <div class="scrollbar-cap top"></div>
      <div
        class="game-scrollbar-thumb"
        bind:this={gameScrollbarThumb}
        on:mousedown={handleMouseDown}
      ></div>
      <div class="scrollbar-cap bottom"></div>
    </div>
  </div>
</div>

<style>
  .game-container {
    display: flex;
    height: 100%;
    background: #37383d;
    border-radius: 8px;
    box-shadow: inset 0px 2px 1px #5b5f6b;
  }

  .game-panel {
    flex: 1;
    position: relative;
    overflow: hidden;
  }

  .scrollable-area {
    height: 100%;
    overflow-y: scroll;
    scrollbar-width: none;
    padding: 8px;
  }

  .scrollable-area::-webkit-scrollbar {
    display: none;
  }

  .game-content {
    font-family: "Courier New", monospace;

    color: #00ff00;
    line-height: 1.6;
  }

  .title {
    font-size: 2.5em;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
    margin-bottom: 30px;
    letter-spacing: 2px;
  }

  .section {
    margin-bottom: 30px;
    padding: 8px;
  }

  .section-title {
    font-size: 1.4em;
    margin-bottom: 15px;
    letter-spacing: 1px;
  }

  .text {
    margin-bottom: 12px;
  }

  .game-scrollbar {
    position: absolute;
    right: 5px;
    top: 20px;
    bottom: 20px;
    width: 12px;
  }

  .game-scrollbar::before {
    content: "";
    position: absolute;
    top: 3px;
    bottom: 3px;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    background: linear-gradient(
      180deg,
      transparent 0%,
      rgba(255, 255, 255, 0.1) 10%,
      rgba(255, 255, 255, 0.1) 90%,
      transparent 100%
    );
  }

  .game-scrollbar-thumb {
    position: absolute;
    width: 100%;
    background: linear-gradient(90deg, #3a3a3a 0%, #505050 50%, #3a3a3a 100%);
    border-radius: 7px;
    cursor: grab;
    transition: all 0.15s ease;
    box-shadow:
      0 1px 1px rgba(0, 0, 0, 0.6),
      inset 0 1px 0 rgba(255, 255, 255, 0.15),
      inset 0 -1px 0 rgba(0, 0, 0, 0.4);
    border: 1px solid #2a2a2a;
  }

  .game-scrollbar-thumb::before {
    content: "";
    position: absolute;
    top: 2px;
    left: 2px;
    right: 2px;
    height: 40%;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.2) 0%,
      transparent 100%
    );
    border-radius: 5px 5px 50% 50%;
  }

  .game-scrollbar-thumb::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60%;
    height: 40%;
    background: linear-gradient(
      180deg,
      transparent 0%,
      transparent 30%,
      #2a2a2a 30%,
      #2a2a2a 35%,
      transparent 35%,
      transparent 45%,
      #2a2a2a 45%,
      #2a2a2a 50%,
      transparent 50%,
      transparent 65%,
      #2a2a2a 65%,
      #2a2a2a 70%,
      transparent 70%
    );
  }

  .game-scrollbar-thumb:hover {
    background: linear-gradient(90deg, #4a4a4a 0%, #606060 50%, #4a4a4a 100%);
  }

  .game-scrollbar-thumb:active {
    cursor: grabbing;
    background: linear-gradient(90deg, #555 0%, #6a6a6a 50%, #555 100%);
  }

  .scrollbar-cap {
    position: absolute;
    left: 0;
    right: 0;
    height: 8px;
    background: linear-gradient(180deg, #0f0f0f 0%, transparent 100%);
  }

  .scrollbar-cap.top {
    top: 0;
    border-radius: 8px 8px 0 0;
  }

  .scrollbar-cap.bottom {
    bottom: 0;
    transform: rotate(180deg);
    border-radius: 8px 8px 0 0;
  }
</style>
