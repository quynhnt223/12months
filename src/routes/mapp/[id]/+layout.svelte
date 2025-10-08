<script>
  let { children } = $props();
</script>

{@render children()}
<div class="m-wrap">
  <button>hello world</button>
</div>

<style>
  .m-wrap {
    position: relative;
    max-width: 600px;
    background: green;
    margin: auto;
    height: 100%;
    padding: 20px;
  }
</style>
