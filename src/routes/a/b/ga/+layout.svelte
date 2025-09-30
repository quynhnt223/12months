<script>
  import Layout1 from "$lib/design/comp/layouts/Layout1.svelte";

  let { children } = $props();
  let count = $state(1);
</script>

{@render children()}
<Layout1 img="/b/garden" icon="garden" title="Gardening" top="270"></Layout1>
