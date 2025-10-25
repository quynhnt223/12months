<script>
  import ProgressBar from "../ProgressBar.svelte";

  let {
    icon = "bolt",
    color = "#49e25a",
    title = "Sleep Condition",
    time = "80%",
    pt = "22:30",
  } = $props();
</script>

<div class="wrap" style="color:{color}">
  <div class="header">
    <span class="material-symbols-rounded">{icon}</span>
    <div class="text">{title}</div>
    <div class="progress">
      <ProgressBar total={10} active={1} {color}></ProgressBar>
    </div>
  </div>
  <div class="body">
    <div class="card">
      <span class="material-symbols-rounded">{icon}</span>
      <div class="card-text">room temputure</div>
    </div>
    <div class="card c2">
      <span class="material-symbols-rounded">{icon}</span>
      <div class="card-text">room temputure</div>
    </div>
  </div>
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

  .card {
    letter-spacing: 0.2px;
    color: #48d253;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 68px;
    height: 86px;
    padding: 6px;
    background: #3f3f47;
    border-radius: 8px;
    box-shadow: inset 0px 1px 0px #1b1922;
  }
  .card-text {
    text-align: center;
    font-size: 12px;
  }
  .card .material-symbols-rounded {
    font-size: 32px;
  }
  .c2 {
    background: #18cb48;
    color: #3b3f49;
    font-weight: 600;
  }
  .progress {
    height: 24px;
    padding-top: 3px;
  }
</style>
