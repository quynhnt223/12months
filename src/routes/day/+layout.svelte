<script>
  let { children } = $props();
  let data = $state([]);
</script>

{@render children()}
<div class="surface">
  <header><div class="header"></div></header>
  <div class="main-body">
    <div class="item item1">
      <div class="title">DAILY ROUTINES</div>
      <div class="body"></div>
    </div>
    <div class="item item2">
      <div class="title">POWER BOOSTERS</div>
      <div class="body"></div>
    </div>
    <div class="item item3">
      <div class="title">WORKSPACE</div>
      <div class="body"></div>
    </div>
    <div class="item item4">
      <div class="title">CHALLENGES</div>
      <div class="body"></div>
    </div>
    <div class="item item5">
      <div class="title">DAILY SCORE</div>
      <div class="body"></div>
    </div>
  </div>
</div>

<style>
  .surface {
    position: absolute;
    inset: 0;
    background: #38f57eff;
    display: flex;
    flex-direction: column;
  }
  header {
    grid-column: 1 / span 2;
    padding: 20px;
    padding-bottom: 0;
  }
  .header {
    background: #fff;
    height: 60px;
    border-radius: 12px;
    box-shadow:
      rgba(0, 0, 0, 0.12) 0px 1px 3px,
      rgba(0, 0, 0, 0.24) 0px 1px 2px;
  }
  .main-body {
    flex: 1;
    display: grid;
    grid-template-columns: auto auto auto auto;
    gap: 20px;
    padding: 20px;
  }
  .item {
    display: flex;
    flex-direction: column;
    background: #fff;
    border-radius: 12px;
    box-shadow:
      rgba(0, 0, 0, 0.12) 0px 1px 3px,
      rgba(0, 0, 0, 0.24) 0px 1px 2px;
  }
  .title {
    text-align: left;
    padding: 20px;
    font-weight: 600;
    color: #54738f;
  }
  .body {
    flex: 1;
  }

  .item1 {
    grid-column: 1 / span 2;
  }
  .item2 {
    grid-column: 3;
    grid-row: 1 / span 2;
  }
  .item4 {
    grid-column: 1 / span 2;
    grid-row: 2;
  }
</style>
