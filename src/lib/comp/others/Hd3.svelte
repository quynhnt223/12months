<script>
  let { t = "title", c = "#a9a9a9" } = $props();
</script>

<div class="wrap" style="color:{c}">
  <div class="text">{t}</div>
</div>

<style>
  .wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    font-size: 10px;
    padding: 10px;
    font-weight: 500;
    text-align: center;
    width: 100%;
    padding-top: 15px;
  }
</style>
