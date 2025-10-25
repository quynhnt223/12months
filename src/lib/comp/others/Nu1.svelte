<script>
  let { n = "1268" } = $props();
</script>

<div class="wrap">
  <div class="big">{n}</div>
  <div class="small">Calories</div>
</div>

<style>
  .wrap {
    display: flex;
    flex-direction: column;
    align-items: start;
    padding: 8px;
  }
  .big {
    font-size: 36px;
    font-weight: 700;
    color: #ff9900;
  }
  .small {
    font-size: 14px;
    color: #a9a9a9;
  }
</style>
