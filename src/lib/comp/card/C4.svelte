<script>
  let current = $state(0);
  const target = 2500;
  const cupSize = 160;
  const totalCups = target / cupSize;

  let filledCups = $derived(Math.min(Math.floor(current / cupSize), totalCups));

  const radius = 186;
  const centerX = 200;
  const centerY = 200;
  const startAngle = Math.PI * 0.75;
  const endAngle = Math.PI * 2.25;

  let popupKey = $state(0);
  let showPopup = $state(false);
  let lastAction = $state("");

  let dots = $derived(
    Array.from({ length: totalCups }, (_, i) => {
      const angle =
        startAngle + (i / (totalCups - 1)) * (endAngle - startAngle);
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      const isFilled = i < filledCups;
      const isPreview = i === filledCups && filledCups < totalCups;

      return { x, y, isFilled, isPreview };
    })
  );

  let activeAngle = $derived(
    startAngle +
      (Math.min(filledCups, totalCups - 1) / (totalCups - 1)) *
        (endAngle - startAngle)
  );
  let arcLength = $derived((endAngle - startAngle) * radius);
  let activeArcLength = $derived((activeAngle - startAngle) * radius);
  let strokeDashoffset = $derived(arcLength - activeArcLength);

  let startX = $derived(centerX + radius * Math.cos(startAngle));
  let startY = $derived(centerY + radius * Math.sin(startAngle));
  let endX = $derived(centerX + radius * Math.cos(endAngle));
  let endY = $derived(centerY + radius * Math.sin(endAngle));
  let activeX = $derived(centerX + radius * Math.cos(activeAngle));
  let activeY = $derived(centerY + radius * Math.sin(activeAngle));

  let backgroundPath = $derived(
    `M ${startX} ${startY} A ${radius} ${radius} 0 1 1 ${endX} ${endY}`
  );
  let progressPath = $derived(
    `M ${startX} ${startY} A ${radius} ${radius} 0 1 1 ${endX} ${endY}`
  );

  function handleIncrement() {
    current = current + cupSize;
    lastAction = "+";
    showPopup = true;
    popupKey += 1;
    setTimeout(() => {
      showPopup = false;
    }, 1000);
  }

  function handleDecrement() {
    if (current > 0) {
      current = Math.max(current - cupSize, 0);
      lastAction = "-";
      showPopup = true;
      popupKey += 1;
      setTimeout(() => {
        showPopup = false;
      }, 1000);
    }
  }
</script>

<div class="container">
  <div class="tracker">
    <svg width="400" height="400" class="svg-canvas">
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <!-- Background arc -->
      <path
        d={backgroundPath}
        fill="none"
        stroke="#374151"
        stroke-width="6"
        stroke-linecap="round"
      />

      <!-- Progress arc -->
      {#if filledCups > 0}
        <path
          d={progressPath}
          fill="none"
          stroke="url(#gradient)"
          stroke-width="6"
          stroke-linecap="round"
          stroke-dasharray={arcLength}
          stroke-dashoffset={strokeDashoffset}
          class="progress-line"
          filter="url(#glow)"
        />
      {/if}

      <!-- Gradient definition -->
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#818cf8;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#6366f1;stop-opacity:1" />
        </linearGradient>
      </defs>

      <!-- Dots -->
      {#each dots as dot, i (i)}
        <g class="dot-group">
          <circle
            cx={dot.x}
            cy={dot.y}
            r="10"
            fill={dot.isFilled ? "#6366f1" : "none"}
            stroke={dot.isFilled || dot.isPreview ? "#6366f1" : "#4b5563"}
            stroke-width="3"
            class="dot"
          />
        </g>
      {/each}

      <!-- Active indicator circle -->
      {#if filledCups > 0 && filledCups < totalCups}
        <g class="active-indicator">
          <circle
            cx={activeX}
            cy={activeY}
            r="18"
            fill="#6366f1"
            opacity="0.2"
            class="indicator-outer"
          />
          <circle
            cx={activeX}
            cy={activeY}
            r="13"
            fill="#6366f1"
            class="indicator-inner"
            filter="url(#glow)"
          />
        </g>
      {/if}
    </svg>

    <div class="content">
      <div class="text-center">
        <div class="current-value">
          {current}
          <span class="target-value">/ {target} ml</span>
        </div>
        <div class="percentage" class:over-goal={current > target}>
          {Math.round((current / target) * 100)}%
        </div>
      </div>
    </div>

    <!-- Popup Animation -->
    {#if showPopup}
      {#key popupKey}
        <div
          class="popup"
          class:popup-plus={lastAction === "+"}
          class:popup-minus={lastAction === "-"}
        >
          <span class="popup-sign">{lastAction}</span>{cupSize}ml
        </div>
      {/key}
    {/if}

    <div class="labels">
      <div class="label">0</div>
      <div class="label">2.5l</div>
    </div>

    <div class="buttons">
      <button
        onclick={handleDecrement}
        disabled={current === 0}
        class="btn btn-minus"
      >
        <span class="btn-icon">−</span>
      </button>
      <button onclick={handleIncrement} class="btn btn-plus pop1">
        <span class="btn-icon">+</span>
      </button>
    </div>
  </div>
</div>

<style>
  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, sans-serif;
  }

  .tracker {
    position: relative;
    padding: 2rem;
  }

  .svg-canvas {
    filter: drop-shadow(0 10px 30px rgba(99, 102, 241, 0.2));
  }

  .progress-line {
    transition: stroke-dashoffset 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .dot {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .active-indicator {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .indicator-outer {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .indicator-inner {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .content {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    pointer-events: none;
  }

  .text-center {
    text-align: center;
  }

  .current-value {
    font-size: 4.5rem;
    font-weight: 200;
    color: #f1f5f9;
    margin-bottom: 0.5rem;
    letter-spacing: -0.02em;
    line-height: 1;
  }

  .target-value {
    font-size: 2rem;
    color: #64748b;
    margin-left: 0.75rem;
    font-weight: 300;
  }

  .percentage {
    font-size: 1.25rem;
    color: #818cf8;
    font-weight: 500;
    margin-top: 0.5rem;
    transition: color 0.3s ease;
  }

  .percentage.over-goal {
    color: #fbbf24;
  }

  .popup {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 3rem;
    font-weight: 700;
    pointer-events: none;
    z-index: 100;
    animation: popupJump 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }

  .popup-plus {
    color: #10b981;
    text-shadow: 0 0 20px rgba(16, 185, 129, 0.5);
  }

  .popup-minus {
    color: #f87171;
    text-shadow: 0 0 20px rgba(248, 113, 113, 0.5);
  }

  .popup-sign {
    font-size: 2.5rem;
    margin-right: 0.25rem;
  }

  @keyframes popupJump {
    0% {
      transform: translate(-50%, -50%) scale(0.5);
      opacity: 0;
    }
    20% {
      transform: translate(-50%, -80%) scale(1.2);
      opacity: 1;
    }
    40% {
      transform: translate(-50%, -90%) scale(1);
      opacity: 1;
    }
    100% {
      transform: translate(-50%, -120%) scale(0.8);
      opacity: 0;
    }
  }

  .labels {
    position: absolute;
    bottom: 2rem;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
  }

  .label {
    font-size: 2rem;
    font-weight: 300;
    color: #94a3b8;
    letter-spacing: 0.02em;
  }

  .buttons {
    position: absolute;
    bottom: -6rem;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    gap: 1rem;
  }

  .btn {
    width: 4rem;
    height: 4rem;
    border-radius: 1.25rem;
    background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
    color: #e2e8f0;
    font-size: 2rem;
    font-weight: 300;
    border: 1px solid #334155;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow:
      0 4px 6px rgba(0, 0, 0, 0.3),
      0 1px 3px rgba(0, 0, 0, 0.2);
    position: relative;
    overflow: hidden;
  }

  .btn::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgba(99, 102, 241, 0.1) 0%,
      transparent 100%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .btn:hover:not(:disabled)::before {
    opacity: 1;
  }

  .btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow:
      0 8px 12px rgba(0, 0, 0, 0.4),
      0 2px 4px rgba(0, 0, 0, 0.3);
    border-color: #475569;
  }

  .btn:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  .btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    background: #1e293b;
  }

  .btn-icon {
    display: block;
    line-height: 1;
  }

  .btn-plus:hover:not(:disabled) {
    color: #10b981;
  }

  .btn-minus:hover:not(:disabled) {
    color: #f87171;
  }
</style>
