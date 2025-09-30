<script>
  import Layout2 from "$lib/design/comp/layouts/Layout2.svelte";

  let { children } = $props();
  let count = $state(1);
</script>

{@render children()}
<Layout2 img="c2" icon="clothes" title="Clothes" top="130"></Layout2>
