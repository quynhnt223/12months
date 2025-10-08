<script>
  import { nanoid } from "nanoid";

  let { children } = $props();

  // --- Step 3: cups data ---
  let cups = $state([
    { id: nanoid(8), a: 200, pt: "06:00", rt: null, type: "water" },
    { id: nanoid(8), a: 200, pt: "08:00", rt: null, type: "water" },
    { id: nanoid(8), a: 200, pt: "10:00", rt: null, type: "water" },
  ]);

  function markDone(id) {
    const cup = cups.find((c) => c.id === id);
    if (cup)
      cup.rt = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
  }

  function resetAll() {
    cups.forEach((c) => (c.rt = null));
  }

  function addCup() {
    cups.push({
      id: nanoid(8),
      a: 200,
      pt: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      rt: null,
      type: "water",
    });
  }
</script>

<div class="wrap">
  <h2>💧 Water Tracker</h2>

  <div class="cup-list">
    {#each cups as c}
      <div class="cup-item">
        <div class="info">
          <span class="pt">{c.pt}</span>
          <span class="rt">{c.rt ?? "—"}</span>
        </div>
        <button onclick={() => markDone(c.id)}>
          {c.rt ? "✔" : "Drink"}
        </button>
      </div>
    {/each}
  </div>

  <div class="btns">
    <button onclick={addCup}>+ Add Cup</button>
    <button onclick={resetAll}>Reset</button>
  </div>

  {@render children()}
</div>

<style>
  .wrap {
    position: absolute;
    z-index: 9999999;
    background: rgb(214, 219, 214);
    top: 100px;
    left: 700px;
    padding: 20px;
    border-radius: 20px;
    width: 260px;
  }

  h2 {
    font-size: 1.4rem;
    margin-bottom: 12px;
  }

  .cup-list {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 12px;
  }

  .cup-item {
    background: white;
    border-radius: 8px;
    padding: 6px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .info span {
    margin-right: 8px;
  }

  .btns {
    display: flex;
    gap: 8px;
  }

  button {
    padding: 6px 12px;
    border-radius: 10px;
    border: none;
    background: #19f081;
    color: #001503;
    font-weight: 600;
    cursor: pointer;
  }

  button:last-child {
    background: #fb5555;
    color: white;
  }
</style>
