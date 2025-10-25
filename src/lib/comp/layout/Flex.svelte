<script>
  let { children, t = "title", w = "468", h = "600" } = $props();
</script>

<div class="wrap" style="width:{w}px;height:{h}px">
  <header class="header">
    <h2>{t}</h2>
    <div class="btns">
      <button><span class="material-symbols-rounded">edit</span></button>
      <button><span class="material-symbols-rounded">visibility</span></button>
      <button class="report"
        ><span class="material-symbols-rounded">bar_chart</span><span
          class="report-text">Report</span
        ></button
      >
    </div>
  </header>
  <div class="body">
    {@render children()}
  </div>
</div>

<style>
  .wrap {
    display: flex;
    flex-direction: column;
    position: absolute;
    padding: 6px;
    z-index: 2;
    left: 300px;
    top: 68px;
    background: #47484c;
    border-radius: 12px;
    overflow: auto;
    transform: translateY(-8px) scale(0.95);
    animation: popIn 0.25s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    box-shadow:
      var(--sdxl),
      inset 0px 1px 0px #8a8799;
  }
  @keyframes popIn {
    to {
      transform: translateY(0) scale(1);
    }
  }
  .header {
    height: 45px;
    background: var(--d1);
    border-radius: var(--rs);
    display: flex;
    align-items: center;
    padding-left: 10px;
    box-shadow: var(--csd);
  }
  .header h2 {
    color: var(--gr1);
  }
  .body {
    height: calc(100% - 45px);
    display: flex;
    flex-direction: column;
    gap: 3px;
    padding-top: 5px;
    padding-bottom: 3px;
  }
  .btns {
    display: flex;
    align-items: center;
    gap: 8px;
    padding-left: 20px;
    padding-top: 4px;
  }
  .btns button {
    width: 28px;
    height: 28px;
    border-radius: 8px;
    background: #2f2f34;
    display: grid;
    cursor: pointer;
    place-content: center;
    box-shadow: inset 0px -1px 1px #171515;
  }
  .btns button:hover {
    background: #171515;
  }
  .btns button .material-symbols-rounded {
    font-size: 12px;
    color: #616763;
  }
  .report {
    width: 68px !important;
    display: flex !important;
    align-items: center;

    color: #616763 !important;
  }
  .report-text {
    font-size: 10px !important;
    font-weight: 600;
  }
  .report .material-symbols-rounded {
    padding-right: 6px !important;
  }
</style>
