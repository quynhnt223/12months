<script>
  let {
    children,
    title = "app title",
    icon = "water_drop",
    grid = [8, 6],
  } = $props();
</script>

<div class="wrap move">
  <div class="header">
    <span class="material-symbols-rounded">{icon}</span>
    <h2 class="title">{title}</h2>
    <div class="nav">
      <button class="static"
        ><span class="material-symbols-rounded" style="font-size:21px!important"
          >avg_pace</span
        ></button
      >
    </div>
    <div class="btns">
      <a href="/app" class="success">
        <span
          class="material-symbols-rounded close"
          style="color:#6f8476!important">close</span
        ></a
      >
    </div>
  </div>
  <div
    class="body"
    style="grid-template-columns:repeat({grid[0]}, 1fr);grid-template-rows:repeat({grid[1]}, 1fr)"
  >
    {@render children()}
  </div>
</div>

<style>
  .material-symbols-rounded {
    color: #22ff65 !important;
    font-size: 28px !important;
  }
  .wrap {
    display: flex;
    flex-direction: column;
    position: absolute;
    z-index: 2;
    left: 300px;
    top: 68px;
    background: #47484c;
    min-width: 468px;
    height: 600px;
    border-radius: 12px;
    overflow: auto;
    transform: translateY(-8px) scale(0.95);
    animation: popIn 0.25s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    box-shadow:
      var(--sdxl),
      inset 0px 1px 0px #8a8799;
  }
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 40px;
    color: #22ff65;
    padding-left: 15px;
    padding-right: 10px;
  }
  @keyframes popIn {
    to {
      transform: translateY(0) scale(1);
    }
  }
  .title {
    padding-left: 10px;
    flex: 1;
  }
  .body {
    height: calc(100% - 40px);
    flex: 1;
    padding: 12px;
    padding-top: 0;
    display: grid;
    gap: 4px;
  }
  .static {
    width: 56px;
    height: 32px;

    background: linear-gradient(115.31deg, #434345 -4.67%, #3e3e3e 105.11%);
    box-shadow: inset 0px -2px 1px #2a2c32;
    border-radius: 8px;
    margin-right: 15px;
  }
  .static:hover {
    background: #323234;
  }
  .nav,
  .btns {
    display: flex;
    align-items: center;
  }
  .static span {
    padding-top: 3px;
  }

  .close:hover {
    color: green !important;
  }
</style>
