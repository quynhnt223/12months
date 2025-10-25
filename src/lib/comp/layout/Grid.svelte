<script>
  let { children, gr = [6, 8], t = "title", w = "468", h = "600" } = $props();
</script>

<div class="wrap" style="width:{w}px;height:{h}px">
  <header class="header"><h2>{t}</h2></header>
  <div
    class="body"
    style="  grid-template-columns: repeat({gr[0]}, 1fr);
    grid-template-rows: repeat({gr[1]}, 1fr);"
  >
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
    display: grid;
    gap: 5px;
    padding-top: 5px;
    padding-bottom: 3px;
  }
</style>
