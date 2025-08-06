<script>
  // Data structure
  let data = {
    routines: {
      morning: [],
      work: [],
      home: [],
      todo: [],
    },
    challenges: {
      emotion: false,
      body: false,
      people: false,
      work: false,
      love: false,
      relationships: false,
      play: false,
      spiritual: false,
      money: false,
      mind: false,
      learn: false,
      habits: false,
    },
    powerBoosters: {
      water: false,
      fitness: false,
      nutrition: false,
      environment: false,
      clothes: false,
      money: false,
      mindset: false,
      mindfulness: false,
      spiritual: false,
      social: false,
      love: false,
      work: false,
      mental: false,
      learn: false,
      character: false,
      emotions: false,
    },
    work: {
      project1: 1,
      "project 2": 2,
      "project 3": 4,
      "project 4": 2,
    },
    dailyScore: {
      mental: 80,
      body: 95,
      work: 86,
      emotions: 68,
      skill: 89,
      energy: 78,
    },
  };

  // Calculate overall progress
  $: overallProgress = Math.round(
    Object.values(data.dailyScore).reduce((sum, score) => sum + score, 0) /
      Object.values(data.dailyScore).length
  );

  // Calculate routine progress
  $: routineProgress = 60; // Example progress

  function toggleChallenge(challenge) {
    data.challenges[challenge] = !data.challenges[challenge];
  }

  function togglePowerBooster(booster) {
    data.powerBoosters[booster] = !data.powerBoosters[booster];
  }

  function addRoutineItem(category) {
    const input = prompt(`Add item to ${category}:`);
    if (input) {
      data.routines[category] = [
        ...data.routines[category],
        { text: input, completed: false },
      ];
    }
  }

  function toggleRoutineItem(category, index) {
    data.routines[category][index].completed =
      !data.routines[category][index].completed;
  }
</script>

<main class="dashboard">
  <header class="header">
    <div class="logo">
      <div class="logo-icon">⏰</div>
      <h1>DayScore</h1>
    </div>
  </header>

  <div class="dashboard-grid">
    <!-- Daily Routine -->
    <section class="card routine-card">
      <div class="card-header">
        <h2>DAILY ROUTINE</h2>
        <div class="progress-bar">
          <div class="progress-fill" style="width: {routineProgress}%"></div>
        </div>
      </div>
      <div class="routine-grid">
        {#each Object.keys(data.routines) as category}
          <div class="routine-column">
            <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
            <div class="routine-items">
              {#each data.routines[category] as item, index}
                <div class="routine-item" class:completed={item.completed}>
                  <input
                    type="checkbox"
                    bind:checked={item.completed}
                    on:change={() => toggleRoutineItem(category, index)}
                  />
                  <span>{item.text}</span>
                </div>
              {/each}
              <button class="add-btn" on:click={() => addRoutineItem(category)}
                >+</button
              >
            </div>
          </div>
        {/each}
      </div>
    </section>

    <!-- Challenges -->
    <section class="card challenges-card">
      <div class="card-header">
        <h2>CHALLENGES</h2>
      </div>
      <div class="challenges-grid">
        <div class="challenge-column">
          <h3>Emotions</h3>
          {#each ["emotion", "body", "people"] as challenge}
            <div
              class="challenge-item"
              class:active={data.challenges[challenge]}
            >
              <input
                type="checkbox"
                bind:checked={data.challenges[challenge]}
                on:change={() => toggleChallenge(challenge)}
              />
              <span>{challenge}</span>
            </div>
          {/each}
        </div>
        <div class="challenge-column">
          <h3>Work</h3>
          {#each ["work", "love", "relationships"] as challenge}
            <div
              class="challenge-item"
              class:active={data.challenges[challenge]}
            >
              <input
                type="checkbox"
                bind:checked={data.challenges[challenge]}
                on:change={() => toggleChallenge(challenge)}
              />
              <span>{challenge}</span>
            </div>
          {/each}
        </div>
        <div class="challenge-column">
          <h3>Love</h3>
          {#each ["play", "spiritual", "money"] as challenge}
            <div
              class="challenge-item"
              class:active={data.challenges[challenge]}
            >
              <input
                type="checkbox"
                bind:checked={data.challenges[challenge]}
                on:change={() => toggleChallenge(challenge)}
              />
              <span>{challenge}</span>
            </div>
          {/each}
        </div>
        <div class="challenge-column">
          <h3>People</h3>
          {#each ["mind", "learn", "habits"] as challenge}
            <div
              class="challenge-item"
              class:active={data.challenges[challenge]}
            >
              <input
                type="checkbox"
                bind:checked={data.challenges[challenge]}
                on:change={() => toggleChallenge(challenge)}
              />
              <span>{challenge}</span>
            </div>
          {/each}
        </div>
      </div>
    </section>

    <!-- Power Boosters -->
    <section class="card power-boosters-card">
      <div class="card-header">
        <h2>POWER BOOSTERS</h2>
      </div>
      <div class="power-boosters-grid">
        {#each Object.keys(data.powerBoosters) as booster}
          <div
            class="power-booster-item"
            class:active={data.powerBoosters[booster]}
          >
            <input
              type="checkbox"
              bind:checked={data.powerBoosters[booster]}
              on:change={() => togglePowerBooster(booster)}
            />
            <span>{booster}</span>
          </div>
        {/each}
      </div>
    </section>

    <!-- Workspace -->
    <section class="card workspace-card">
      <div class="card-header">
        <h2>WORKSPACE</h2>
      </div>
      <div class="workspace-content">
        {#each Object.entries(data.work) as [project, hours]}
          <div class="work-item">
            <span class="project-name">{project}</span>
            <span class="project-hours">{hours}h</span>
            <div class="time-blocks">
              {#each Array(hours) as _, i}
                <div class="time-block"></div>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </section>

    <!-- Daily Score -->
    <section class="card daily-score-card">
      <div class="card-header">
        <h2>DAILY SCORE</h2>
      </div>
      <div class="score-content">
        <div class="score-figure">
          <div class="score-circle">
            <div class="score-fill" style="--score: {overallProgress}"></div>
            <div class="score-number">{overallProgress}</div>
          </div>
        </div>
        <div class="score-breakdown">
          {#each Object.entries(data.dailyScore) as [category, score]}
            <div class="score-item">
              <span class="score-label">{category}</span>
              <span class="score-value">{score}</span>
              <div class="score-bar">
                <div class="score-bar-fill" style="width: {score}%"></div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </section>
  </div>
</main>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .dashboard {
    background: linear-gradient(135deg, #4ade80, #22c55e);
    min-height: 100vh;
    padding: 20px;
    font-family: "Arial", sans-serif;
  }

  .header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }

  .logo {
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.9);
    padding: 10px 20px;
    border-radius: 25px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .logo-icon {
    font-size: 24px;
    margin-right: 10px;
  }

  .logo h1 {
    font-size: 24px;
    font-weight: bold;
    color: #333;
  }

  .dashboard-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto auto;
    gap: 20px;
    max-width: 1400px;
    margin: 0 auto;
  }

  .card {
    background: rgba(255, 255, 255, 0.95);
    border-radius: 20px;
    padding: 20px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
  }

  .card-header {
    margin-bottom: 20px;
  }

  .card-header h2 {
    font-size: 18px;
    font-weight: bold;
    color: #333;
    margin-bottom: 10px;
  }

  .routine-card {
    grid-column: 1;
    grid-row: 1;
  }

  .challenges-card {
    grid-column: 1;
    grid-row: 2;
  }

  .power-boosters-card {
    grid-column: 2;
    grid-row: 1 / span 2;
  }

  .workspace-card {
    grid-column: 3;
    grid-row: 1;
  }

  .daily-score-card {
    grid-column: 3;
    grid-row: 2;
  }

  /* Progress Bar */
  .progress-bar {
    width: 100%;
    height: 8px;
    background: #e5e7eb;
    border-radius: 4px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #22c55e, #4ade80);
    transition: width 0.3s ease;
  }

  /* Routine Grid */
  .routine-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 15px;
  }

  .routine-column h3 {
    font-size: 14px;
    font-weight: bold;
    color: #666;
    margin-bottom: 10px;
    text-transform: capitalize;
  }

  .routine-items {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .routine-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 4px 0;
  }

  .routine-item.completed span {
    text-decoration: line-through;
    color: #999;
  }

  .add-btn {
    background: #22c55e;
    color: white;
    border: none;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    cursor: pointer;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Challenges Grid */
  .challenges-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 15px;
  }

  .challenge-column h3 {
    font-size: 14px;
    font-weight: bold;
    color: #f59e0b;
    margin-bottom: 10px;
    border-bottom: 2px solid #f59e0b;
    padding-bottom: 5px;
  }

  .challenge-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 4px 0;
  }

  .challenge-item.active span {
    color: #f59e0b;
    font-weight: bold;
  }

  /* Power Boosters Grid */
  .power-boosters-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }

  .power-booster-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    transition: all 0.2s ease;
  }

  .power-booster-item:hover {
    background: #f0fdf4;
    border-color: #22c55e;
  }

  .power-booster-item.active {
    background: #dcfce7;
    border-color: #22c55e;
    color: #16a34a;
  }

  /* Workspace */
  .workspace-content {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .work-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
  }

  .project-name {
    flex: 1;
    font-weight: 500;
  }

  .project-hours {
    font-weight: bold;
    color: #6b7280;
  }

  .time-blocks {
    display: flex;
    gap: 4px;
  }

  .time-block {
    width: 12px;
    height: 12px;
    background: #ddd6fe;
    border-radius: 2px;
  }

  /* Daily Score */
  .score-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .score-figure {
    text-align: center;
  }

  .score-circle {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: conic-gradient(
      #22c55e 0deg,
      #22c55e calc(var(--score) * 3.6deg),
      #e5e7eb calc(var(--score) * 3.6deg),
      #e5e7eb 360deg
    );
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .score-circle::before {
    content: "";
    width: 80px;
    height: 80px;
    background: white;
    border-radius: 50%;
    position: absolute;
  }

  .score-number {
    font-size: 24px;
    font-weight: bold;
    color: #22c55e;
    z-index: 1;
  }

  .score-breakdown {
    width: 100%;
  }

  .score-item {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 8px;
  }

  .score-label {
    flex: 1;
    font-size: 12px;
    color: #666;
    text-transform: capitalize;
  }

  .score-value {
    font-weight: bold;
    font-size: 12px;
    min-width: 30px;
    text-align: right;
  }

  .score-bar {
    flex: 2;
    height: 6px;
    background: #e5e7eb;
    border-radius: 3px;
    overflow: hidden;
  }

  .score-bar-fill {
    height: 100%;
    background: #22c55e;
    transition: width 0.3s ease;
  }

  /* Responsive */
  @media (max-width: 1200px) {
    .dashboard-grid {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: auto auto auto;
    }

    .power-boosters-card {
      grid-column: 1 / span 2;
      grid-row: 3;
    }
  }

  @media (max-width: 768px) {
    .dashboard-grid {
      grid-template-columns: 1fr;
    }

    .routine-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .challenges-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .power-boosters-card {
      grid-column: 1;
      grid-row: auto;
    }
  }
</style>
