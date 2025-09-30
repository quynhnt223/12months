<script>
  import BappLayout1 from "$lib/design/bapp/BappLayout1.svelte";

  let { children } = $props();
</script>

{@render children()}
<BappLayout1></BappLayout1>
