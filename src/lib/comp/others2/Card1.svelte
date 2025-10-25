<script>
  let {
    color = "#00ff97",
    i = "sunny",
    t = "name",
    time = "6:30",
    c = 1268,
    p = 25,
    carbs = 16,
    fat = 25,
    label = "bfast",
  } = $props();
</script>

<div class="wrap">
  <div class="c icon">
    <div class="label" style="color:{color}">{label}</div>
    <div class="icon-wrap">
      <span class="material-symbols-rounded" style="color:{color}">{i}</span>
    </div>
  </div>

  <div class="c name" style="color:{color}">{t}</div>
  <div class="c time">
    <span class="material-symbols-rounded">timer_play</span>{time}
  </div>
  <div class="c check"><span></span></div>
  <div class="c c5 cal info">{c}</div>
  <div class="c c6 info">{p}</div>
  <div class="c c7 info">{carbs}</div>
  <div class="c c8 info">{fat}</div>
</div>

<style>
  .wrap {
    position: relative;
    background: var(--d1);
    border-radius: var(--rs);
    box-shadow: var(--csd);
    min-height: 36px;
    display: flex;
    padding-top: 2px;
    padding-bottom: 1px;
  }
  .c {
    height: 100%;
    min-width: 36px;
    border-right: dashed 1px #47484c;
    color: #7a7f7c;
    display: flex;
    align-items: center;
    padding: 8px;
    font-size: 12px;
    padding-top: 9px;
  }
  .name {
    width: 168px;
    padding-left: 15px;
    cursor: pointer;
    font-weight: 500;
  }
  .name:hover {
    opacity: 0.6;
    font-weight: 600;
  }
  .icon {
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: 600;
    max-height: 55px;
    padding: 5px;
    width: 50px;
  }
  .icon-wrap {
    position: absolute;
    top: 0;
    right: -9px;
    bottom: 0;
    padding-top: 4px;
    width: 18px;
    display: grid;
    place-content: center;
  }
  .icon-wrap .material-symbols-rounded {
    font-size: 12px;
    width: 18px;
    height: 18px;
    display: grid;
    place-content: center;
    background: #37383d;
    border-radius: 20px;
  }
  .time {
    width: 68px;
    display: flex;
    align-items: center;
  }
  .time .material-symbols-rounded {
    font-size: 16px;
    margin-right: 8px;
  }
  .check {
    display: grid;
    place-content: center;
    cursor: pointer;
  }
  .check span {
    width: 18px;
    height: 18px;
    border: solid 2px var(--gr1);
    border-radius: 6px;
  }
  .c8 {
    flex: 1;
  }
  .info {
    width: 36px;
  }
  .cal {
    color: var(--gr1);
    width: 42px;
  }
</style>
