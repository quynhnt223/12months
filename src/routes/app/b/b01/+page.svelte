<script>
  let currentRepetition = $state(1);
  let isPlaying = $state(false);
  let isPaused = $state(false);
  let progress = $state(0);

  const mantraLines = [
    "Nam Mô Đức Đại Bi Hư Không Tạng Bồ Tát",
    "Om - Vai Zo Ra - Rat Na - Om - Tra - Soa Ha",
    "Nam Mô - A Ka Sa - Ga Ra Ha Ya",
    "Om - Ma Ry A - Ka Ma Ri - Mẫu Li - Soa Ha",
  ];

  const totalRepetitions = 49;
  const displayTime = 10000; // 10 seconds

  // Split lines into words
  const wordsPerLine = mantraLines.map((line) => line.split(" "));
  const totalWords = wordsPerLine.flat().length;

  let timer = null;
  let progressTimer = null;

  $effect(() => {
    // Clear any existing timers
    if (timer) clearTimeout(timer);
    if (progressTimer) clearInterval(progressTimer);

    if (isPlaying && !isPaused) {
      // Reset progress to 0 at the start of each cycle
      progress = 0;

      // Progress animation
      const progressInterval = 100;
      const progressStep = (100 / displayTime) * progressInterval;

      progressTimer = setInterval(() => {
        progress = (prev) => {
          const newVal = prev + progressStep;
          return newVal > 100 ? 100 : newVal;
        };
      }, progressInterval);

      // Main timer for switching to next repetition
      timer = setTimeout(() => {
        if (currentRepetition < totalRepetitions) {
          currentRepetition++;
        } else {
          isPlaying = false;
          currentRepetition = 1;
          progress = 0;
        }
      }, displayTime);
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

  // Calculate which word should be highlighted based on progress
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
          Repetition {currentRepetition} of {totalRepetitions}
        </div>
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
              Press Start to begin the 49 repetitions
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

    <!-- Info Footer -->
    <div class="footer">
      <p class="footer-main">
        All 4 lines display together for 10 seconds with karaoke highlighting
      </p>
      <p class="footer-sub">
        49 repetitions × 10 seconds = 8 minutes 10 seconds total
      </p>
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
    padding: 2rem;
  }

  .content-wrapper {
    width: 100%;
    max-width: 80rem;
  }

  .main-card {
    background: white;
    border-radius: 1.5rem;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    padding: 3rem;
    margin-bottom: 2rem;
    border: 4px solid #fcd34d;
  }

  .header {
    text-align: center;
    margin-bottom: 2rem;
  }

  .repetition-badge {
    display: inline-block;
    background: linear-gradient(to right, #f59e0b, #f97316);
    color: white;
    padding: 0.5rem 1.5rem;
    border-radius: 9999px;
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 1rem;
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

  .footer {
    text-align: center;
    margin-top: 2rem;
    color: #4b5563;
  }

  .footer-main {
    font-size: 0.875rem;
  }

  .footer-sub {
    font-size: 0.75rem;
    margin-top: 0.5rem;
    color: #9ca3af;
  }
</style>
