<script>
  // Props: progress = 0–100 (%)
  let { progress = 70, color = "#4e6cff" } = $props();
</script>

<div class="line-wrap">
  <div class="number">{progress}</div>
  <div class="line">
    <!-- dots above -->
    {#each Array(5) as _, i}
      <div class="dot" style={`opacity:${1 - i * 0.15};`}></div>
    {/each}

    <!-- main circle -->
    <div class="circle" style={`background:${color};`}></div>

    <!-- dots below -->
    {#each Array(5) as _, i}
      <div class="dot" style={`opacity:${1 - i * 0.15};`}></div>
    {/each}
  </div>
</div>

<style>
  .line-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-size: 28px;
    color: #5a5df5;
    font-weight: 500;
    scale: 0.5;
  }

  .line {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
  }

  .dot {
    width: 6px;
    height: 6px;
    background: #5a5df5;
    border-radius: 50%;
  }

  .circle {
    width: 20px;
    height: 20px;
    border-radius: 50%;
  }
</style>
