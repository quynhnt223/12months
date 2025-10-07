<script>
  // number of total bars
  let total = 5;
  // number of filled bars (green)
  let progress = 1;
</script>

<div class="bar-container">
  {#each Array(total) as _, i}
    <div class="bar {i < progress ? 'filled' : ''}"></div>
  {/each}
</div>

<style>
  .bar-container {
    display: flex;
    gap: 2px;
    justify-content: center;
    align-items: center;
  }

  .bar {
    width: 8px;
    height: 6px;
    background: rgb(201, 206, 201);
    border-radius: 6px;
  }

  .bar.filled {
    background: #001503; /* soft mint green */
    opacity: 1;
  }
</style>
