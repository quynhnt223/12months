<script>
  let { children } = $props();
</script>

<span>{@render children()}</span>

<style>
  span {
    background: rgb(195, 221, 195);
  }
</style>
