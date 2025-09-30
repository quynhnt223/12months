<script>
  import App10 from "$lib/design/comp/app/App10.svelte";
  import Layout2 from "$lib/design/comp/layouts/Layout2.svelte";

  let { children } = $props();
  let count = $state(1);
</script>

{@render children()}
<Layout2 img="c10" icon="clothes" title="Clothes" top="260">
  {#snippet children1()}
    <App10></App10>
  {/snippet}
</Layout2>
