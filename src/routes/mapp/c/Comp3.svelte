<script>
  const drinks = [
    { code: "W1", name: "Cold Water", time: "6:30", ml: 250, done: false },
    { code: "W2", name: "Lemon Water", time: "9:00", ml: 300, done: true },
    { code: "W3", name: "Tea", time: "11:30", ml: 200, done: false },
  ];
  const goal = 2000;
  $: total = drinks.reduce((a, d) => a + (d.done ? d.ml : 0), 0);
  $: percent = Math.round((total / goal) * 100);
</script>

<div class="wrap">
  <h2>WATER TRACKER</h2>

  {#each drinks as d}
    <div class="row">
      <div class="code">{d.code}</div>
      <div class="name">{d.name}</div>
      <div class="time">{d.time}</div>
      <div class="ml">{d.ml}ml</div>
      <div class="check {d.done ? 'done' : ''}"></div>
    </div>
  {/each}

  <div class="progress"><div class="bar" style="width:{percent}%"></div></div>
  <p>{total} / {goal} ml</p>
</div>

<style>
  .wrap {
    background: #1e1f24;
    color: #ccc;
    padding: 1rem;
  }
  h2 {
    color: #00ff88;
    font-weight: 700;
    margin-bottom: 1rem;
  }

  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #2a2c31;
    border-radius: 8px;
    padding: 0.6rem 1rem;
    margin-bottom: 0.5rem;
    transition: 0.2s;
  }
  .row:hover {
    background: #34363e;
  }
  .code {
    font-weight: 800;
    color: #00ff88;
    width: 2rem;
  }
  .name {
    flex: 1;
    color: #fff;
    margin-left: 0.5rem;
  }
  .time,
  .ml {
    color: #888;
    font-size: 0.85rem;
  }
  .check {
    width: 22px;
    height: 22px;
    border: 2px solid #00ff88;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .check.done {
    background: #00ff88;
  }
  .progress {
    margin-top: 1rem;
    height: 10px;
    border-radius: 6px;
    background: #333;
    overflow: hidden;
  }
  .bar {
    height: 100%;
    background: #00ff88;
    box-shadow: 0 0 8px #00ff88;
  }
</style>
