<script>
  import ProgressBar from "../ProgressBar.svelte";

  let {
    icon = "stress_management",
    color = "#a9a9a9",
    title = "wake up and feel",
    time = "80%",
    pt = "22:30",
  } = $props();
</script>

<div class="wrap" style="color:{color}">
  <div class="header">
    <span class="material-symbols-rounded">{icon}</span>
    <div class="text">{title}</div>
    <div class="progress">
      <ProgressBar total={10} active={1} color="#c4ff2e"></ProgressBar>
    </div>
  </div>
  <div class="body">
    <div class="card">
      <span class="material-symbols-rounded red">power_off</span>
      <div class="card-text">Tired</div>
    </div>
    <div class="card c2">
      <span class="material-symbols-rounded white">battery_error</span>
      <div class="card-text">headache</div>
    </div>
    <div class="card">
      <span class="material-symbols-rounded blue">battery_4_bar</span>
      <div class="card-text">normal</div>
    </div>
    <div class="card">
      <span class="material-symbols-rounded green">battery_6_bar</span>
      <div class="card-text">good</div>
    </div>
    <div class="card">
      <span class="material-symbols-rounded yellow">bolt</span>
      <div class="card-text">Energetic</div>
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
    color: #536454;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 68px;
    height: 86px;
    padding: 10px;
    border-radius: 8px;
    background: #2f2f34;
    box-shadow: inset 0px -2px 1px #171515;
    cursor: pointer;
  }
  .card-text {
    text-align: center;
    font-size: 12px;
  }
  .card .material-symbols-rounded {
    font-size: 24px;
    color: #fff;
    margin-right: 0;
  }
  .c2 .material-symbols-rounded {
    padding-bottom: 6px;
    border-bottom: solid 6px #bde61c4b;
    transform: scale(1.05);
    text-shadow:
      0 0 1cap #c1de19,
      0 0 2px #dbec25,
      0 0 4px rgba(184, 221, 52, 0.8);
  }
  .c2 {
    background: #36363e;
  }
  .progress {
    height: 24px;
    padding-top: 3px;
  }
  .body {
    display: flex;
    gap: 8px;
  }
  .red {
    color: #fd3030 !important;
  }
  .white {
    color: #858282 !important;
  }
  .blue {
    color: #4a58f8 !important;
  }
  .green {
    color: #1cf34a !important;
  }
  .yellow {
    color: #e8ef19 !important;
  }
</style>
