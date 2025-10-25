<script>
  let { children, grid = [1, 4, 1, 2] } = $props();
</script>

<div
  class="card"
  style="grid-column: {grid[0]} / span {grid[1]};grid-row: {grid[2]} / span {grid[3]}"
>
  {@render children()}
</div>

<style>
  .card {
    background: #37383d;
    box-shadow:
      0px 1px 0px #2f2c2c,
      inset 0px 1px 0px rgba(174, 174, 174, 0.17);
    border-radius: 8px;
    grid-column: 1 / span 8;
    grid-row: 1 / span 2;
    overflow: hidden;
  }
</style>
