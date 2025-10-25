<script>
  let { p = 20, c = " #b3f03a" } = $props();
</script>

<div class="wrap">
  <div class="bar-wrap">
    <div class="bar" style="width: {p}%; background:{c}">
      <div class="handle"></div>
    </div>
  </div>
</div>

<style>
  .wrap {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 0;
    padding: 8px;
    padding-bottom: 16px;
  }
  .bar-wrap {
    position: relative;
    height: 21px;
    background: #2f2f34;
    border-radius: 3px;
  }
  .bar {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;

    border-radius: 3px;
  }
  .handle {
    position: absolute;
    right: 5px;
    top: 5px;
    bottom: 5px;
    border-radius: 10px;
    width: 3px;

    background: #2f2f34;
  }
</style>
