<script>
  let { t = "title", c = "#a9a9a9", h = "6:30" } = $props();
</script>

<div class="wrap" style="color:{c}">
  <div class="text">{t}</div>

  <div class="time">⏱️ {h}</div>
</div>

<style>
  .wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    font-size: 10px;
    padding: 10px;
    font-weight: 500;
  }
  .text {
    flex: 1;
  }
  .time {
    padding-right: 6px;
    font-weight: 600;
    opacity: 0.4;
    letter-spacing: 1.2px;
  }
</style>
