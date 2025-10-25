<script>
  let {
    icon = "hotel",
    color = "#a9a9a9",
    title = "Bedtime",
    time = "23:00",
    pt = "22:30",
  } = $props();
</script>

<div class="wrap" style="color:{color}">
  <div class="header">
    <span class="material-symbols-rounded">{icon}</span>
    <div class="text">{title}</div>
    <div class="plan">
      <span class="material-symbols-rounded">timer</span>
      <div class="text">{pt}</div>
    </div>
  </div>
  <div class="time">{time}</div>
</div>

<style>
  .wrap {
    padding: 10px;
    letter-spacing: 1.1px;
  }
  .material-symbols-rounded {
    font-size: 18px;
    margin-right: 10px;
  }
  .header {
    display: flex;
    align-items: center;
    padding-bottom: 6px;
    opacity: 0.8;
  }
  .text {
    font-size: 12px;
    font-weight: 500;
  }
  .time {
    font-size: 36px;
    font-weight: 500;
  }
  .plan {
    display: flex;
    align-items: center;
    padding-left: 20px;
    opacity: 0.4;
  }
</style>
