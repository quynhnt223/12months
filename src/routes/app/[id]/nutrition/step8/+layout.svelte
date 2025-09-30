<script>
  import { onMount } from "svelte";

  let { children } = $props();

  let plannedCups = $state([]);
  let plannedAmount = $state(200);
  let plannedTime = $state("09:00");

  // auto plan inputs
  let autoAmount = $state(200);
  let autoInterval = $state(120); // minutes
  let autoStart = $state("09:00");
  let autoEnd = $state("21:00");

  // derived totals
  let totalPlanned = $derived(plannedCups.reduce((s, p) => s + p.amount, 0));
  let totalDrank = $derived(
    plannedCups.filter((p) => p.done).reduce((s, p) => s + p.amount, 0)
  );
  let progress = $derived(
    totalPlanned > 0 ? Math.min((totalDrank / totalPlanned) * 100, 100) : 0
  );

  // auto-generate plan
  function generatePlan(e) {
    e.preventDefault;
    if (plannedCups.length > 0) {
      const ok = confirm(
        "⚠️ Generating a new plan will erase your current plan. Continue?"
      );
      if (!ok) return; // cancel
    }
    const [startH, startM] = autoStart.split(":").map(Number);
    const [endH, endM] = autoEnd.split(":").map(Number);

    const startDate = new Date();
    startDate.setHours(startH, startM, 0, 0);

    const endDate = new Date();
    endDate.setHours(endH, endM, 0, 0);

    const newPlan = [];
    let current = new Date(startDate);

    while (current <= endDate) {
      const plannedTime = current.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      newPlan.push({
        amount: autoAmount,
        plannedTime,
        done: false,
        drankTime: null,
      });
      current = new Date(current.getTime() + autoInterval * 60000); // add interval
    }

    plannedCups = newPlan;
    saveData();
  }

  // planned cups
  function addPlannedCup(e) {
    e.preventDefault();
    plannedCups.push({
      amount: plannedAmount,
      plannedTime,
      done: false,
      drankTime: null,
    });
    saveData();
  }

  function toggleDone(index) {
    const now = new Date();
    const cup = plannedCups[index];

    if (cup.done) {
      // undo
      plannedCups[index] = { ...cup, done: false, drankTime: null };
    } else {
      // mark as done
      const drankTime = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      plannedCups[index] = { ...cup, done: true, drankTime };
    }
    saveData();
  }

  function removePlanned(index) {
    plannedCups.splice(index, 1);
    saveData();
  }

  function saveData() {
    console.log("Saving plannedCups:", plannedCups); // debug log
    localStorage.setItem("water-tracker", JSON.stringify(plannedCups));
  }
  // load on startup
  $effect(() => {
    const saved = localStorage.getItem("water-tracker");
    if (saved) {
      plannedCups = JSON.parse(saved) ?? [];
    }
  });
</script>

<div class="wrap move">
  <h2>Daily Plan</h2>
  <!-- Auto Plan -->
  <h3>Generate Auto Plan</h3>
  <form onsubmit={generatePlan}>
    <label
      >Amount (ml): <input
        type="number"
        bind:value={autoAmount}
        min="50"
        step="50"
      /></label
    >
    <label
      >Every (minutes): <input
        type="number"
        bind:value={autoInterval}
        min="30"
        step="30"
      /></label
    >
    <label>Start: <input type="time" bind:value={autoStart} /></label>
    <label>End: <input type="time" bind:value={autoEnd} /></label>
    <button type="submit">Generate</button>
  </form>

  <form onsubmit={addPlannedCup}>
    <input type="number" bind:value={plannedAmount} min="100" step="100" />
    <input type="time" bind:value={plannedTime} />
    <button type="submit">Add Planned Cup</button>
  </form>

  {#if plannedCups.length === 0}
    <p>No planned cups</p>
  {:else}
    <ul>
      {#each plannedCups as p, i}
        <li>
          <input type="number" bind:value={p.amount} /> ml at {p.plannedTime}
          {#if p.done}
            ✅ Planned for {p.plannedTime}, Drank at {p.drankTime}
            <button onclick={() => toggleDone(i)}>↩ Undo</button>
          {:else}
            ⏰ Planned for {p.plannedTime}
            <button onclick={() => toggleDone(i)}>✅ Done</button>
          {/if}
          <button class="remove" onclick={() => removePlanned(i)}>❌</button>
        </li>
      {/each}
    </ul>
  {/if}

  <h4>Total: {totalDrank} / {totalPlanned} ml</h4>

  <!-- Progress Bar -->
  <div class="progress">
    <div class="fill" style="width: {progress}%"></div>
  </div>
  <p>{progress.toFixed(1)}% complete</p>
</div>

{@render children()}

<style>
  .wrap {
    position: absolute;
    z-index: 9;
    top: 100px;
    left: 200px;
    width: 380px;
    background: #fff;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border-radius: 8px;
    border: solid 1px #eceaeb;
    padding: 20px;
  }

  h2 {
    margin-bottom: 10px;
    font-size: 1.2rem;
  }

  form {
    display: flex;
    gap: 10px;
    margin-bottom: 15px;
  }

  input {
    padding: 6px;
    border-radius: 4px;
    border: 1px solid #ccc;
  }

  button {
    padding: 6px 12px;
    border-radius: 4px;
    border: none;
    background: #2196f3;
    color: white;
    cursor: pointer;
  }

  .remove {
    margin-left: 6px;
    background: #f44336;
    color: white;
    padding: 2px 6px;
    font-size: 0.8rem;
  }

  ul {
    padding-left: 18px;
    margin: 0 0 10px;
  }

  /* Progress bar */
  .progress {
    width: 100%;
    height: 20px;
    background: #eee;
    border-radius: 10px;
    overflow: hidden;
    margin: 10px 0;
  }

  .fill {
    height: 100%;
    background: linear-gradient(90deg, #4caf50, #81c784);
    transition: width 0.3s ease;
  }
</style>
