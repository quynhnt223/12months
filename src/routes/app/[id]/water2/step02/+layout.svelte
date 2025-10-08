<script>
  let { children } = $props();
  // --- Step 2: Add daily goal ---
  let cups = $state(0);
  let goal = $state(8); // You can change this later

  function addCup() {
    if (cups < goal) cups += 1;
  }

  function reset() {
    cups = 0;
  }

  // derived value for progress percentage
  let progress = $derived((cups / goal) * 100);
</script>

{@render children()}
<div class="wrap">
  <h2>💧 Water Tracker</h2>

  <p>
    You’ve drunk {cups} / {goal} cups today ({Math.round(progress)}%)
  </p>

  <!-- progress bar -->
  <div class="progress">
    <div class="bar" style="width:{progress}%"></div>
  </div>

  <div class="btns">
    <button onclick={addCup}>Add Cup</button>
    <button onclick={reset}>Reset</button>
  </div>
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
    width: 240px;
  }

  h2 {
    font-size: 1.6rem;
    margin-bottom: 8px;
  }

  p {
    margin-bottom: 10px;
    font-weight: 500;
  }

  .progress {
    height: 14px;
    background: #d3d3d3;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 12px;
  }

  .bar {
    height: 100%;
    background: #19f081; /* Fresh mint progress */
    transition: width 0.25s ease;
  }

  .btns {
    display: flex;
    gap: 8px;
  }

  button {
    padding: 8px 14px;
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
