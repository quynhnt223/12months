<script>
  function check() {}
</script>

<div class="wrap">
  <div class="indicator-wrap"><div class="indicator"></div></div>
  <button class="name" onclick={check} aria-label="btn">Waking up</button>
  <button class="time" onclick={check} aria-label="btn"
    ><span class="material-symbols-rounded">timer</span><span class="timer"
      >6:00</span
    ></button
  >
  <button class="check-wrap" onclick={check} aria-label="btn">
    <div class="check"></div>
  </button>
</div>

<style>
  .wrap {
    background: var(--bg2);
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid rgb(121, 124, 121);
    transition: 0.15s;
    cursor: pointer;
    height: 42px;
    display: flex;
    align-items: center;
    opacity: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 5px;
  }
  .wrap:hover {
    background: var(--hv1);
  }
  .name {
    font-size: 0.85rem;
    color: rgb(232, 232, 232);
    font-weight: 500;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 1.2;
    text-decoration: none;
    text-align: left;
    height: 42px;
  }
  .name:active {
    /* simply remove the overlay */
    background: none;
    content: none;
  }
  .check-wrap,
  .time {
    width: 55px;
    height: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .time {
    width: 86px;
  }
  .time .material-symbols-rounded {
    color: var(--t1);
  }
  .timer {
    padding-left: 8px;
    font-size: 12px;
    font-weight: 600;
    color: var(--t1);
  }
  .indicator-wrap {
    width: 30px;
    height: 42px;
    display: grid;
    place-content: center;
  }
  .indicator {
    width: 4px;
    height: 18px;
    border-radius: 40px;
    background: var(--negr);
  }
  .check-wrap {
    justify-content: end;
    padding-right: 8px;
  }
  .check {
    width: 28px;
    height: 28px;
    border: 2.5px solid var(--negr);
    border-radius: 7px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
