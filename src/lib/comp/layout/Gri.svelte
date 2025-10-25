<script>
  let { children, gr } = $props();
</script>

<div class="wrap" style="grid-area: {gr}">{@render children()}</div>

<style>
  .wrap {
    position: relative;
    background: var(--d1);
    border-radius: var(--rs);
    box-shadow: var(--csd);
  }
</style>
