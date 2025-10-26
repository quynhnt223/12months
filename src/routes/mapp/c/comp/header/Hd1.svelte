<script>
  import Btn1 from "../btn/Btn1.svelte";

  //for top bar
</script>

<header class="header">
  <div class="left">
    <div class="title">hello routine</div>
    <div class="progress-bar">
      <div class="progress" style="width:20%">0</div>
    </div>
  </div>
  <div class="right">
    <Btn1></Btn1>
    <Btn1></Btn1>
    <Btn1></Btn1>
  </div>
</header>

<style>
  .header {
    height: 45px;
    padding-left: 12px;
    padding-right: 12px;
    display: flex;
    align-items: start;

    gap: 12px;
    margin-bottom: 15px;
  }
  .title {
    color: var(--negr);
    font-weight: 600;
    text-transform: uppercase;
    font-weight: 800;
    letter-spacing: 1px;
  }
  .left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 6px;
    height: 45px;
    width: 186px;
    overflow: hidden;
    padding-bottom: 2px;
  }
  .progress-bar {
    height: 16px;
    width: 100%;
    position: relative;
    background: var(--bg2);
    border-radius: 3px;
    overflow: hidden;
  }
  .progress {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    background: var(--negr);
    font-size: 10px;
    padding: 2px;
    padding-right: 4px;
    text-align: right;
    font-weight: 800;
  }
  .right {
    height: 45px;
    flex: 1;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: end;
    gap: 5px;
    padding: 2px;
  }
</style>
