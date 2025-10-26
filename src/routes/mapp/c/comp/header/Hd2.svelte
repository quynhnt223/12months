<script>
  //for list
</script>

<div class="wrap">
  <div class="indicator-wrap">
    <div class="indicator"><div class="dot"></div></div>
  </div>
  <div class="name">Working with me</div>
  <div class="badge">6</div>
  <div class="time-wrap">
    <span class="material-symbols-rounded">timer</span>
    <div class="time">20 mins</div>
  </div>
</div>

<style>
  .wrap {
    height: 48px;
    display: flex;
    align-items: center;
  }
  .indicator-wrap {
    width: 30px;
    height: 36px;
    display: flex;
    align-items: center;
  }
  .indicator {
    width: 18px;
    height: 18px;
    background: rgba(255, 255, 0, 0.16);
    border-radius: 100px;
    display: grid;
    place-content: center;
  }
  .dot {
    width: 10px;
    height: 10px;
    background: var(--negr);
    border-radius: 20px;
  }
  .name {
    color: var(--t2);
    padding-right: 10px;
    font-weight: 700;
  }
  .badge {
    border-radius: 20px;
    height: 24px;
    padding: 10px;
    font-size: 0.8rem;
    font-weight: 700;
    display: grid;
    place-content: center;
    background: var(--bg2);
    color: var(--t1);
  }
  .time-wrap {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: end;
    padding-right: 8px;
    color: var(--negr);
  }
  .time {
    font-size: 14px;
    font-weight: 600;
  }
  .time-wrap .material-symbols-rounded {
    font-size: 21px;
    margin-right: 8px;
    color: var(--negr);
  }
</style>
