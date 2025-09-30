<script>
  import Icon from "$lib/Icon.svelte";
</script>

<div class="header">
  <a class="back sound1" href="/a/b/wa"
    ><Icon name="back" color="#fff"></Icon></a
  >
  <div class="title">
    <Icon name="sleep" color="#fff"></Icon><span>Sleep Performance</span>
  </div>
  <div class="nav">
    <div class="month">SEPTEMPER, 2025</div>
    <button class="btn btn1"><Icon name="arrow1" color="#ceee18" /></button>
    <button class="btn btn2"><Icon name="arrow2" color="#ceee18" /></button>
    <button class="btn3"><Icon name="goal" /><span>Goal</span></button>
  </div>
</div>

<style>
  .header {
    padding-left: 6px;
    display: flex;
    align-items: center;
    height: 45px;
    display: flex;
  }
  .back {
    width: 36px;
    height: 36px;
    display: grid;
    place-content: center;
    background: #384252;
    box-shadow:
      1px 2px 1px #263548,
      inset 0px 1px 0px #5e6f87;
    border-radius: 12px;
    margin-right: 12px;
  }
  .title {
    display: flex;
    align-items: center;
    color: #ffffff;
    font-weight: 600;
  }
  .title span {
    padding-left: 12px;
  }
  .nav {
    display: flex;
    align-items: center;
    padding-left: 68px;
  }
  .month {
    height: 32px;
    background: #384252;
    box-shadow:
      1px 1px 0px #312d49,
      inset 0px 2px 1px #7586a1;
    padding: 6px;
    padding-top: 8px;
    color: #ceee18;
    padding-left: 15px;
    padding-right: 15px;
    margin-right: 2px;
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
    margin-right: 1px;
  }
  .btn {
    width: 32px;
    height: 32px;

    background: #384252;
    box-shadow:
      1px 1px 0px #312d49,
      inset 0px 2px 1px #7586a1;
  }

  .btn2 {
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
  }
  .btn3 {
    height: 30px;
    background: #6cff1d;
    box-shadow:
      2px 2px 1px #4b475e,
      inset 0px 2px 1px #e9ecc0;
    border-radius: 6px;
    margin-left: 20px;
    padding-left: 15px;
    padding-right: 15px;
    display: flex;
    align-items: center;
    font-weight: 700;
    color: #384252;
  }
  .btn3 span {
    padding-left: 8px;
    padding-top: 3px;
  }
</style>
