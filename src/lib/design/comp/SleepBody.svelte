<script>
  import Icon from "$lib/Icon.svelte";
</script>

<div class="wrap">
  <div class="top">
    <button class="btn btn1" data-label="🌙 sleeping at"
      ><Icon name="sleep" color="#A9F61A"></Icon><span>11:00 pm</span></button
    >
    <button class="btn btn2" data-label="waking up at"
      ><Icon name="morning" color="#A9F61A"></Icon><span>11:00 pm</span></button
    >
  </div>
  <div class="title">Sleep quality</div>
  <div class="body">
    <div class="left">
      <div class="card">
        <div class="icon">
          <Icon name="morning" color="#23334D" size="14px"></Icon>
        </div>
        <div class="text">Clean Enviroment</div>
        <div class="check"><div class="circle"></div></div>
      </div>
      <div class="card">
        <div class="icon">
          <Icon name="play" color="#23334D" size="14px"></Icon>
        </div>
        <div class="text">Clean Body</div>
        <div class="check"><div class="circle"></div></div>
      </div>
      <div class="card">
        <div class="icon">
          <Icon name="mindset" color="#23334D" size="14px"></Icon>
        </div>
        <div class="text">Clean Mind</div>
        <div class="check"><div class="circle"></div></div>
      </div>
      <div class="card">
        <div class="icon">
          <Icon name="morning" color="#23334D" size="14px"></Icon>
        </div>
        <div class="text">Sleep on time</div>
        <div class="check"><div class="circle"></div></div>
      </div>
      <div class="card">
        <div class="icon">
          <Icon name="morning" color="#23334D" size="14px"></Icon>
        </div>
        <div class="text">No distraction</div>
        <div class="check"><div class="circle"></div></div>
      </div>
    </div>
    <div class="right">
      <div class="card">
        <div class="icon" style="background:#F64040">
          <Icon name="morning" color="#23334D" size="16px"></Icon>
        </div>
        <div class="text">No Distraction</div>
        <div class="check"><div class="circle"></div></div>
      </div>
      <div class="card">
        <div class="icon" style="background:#F64040">
          <Icon name="morning" color="#23334D" size="16px"></Icon>
        </div>
        <div class="text">No thinking too much</div>
        <div class="check"><div class="circle"></div></div>
      </div>
      <div class="card">
        <div class="icon" style="background:#F64040">
          <Icon name="morning" color="#23334D" size="16px"></Icon>
        </div>
        <div class="text">No Food</div>
        <div class="check"><div class="circle"></div></div>
      </div>
      <div class="card">
        <div class="icon" style="background:#F64040">
          <Icon name="morning" color="#23334D" size="16px"></Icon>
        </div>
        <div class="text">No Drink</div>
        <div class="check"><div class="circle"></div></div>
      </div>
    </div>
  </div>
</div>

<style>
  .wrap {
    height: 100%;
  }
  .top {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 10px;
  }
  .btn {
    background: #2c4d66;
    box-shadow:
      1px 2px 2px rgba(19, 36, 47, 0.86),
      inset 0px 1px 1px #5985a2;
    border-radius: 3px;
    flex: 1;
    padding-top: 8px;
    padding-bottom: 8px;
    color: #a9f61a;
    font-weight: 700;
  }
  .btn span {
    padding-left: 8px;
  }
  .btn1 {
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
  }
  .btn2 {
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
  }
  .title {
    padding-left: 10px;
    color: #717382;
    font-size: 12px;
    font-weight: 800;
  }
  .body {
    padding: 10px;
    display: flex;
    gap: 8px;
  }
  .left {
    flex: 1;
  }
  .right {
    flex: 1;
  }
  .card {
    font-size: 9px;
    font-weight: 700;
    display: flex;
    margin-bottom: 6px;
    border-radius: 6px;
    overflow: hidden;
    gap: 1px;
  }
  .icon {
    background: #40f662;
    width: 24px; /* Fixed width */
    display: flex;
    align-items: center; /* Center SVG vertically */
    justify-content: center; /* Center SVG horizontally */
    align-self: stretch;
  }
  .text {
    padding: 6px;
    background: #d6f1db;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    flex: 1;
  }
  .check {
    width: 24px;
    display: grid;
    place-content: center;
  }
  .circle {
    width: 16px;
    height: 16px;
    border-radius: 5px;
    border: solid 2px rgb(255, 255, 255);
    background: #fff;
  }
</style>
