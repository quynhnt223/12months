<script>
  let { n = "268" } = $props();
</script>

<div class="wrap">
  <div class="big">{n}</div>
  <div class="small">Calories</div>
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
    color: #6d78f1;
  }
  .small {
    font-size: 11px;
    color: #a9a9a9;
  }
</style>
