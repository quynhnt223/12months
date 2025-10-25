<script>
  let { i, t, c = "#a9a9a9" } = $props();
</script>

<div class="wrap">
  <div class="left" style="color: {c}">{t}</div>
  <div class="right">{i}</div>
</div>

<style>
  .wrap {
    position: absolute;
    display: flex;
    align-items: center;
    bottom: 8px;
    left: 8px;
    right: 8px;
    height: 50px;
    background: #2f2f34;
    box-shadow: inset 0px -2px 1px #171515;
    border-radius: 6px;
  }
  .left {
    flex: 1;
    padding: 6px;
    font-size: 11px;
    text-transform: capitalize;
  }
  .right {
    width: 40px;
    height: 36px;
    border-left: solid 1px #3f3f47;
    display: grid;
    place-content: center;
    font-size: 24px;
  }
</style>
