<script>
  let { children } = $props();

  // daily goal (ml)
  let goal = $state(2000);
  let cup = $state(200);
  let cups = $state([]);
  let total = $derived(cups.reduce((sum, c) => sum + c.amount, 0));
  let progress = $derived(Math.min((total / goal) * 100, 100)); // cap at 100%

  function setGoal(event) {
    event.preventDefault();
    saveData();
  }

  function addCup() {
    cups.push({ amount: cup });
    saveData();
  }

  function removeCup(index) {
    cups.splice(index, 1); // remove cup at position index
    saveData();
  }

  function saveData() {
    const data = { goal, cup, cups };
    localStorage.setItem("water-tracker", JSON.stringify(data));
  }

  $effect(() => {
    const saved = localStorage.getItem("water-tracker");
    if (saved) {
      const data = JSON.parse(saved);
      goal = data.goal ?? goal;
      cup = data.cup ?? cup;
      cups = data.cups ?? [];
    }
  });
</script>

<div class="wrap move">
  <h2>Set Your Daily Goal</h2>

  <form onsubmit={setGoal}>
    <input
      type="number"
      bind:value={goal}
      min="200"
      step="100"
      placeholder="ml"
    />
    <input
      type="number"
      bind:value={cup}
      min="100"
      step="100"
      placeholder="cup size (ml)"
    />
    <button type="submit">Save goal</button>
  </form>

  <p>✅ Your goal is <strong>{goal} ml</strong></p>
  <p>✅ Your cup is <strong>{cup} ml</strong></p>
  <h3>Cups</h3>
  {#if cups.length === 0}
    <p>No cups added yet</p>
  {:else}
    <ul>
      {#each cups as c, i}
        <li>Cup {i + 1}: {c.amount} ml</li>
        <button onclick={() => removeCup(i)} class="remove">x</button>
      {/each}
    </ul>
  {/if}

  <h4>Total: {total} / {goal} ml</h4>

  <!-- Progress Bar -->
  <div class="progress">
    <div class="fill" style="width: {progress}%"></div>
  </div>
  <p>{progress.toFixed(1)}% complete</p>
  <button onclick={addCup}>+ Add cup</button>
</div>

{@render children()}

<style>
  .wrap {
    position: absolute;
    z-index: 9;
    top: 100px;
    left: 200px;
    width: 300px;
    background: #fff;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border-radius: 8px;
    border: solid 1px #eceaeb;
    transition:
      top 0.4s ease,
      left 0.4s ease;
    padding: 20px;
  }

  h2 {
    margin-bottom: 10px;
    font-size: 1.2rem;
  }

  form {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  input {
    flex: 1;
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
    margin-left: 10px;
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
