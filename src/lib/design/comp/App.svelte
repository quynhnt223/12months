<script>
  let { children, test = 1 } = $props();
</script>

<div class="wrap">
  {@render children()}
  <h2>{test}</h2>
</div>

<style>
  .wrap {
    position: absolute;
    z-index: 9999;
    background: green;
    padding: 36px;
    top: 68px;
    left: 200px;
  }
</style>
