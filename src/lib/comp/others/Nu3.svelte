<script>
  let { n = "2668", g = "3068" } = $props();
</script>

<div class="wrap">
  <div class="big">
    {n}
    <div class="below">/ {g}</div>
  </div>
</div>

<style>
  .wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 8px;
  }
  .big {
    font-size: 28px;
    font-weight: 500;
    color: #27ee77;
  }
  .below {
    font-size: 16px;
    opacity: 0.3;
  }
</style>
