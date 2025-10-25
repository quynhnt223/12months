<script>
  let waterIntake = $state(0);
  let goal = $state(2000);
  let cupSize = $state(250);

  let percentage = $derived(Math.min((waterIntake / goal) * 100, 100));
  let goalAchieved = $derived(waterIntake >= goal);
  let totalCups = $derived(Math.ceil(goal / cupSize));
  let filledCups = $derived(Math.floor(waterIntake / cupSize));

  function addWater() {
    waterIntake = Math.min(waterIntake + cupSize, goal + 2000);
  }

  function removeWater() {
    waterIntake = Math.max(waterIntake - cupSize, 0);
  }

  function reset() {
    waterIntake = 0;
  }
</script>

<div class="app">
  <div class="card">
    <div class="top-row">
      <div class="water-container">
        <div class="water-level" style="height: {percentage}%"></div>
        <div class="water-text">
          <div class="intake-amount">
            {waterIntake}<span class="ml-text">ml</span>
          </div>
          <div class="goal-text">of {goal}ml</div>
          <div class="percentage-text">{Math.round(percentage)}%</div>
        </div>
      </div>

      <div class="cups-section">
        <div class="cups-grid">
          {#each Array(totalCups) as _, i}
            <div class="mini-cup {i < filledCups ? 'filled' : ''}">
              <span class="cup-number">{i + 1}</span>
            </div>
          {/each}
        </div>
      </div>
    </div>

    <div class="cup-size-section">
      <label class="label">Cup Size</label>
      <div class="cup-sizes">
        {#each [150, 200, 250, 300] as size}
          <button
            onclick={() => (cupSize = size)}
            class="cup-button pop2 {cupSize === size ? 'active' : ''}"
          >
            {size}ml
          </button>
        {/each}
      </div>
    </div>

    <div class="action-buttons">
      <button onclick={removeWater} class="btn btn-remove">
        <svg
          class="btn-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        Remove
      </button>
      <button onclick={addWater} class="btn btn-add success">
        <svg
          class="btn-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        Add
      </button>
    </div>

    <button onclick={reset} class="btn btn-reset error">
      <svg
        class="btn-icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <path d="M1 4v6h6M23 20v-6h-6" />
        <path
          d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"
        />
      </svg>
      Reset Day
    </button>

    {#if goalAchieved}
      <div class="achievement">
        <p>🎉 Daily goal achieved!</p>
      </div>
    {/if}
  </div>
</div>

<style>
  .app {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
  }

  .card {
    max-width: 700px;
    width: 100%;
  }

  .top-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .water-container {
    position: relative;
    width: 100%;
    height: 240px;
    background: #37383d;
    border-radius: 1.5rem;
    overflow: hidden;
    border: 1px solid rgba(71, 85, 105, 0.3);
  }

  .water-level {
    position: absolute;
    bottom: 0;
    width: 100%;
    background: rgb(60, 109, 233);
    transition: height 0.5s ease-out;
  }

  .water-text {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 10;
  }

  .intake-amount {
    font-size: 2.25rem;
    font-weight: 700;
    color: white;
    margin-bottom: 0.5rem;
  }

  .ml-text {
    font-size: 1.125rem;
  }

  .goal-text {
    font-size: 0.75rem;
    color: #94a3b8;
  }

  .percentage-text {
    font-size: 0.875rem;
    font-weight: 600;
    color: #22d3ee;
    margin-top: 0.5rem;
  }

  .cups-section {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .cups-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.5rem;
    width: 100%;
  }

  .mini-cup {
    aspect-ratio: 1;
    background: #37383d;
    border: 2px solid #475569;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
  }

  .mini-cup.filled {
    background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
    border-color: #3b82f6;
    box-shadow: 0 0 10px rgba(37, 99, 235, 0.3);
  }

  .cup-number {
    font-size: 0.875rem;
    font-weight: 600;
    color: #94a3b8;
  }

  .mini-cup.filled .cup-number {
    color: white;
  }

  .cup-size-section {
    margin-bottom: 1.5rem;
  }

  .label {
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    color: #cbd5e1;
    margin-bottom: 0.5rem;
  }

  .cup-sizes {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.5rem;
  }

  .cup-button {
    padding: 0.5rem 0.75rem;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    border: none;
    cursor: pointer;
    transition: all 0.2s;
    background: #37383d;
    color: #cbd5e1;
  }

  .cup-button.active {
    background: #2563eb;
    color: white;
  }

  .action-buttons {
    display: flex;
    gap: 0.75rem;
    margin-bottom: 1rem;
  }

  .btn {
    flex: 1;
    font-weight: 600;
    padding: 1rem 1.5rem;
    border-radius: 0.75rem;
    transition: all 0.2s;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-size: 1rem;
  }

  .btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 4px -6px rgba(0, 0, 0, 0.4);
  }

  .btn-icon {
    width: 1.25rem;
    height: 1.25rem;
  }

  .btn-remove {
    background: #dc2626;
    color: white;
  }

  .btn-remove:hover {
    background: #b91c1c;
  }

  .btn-add {
    background: #2563eb;
    color: white;
  }

  .btn-add:hover {
    background: #1d4ed8;
  }

  .btn-reset {
    width: 100%;
    background: #37383d;
    color: #cbd5e1;
    font-weight: 500;
  }

  .achievement {
    margin-top: 1.5rem;
    background: rgba(16, 185, 129, 0.2);
    border: 1px solid rgba(16, 185, 129, 0.3);
    border-radius: 0.75rem;
    padding: 1rem;
    text-align: center;
    backdrop-filter: blur(10px);
  }

  .achievement p {
    color: #34d399;
    font-weight: 600;
    margin: 0;
  }
</style>
