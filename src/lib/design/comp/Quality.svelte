<script>
  export let label = "sleep quality";
  export let value = 45;
  export let min = 0;
  export let max = 100;
  export let color = "#B6F120"; // Purple color

  $: percentage = ((value - min) / (max - min)) * 100;
</script>

<div class="sleep-quality-container">
  <div class="header">
    <span class="min-value">{min}</span>
    <span class="label">{label}</span>
    <span class="max-value">{max}</span>
  </div>

  <div class="progress-container" style="--progress-percentage: {percentage}%;">
    <div class="progress-bar">
      <div
        class="progress-fill"
        style="width: {percentage}%; background-color: {color};"
      ></div>
      <div
        class="progress-thumb"
        style="left: {percentage}%; background-color: {color};"
      ></div>
    </div>
  </div>

  <div class="current-value" style="color: {color};">{value}</div>
</div>

<style>
  .sleep-quality-container {
    min-width: 168px;
    width: fit-content;
    padding: 10px;
    padding-top: 20px;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 6px;
  }

  .label {
    color: #b6f120;
    font-size: 11px;
    font-weight: 700;
    text-transform: capitalize;
    flex-grow: 1;
    text-align: center;
  }

  .min-value,
  .max-value {
    color: #a0aec0;
    font-size: 9px;
    font-weight: 600;
  }

  .max-value {
    text-align: right;
  }

  .progress-container {
    position: relative;
  }

  .progress-bar {
    position: relative;
    width: 100%;
    height: 5px;
    background-color: #2d3748;
    border-radius: 6px;
    overflow: visible;
  }

  .progress-fill {
    height: 100%;
    border-radius: 6px;
    transition: width 0.3s ease;
  }

  .progress-thumb {
    position: absolute;
    top: -2px;
    width: 8px;
    height: 8px;
    border-radius: 8px;
    transform: translateX(-8px);
    transition: left 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .current-value {
    text-align: center;
    font-size: 24px;
    font-weight: 700;
  }
</style>
