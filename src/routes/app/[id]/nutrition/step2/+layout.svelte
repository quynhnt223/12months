<script>
  let { children } = $props();

  // daily goal (ml)
  let goal = $state(2000);
  let cup = $state(200);
  let cups = $state([]);
  let total = $derived(cups.reduce((sum, c) => sum + c.amount, 0));

  function setGoal() {
    event.preventDefault();
  }

  function addCup() {
    cups.push({ amount: cup });
  }
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
      min="200"
      step="100"
      placeholder="ml"
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
      {/each}
    </ul>
  {/if}

  <h4>Total: {total} / {goal} ml</h4>
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
</style>
