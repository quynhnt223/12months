<script>
  let currentRepetition = $state(1);
  let isPlaying = $state(false);
  let isPaused = $state(false);
  let progress = $state(0);
  let selectedChant = $state(0);

  const chants = [
    {
      name: "Hư Không Tạng",
      repetitions: 49,
      displayTime: 8000, // 8 seconds
      pauseBetween: 500, // pause in milliseconds between repetitions
      lines: [
        "Nam Mô Đức Đại Bi Hư Không Tạng Bồ Tát",
        "Om - Vai Zo Ra - Rat Na - Om - Tra - Soa Ha",
        "Nam Mô - A Ka Sa - Ga Ra Ha Ya",
        "Om - Ma Ry A - Ka Ma Ri - Mẫu Li - Soa Ha",
      ],
    },
    {
      name: "Thập Phương Tam Bảo",
      repetitions: 8,
      displayTime: 30000, // 15 seconds
      pauseBetween: 2000, // 2 second pause between repetitions
      lines: [
        "Nam Mô Thanh Tịnh Pháp Thân Đức Tỳ Lô Giá Na Như Lai",
        "Nam Mô Thường Trụ Ngũ Trí Như Lai - Thập Phương Tam Bảo",
        "Nam Mô Đức Bổn Sư Thích Ca Mâu Ni Như Lai",
        "Nam Mô Đức Phổ Hiền Bồ Tát",
        "Nam Mô Đức Đại Trí Văn Thù Sư Lợi Bồ Tát",
        "Nam Mô Đức A Di Đà Vô Lượng Quang - Vô Lượng Thọ Như Lai",
        "Nam Mô Đức Đại Thế Chí Bồ Tát",
        "Nam Mô Đức Quán Thế Âm Bồ Tát",
        "Nam Mô Đức Liên Hoa Sanh",
        "Nam Mô Đức Hóa Thân: Thành Chúng Trí Liên Hoa Sanh",
        "Nam Mô Đức Hoàng Thần Tài Bảo Sanh Như Lai",
        "Nam Mô Đức Hư Không Tạng Bồ Tát",
        "Nam Mô Đức Đại Trí Ba La Mật Bồ Tát",
        "Nam Mô Thanh Tịnh Đại Hải Chúng Bồ Tát...",
      ],
    },
  ];

  const currentChant = $derived(chants[selectedChant]);
  const totalRepetitions = $derived(currentChant.repetitions);
  const displayTime = $derived(currentChant.displayTime);
  const pauseBetween = $derived(currentChant.pauseBetween);
  const currentMantraLines = $derived(currentChant.lines);
  const wordsPerLine = $derived(
    currentMantraLines.map((line) => line.split(" "))
  );
  const totalWords = $derived(wordsPerLine.flat().length);

  let timer = null;
  let progressTimer = null;
  let pauseTimer = null;
  let displayAreaElement = null;
  let highlightedWordElement = null;
  let isInPause = $state(false);
  let bellAudio = null;

  $effect(() => {
    bellAudio = new Audio("/bell.mp3");
  });

  function startCycle() {
    if (timer) clearTimeout(timer);
    if (progressTimer) clearInterval(progressTimer);
    if (pauseTimer) clearTimeout(pauseTimer);

    isInPause = false;
    progress = 0;

    const progressInterval = 100;
    const progressStep = (100 / displayTime) * progressInterval;

    progressTimer = setInterval(() => {
      progress = Math.min(progress + progressStep, 100);
    }, progressInterval);

    timer = setTimeout(() => {
      if (progressTimer) clearInterval(progressTimer);

      if (currentRepetition < totalRepetitions) {
        if (pauseBetween > 0) {
          isInPause = true;
          progress = 0;

          pauseTimer = setTimeout(() => {
            currentRepetition++;
            startCycle();
          }, pauseBetween);
        } else {
          currentRepetition++;
          startCycle();
        }
      } else {
        // Play bell sound only when completing all repetitions
        if (bellAudio) {
          bellAudio.currentTime = 0;
          bellAudio.play().catch((e) => console.log("Audio play failed:", e));
        }
        isPlaying = false;
        currentRepetition = 1;
        progress = 0;
      }
    }, displayTime);
  }

  $effect(() => {
    if (isPlaying && !isPaused) {
      startCycle();
    } else {
      if (timer) clearTimeout(timer);
      if (progressTimer) clearInterval(progressTimer);
      if (pauseTimer) clearTimeout(pauseTimer);
    }

    return () => {
      if (timer) clearTimeout(timer);
      if (progressTimer) clearInterval(progressTimer);
      if (pauseTimer) clearTimeout(pauseTimer);
    };
  });

  $effect(() => {
    if (
      isPlaying &&
      !isPaused &&
      displayAreaElement &&
      highlightedWordElement
    ) {
      // Trigger on progress change
      progress;

      highlightedWordElement.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    }
  });

  function handleStart() {
    isPlaying = true;
    isPaused = false;
    currentRepetition = 1;
    progress = 0;
  }

  function handlePause() {
    isPaused = !isPaused;
  }

  function handleReset() {
    isPlaying = false;
    isPaused = false;
    currentRepetition = 1;
    progress = 0;
    isInPause = false;
    if (pauseTimer) clearTimeout(pauseTimer);
  }

  function selectChant(index) {
    if (isPlaying) {
      handleReset();
    }
    selectedChant = index;
  }

  function getHighlightedWordIndex() {
    const wordProgress = (progress / 100) * totalWords;
    return Math.floor(wordProgress);
  }
</script>

<div class="main-card">
  <div class="header">
    {#if isPlaying && currentRepetition > totalRepetitions - 2}
      <div class="repetition-badge">
        {currentRepetition}
      </div>
    {:else}
      <div class="repetition-badge" style="opacity: 0;">
        {currentRepetition}
      </div>
    {/if}
    <div class="left-header">
      <div class="chant-name">{currentChant.name}</div>
      <!-- Progress Bar -->
      {#if isPlaying}
        <div class="progress-container">
          <div class="progress-bar">
            <div class="progress-fill" style="width: {progress}%"></div>
          </div>
        </div>
      {/if}
    </div>
  </div>

  <div class="display-area" bind:this={displayAreaElement}>
    {#if isPlaying}
      {#if isInPause}
        <div class="pause-screen">
          <div class="pause-text">Pause...</div>
        </div>
      {:else}
        <div class="mantra-text">
          {#each wordsPerLine as words, lineIdx}
            {@const startWordIndex = wordsPerLine
              .slice(0, lineIdx)
              .flat().length}
            <div class="mantra-line">
              {#each words as word, wordIdx}
                {@const currentWordIndex = startWordIndex + wordIdx}
                {@const highlightIndex = getHighlightedWordIndex()}
                {@const isHighlighted = currentWordIndex === highlightIndex}
                {@const isPassed = currentWordIndex < highlightIndex}
                {#if isHighlighted}
                  <span
                    bind:this={highlightedWordElement}
                    class="word highlighted"
                    style="transform: scale(1.1)"
                  >
                    {word}
                  </span>
                {:else}
                  <span
                    class="word {isPassed ? 'passed' : ''}"
                    style="transform: scale(1)"
                  >
                    {word}
                  </span>
                {/if}
              {/each}
            </div>
          {/each}
        </div>
      {/if}
    {:else}
      <div class="ready-screen">
        <div class="ready-subtitle">
          <div class="rnum">{totalRepetitions}</div>
          {displayTime / 1000}s
        </div>
      </div>
    {/if}
  </div>

  <!-- Controls -->
  <div class="controls">
    <!-- Chant Selection Buttons -->
    <div class="chant-selector">
      {#each chants as chant, index}
        <button
          onclick={() => selectChant(index)}
          class="chant-btn {selectedChant === index ? 'active' : ''}"
          disabled={isPlaying && !isPaused}
        >
          {index + 1}
        </button>
      {/each}
    </div>
    {#if !isPlaying}
      <button onclick={handleStart} class="btn btn-start"> ▶</button>
    {:else}
      <button onclick={handlePause} class="btn btn-pause">
        {isPaused ? "▶" : "⏸"}
      </button>
    {/if}
    <!--    <button onclick={handleReset} class="btn btn-reset"> ⟲</button> -->
  </div>
</div>

<style>
  .main-card {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .header {
    text-align: center;
    margin-bottom: 10px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 55px;
  }

  .repetition-badge {
    font-size: 60px;
    font-weight: 700;
    color: var(--gr1);
    line-height: 1;
  }

  .chant-name {
    font-size: 21px;
    text-transform: capitalize;
    font-weight: 600;
    color: var(--gr1);
    margin-bottom: 10px;
  }

  .progress-container {
    width: 100%;
  }

  .progress-bar {
    width: 100%;
    height: 0.75rem;
    background-color: #2f3031;
    border-radius: 9999px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: var(--gr1);
    transition: width 0.1s linear;
  }

  .display-area {
    background: #2f3031;
    border-radius: 8px;
    height: 100%;
    align-items: center;
    justify-content: center;
    padding-top: 20px;
    padding: 12px;
    margin-bottom: 10px;
    overflow: auto;
  }

  .mantra-text {
    text-align: center;
    width: 100%;
  }

  .mantra-line {
    font-size: 18px;
    font-weight: 400;
    line-height: 1.625;
    margin-bottom: 1rem;
  }

  .word {
    display: inline-block;
    margin: 0 2px;
    transition: all 0.3s ease;
    color: rgb(221, 216, 216);
  }

  .word.passed {
    color: #8f88f2;
  }

  .word.highlighted {
    color: var(--gr1);
    filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
  }

  .ready-screen {
    text-align: center;
  }

  .pause-screen {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .pause-text {
    font-size: 2rem;
    font-weight: 700;
    color: var(--gr1);
    animation: pulse 1.5s ease-in-out infinite;
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  .ready-subtitle {
    font-size: 1.125rem;
    color: #6b7280;
  }

  .controls {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .btn {
    border-radius: 8px;
    font-size: 24px;
    font-weight: 600;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    color: white;
    width: 55px;
    height: 55px;
    display: grid;
    place-content: center;
  }

  .btn:hover {
    transform: scale(1.05);
  }

  .btn-start {
    background: #54555c;
    box-shadow:
      inset 0px -1px 1px #292b2e,
      inset 0px 1px 0px #83818e;
    width: 136px;
  }

  .btn-pause {
    background: linear-gradient(to right, #f63b3b, #eb2525);
  }

  .chant-selector {
    display: flex;
    gap: 5px;
    flex: 1;
  }

  .chant-btn {
    width: 55px;
    height: 55px;
    border-radius: 8px;
    font-size: 21px;
    font-weight: 700;
    color: #92999f;
    background: #fff;
    cursor: pointer;
    transition: all 0.3s ease;
    background: #54555c;
    box-shadow:
      inset 0px -1px 1px #292b2e,
      inset 0px 1px 0px #83818e;
  }

  .chant-btn.active {
    font-size: 32px;
    font-weight: 900;
    text-shadow: 0px 4px 4px rgba(137, 158, 73, 0.82);
    color: #1ef875;
  }

  .chant-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  .left-header {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;
    flex: 1;
    padding-left: 20px;
  }
  .rnum {
    color: var(--gr1);
    font-size: 68px;
    font-weight: 700;
  }
</style>
