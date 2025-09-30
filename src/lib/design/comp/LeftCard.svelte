<div class="wrap">
  <div class="number">01</div>
  <div class="text">planning my project</div>
  <div class="timer">
    <div class="time">15mins</div>
  </div>
</div>

<style>
  .wrap {
    background: #fff;
    height: 36px;
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    border-radius: 3px;
    overflow: hidden;
    box-shadow:
      rgba(0, 0, 0, 0.12) 0px 1px 3px,
      rgba(0, 0, 0, 0.24) 0px 1px 2px;
  }
  .number {
    background: #2b254c;
    align-self: stretch;
    width: 36px;
    display: grid;
    place-content: center;
    color: var(--bg);
  }

  .text {
    font-size: 11px;
    font-weight: 600;
    color: var(--dblue);
    padding-left: 8px;
    flex: 1;
  }
  .time {
    font-size: 11px;
    padding-left: 6px;
    padding-right: 6px;
    font-weight: 600;
  }
</style>
