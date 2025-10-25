<script>
  let currentRepetition = $state(1);
  let isPlaying = $state(false);
  let isPaused = $state(false);
  let progress = $state(0);
  let selectedChant = $state(0);

  const chants = [
    {
      name: "Chuẩn bị",
      repetitions: 1,
      displayTime: 800000, // 8 seconds
      lines: ["1. tắm rửa, đánh răng", "2. rót nước"],
    },
    {
      name: "Hư Không Tạng",
      repetitions: 49,
      displayTime: 8000, // 8 seconds
      lines: [
        "Nam Mô Đức Đại Bi Hư Không Tạng Bồ Tát",
        "Om - Vai Zo Ra - Rat Na - Om - Tra - Soa Ha",
        "Nam Mô - A Ka Sa - Ga Ra Ha Ya",
        "Om - Ma Ry A - Ka Ma Ri - Mẫu Li - Soa Ha",
      ],
    },
    {
      name: "Thập Phương Tam Bảo",
      repetitions: 7,
      displayTime: 15000, // 15 seconds
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
  const currentMantraLines = $derived(currentChant.lines);
  const wordsPerLine = $derived(
    currentMantraLines.map((line) => line.split(" "))
  );
  const totalWords = $derived(wordsPerLine.flat().length);

  let timer = null;
  let progressTimer = null;

  function startCycle() {
    if (timer) clearTimeout(timer);
    if (progressTimer) clearInterval(progressTimer);

    progress = 0;

    const progressInterval = 100;
    const progressStep = (100 / displayTime) * progressInterval;

    progressTimer = setInterval(() => {
      progress = Math.min(progress + progressStep, 100);
    }, progressInterval);

    timer = setTimeout(() => {
      if (progressTimer) clearInterval(progressTimer);

      if (currentRepetition < totalRepetitions) {
        currentRepetition++;
        startCycle();
      } else {
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
    }

    return () => {
      if (timer) clearTimeout(timer);
      if (progressTimer) clearInterval(progressTimer);
    };
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

<div class="container">
  <div class="content-wrapper">
    <!-- Main Display Card -->
    <div class="main-card">
      <div class="header">
        <div class="repetition-badge">
          {currentRepetition}
        </div>
        <div class="chant-name">{currentChant.name}</div>
      </div>

      <!-- Progress Bar -->
      {#if isPlaying}
        <div class="progress-container">
          <div class="progress-bar">
            <div class="progress-fill" style="width: {progress}%" />
          </div>
        </div>
      {/if}

      <div class="display-area">
        {#if isPlaying}
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
                  <span
                    class="word {isHighlighted ? 'highlighted' : ''} {isPassed
                      ? 'passed'
                      : ''}"
                    style="transform: {isHighlighted
                      ? 'scale(1.1)'
                      : 'scale(1)'}"
                  >
                    {word}
                  </span>
                {/each}
              </div>
            {/each}
          </div>
        {:else}
          <div class="ready-screen">
            <p class="ready-title">Ready to begin</p>
            <p class="ready-subtitle">
              {totalRepetitions} repetitions × {displayTime / 1000}s each
            </p>
            <p class="ready-info">Karaoke-style word highlighting enabled</p>
          </div>
        {/if}
      </div>
    </div>

    <!-- Controls -->
    <div class="controls">
      {#if !isPlaying}
        <button onclick={handleStart} class="btn btn-start"> Start </button>
      {:else}
        <button onclick={handlePause} class="btn btn-pause">
          {isPaused ? "Resume" : "Pause"}
        </button>
        <button onclick={handleReset} class="btn btn-reset"> Reset </button>
      {/if}
    </div>

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
  </div>
</div>

<style>
  :global(body) {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, sans-serif;
  }

  .container {
    min-height: 100vh;
    background: linear-gradient(135deg, #fef3c7 0%, #fed7aa 50%, #fecaca 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
  }

  .content-wrapper {
    width: 100%;
    max-width: 600px;
  }

  .main-card {
    background: white;
    border-radius: 1.5rem;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    padding: 10px;
    margin-bottom: 1rem;
    border: 1px solid #fcd34d;
  }

  .header {
    text-align: center;
    margin-bottom: 2rem;
    position: relative;
  }

  .repetition-badge {
    font-size: 86px;
    font-weight: 800;
    color: orange;
  }

  .chant-name {
    font-size: 18px;
    font-weight: 600;
    color: #f97316;
    margin-top: 0.5rem;
  }

  .progress-container {
    margin-bottom: 2rem;
  }

  .progress-bar {
    width: 100%;
    height: 0.75rem;
    background-color: #e5e7eb;
    border-radius: 9999px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(to right, #fb923c, #ef4444);
    transition: width 0.1s linear;
  }

  .display-area {
    background: linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%);
    border-radius: 1rem;
    padding: 2rem;
    min-height: 250px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
  }

  .mantra-text {
    text-align: center;
    width: 100%;
  }

  .mantra-line {
    font-size: 18px;
    font-weight: bold;
    line-height: 1.625;
    margin-bottom: 1rem;
  }

  .word {
    display: inline-block;
    margin: 0 0.25rem;
    transition: all 0.3s ease;
    color: #9ca3af;
  }

  .word.passed {
    color: #fb923c;
  }

  .word.highlighted {
    color: #dc2626;
    filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
  }

  .ready-screen {
    text-align: center;
  }

  .ready-title {
    font-size: 1.875rem;
    color: #9ca3af;
    margin-bottom: 1rem;
  }

  .ready-subtitle {
    font-size: 1.125rem;
    color: #6b7280;
  }

  .ready-info {
    font-size: 0.875rem;
    color: #9ca3af;
    margin-top: 1rem;
  }

  .controls {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .btn {
    padding: 1rem 3rem;
    border-radius: 9999px;
    font-size: 1.25rem;
    font-weight: 600;
    border: none;
    cursor: pointer;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    color: white;
  }

  .btn:hover {
    transform: scale(1.05);
  }

  .btn-start {
    background: linear-gradient(to right, #10b981, #059669);
  }

  .btn-start:hover {
    background: linear-gradient(to right, #059669, #047857);
  }

  .btn-pause {
    background: linear-gradient(to right, #3b82f6, #2563eb);
  }

  .btn-pause:hover {
    background: linear-gradient(to right, #2563eb, #1d4ed8);
  }

  .btn-reset {
    background: linear-gradient(to right, #ef4444, #dc2626);
  }

  .btn-reset:hover {
    background: linear-gradient(to right, #dc2626, #b91c1c);
  }

  .chant-selector {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .chant-btn {
    width: 60px;
    height: 60px;
    border-radius: 12px;
    font-size: 1.5rem;
    font-weight: 700;
    border: 3px solid #fcd34d;
    background: white;
    color: #f97316;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .chant-btn:hover:not(:disabled) {
    transform: scale(1.1);
    background: #fef3c7;
  }

  .chant-btn.active {
    background: linear-gradient(to right, #f59e0b, #f97316);
    color: white;
    border-color: #f97316;
  }

  .chant-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>
