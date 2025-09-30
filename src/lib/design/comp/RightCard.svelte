<script>
  let progress = 21; // Progress percentage (0-100)
  let time = 15; // Time in minutes

  // Functions to handle time adjustment
  function decreaseTime() {
    if (time > 0) time--;
  }

  function increaseTime() {
    time++;
  }
</script>

<div class="wrap">
  <div class="card">
    <div class="number">01</div>
    <div class="text">
      <div class="text-content">PLANNING MY PROJECT</div>
      <div class="progress-container">
        <div class="progress-bar" style="height: {progress}%"></div>
      </div>
    </div>
  </div>
  <div class="timer">
    <button class="minus" on:click={decreaseTime}>-</button>
    <div class="time">{time}m</div>
    <button class="plus" on:click={increaseTime}>+</button>
  </div>
</div>

<style>
  .wrap {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  .card {
    height: 36px;
    display: flex;
    align-items: center;
    border-radius: 3px;
    overflow: hidden;
    flex: 1;
    box-shadow:
      rgba(9, 30, 66, 0.25) 0px 1px 1px,
      rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;
  }
  .number {
    background: #d2d5ea;
    align-self: stretch;
    width: 36px;
    display: grid;
    place-content: center;
    color: #000;
  }
  .timer {
    display: flex;
    align-items: center;
    padding: 2px;
    border-radius: 3px;
    background: #708bbdff;
    margin-left: 6px;
  }
  .text {
    font-size: 9px;
    font-weight: 800;
    color: var(--dblue);
    padding-left: 8px;
    flex: 1;
    background: #fff;
    align-self: stretch;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
  }
  .text-content {
    flex: 1;
  }
  .progress-container {
    width: 6px;
    height: 24px;
    background: #7795c9a6;
    border-radius: 2px;
    overflow: hidden;
    margin-right: 6px;
    position: relative;
  }
  .progress-bar {
    width: 100%;
    background: #466099ff;

    transition: height 0.3s ease;
    position: absolute;
    bottom: 0;
  }
  .minus,
  .plus {
    width: 18px;
    height: 18px;
    display: grid;
    place-content: center;
    border-radius: 3px;
    background: #8ca2caff;
    color: var(--bg);
    font-weight: 600;
    border: none;
    cursor: pointer;
  }
  .minus:hover,
  .plus:hover {
    background: #9bb0d4ff;
  }
  .time {
    font-size: 10px;
    padding-left: 6px;
    padding-right: 6px;
    font-weight: 600;
    color: var(--bg);
  }
</style>
