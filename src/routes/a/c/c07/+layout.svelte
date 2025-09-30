<script>
  import App07 from "$lib/design/comp/app/App07.svelte";
  import Layout2 from "$lib/design/comp/layouts/Layout2.svelte";

  let { children } = $props();
  let count = $state(1);
</script>

{@render children()}
<Layout2 img="c07" icon="clothes" title="Clothes" top="260">
  {#snippet children1()}
    <App07></App07>
  {/snippet}
</Layout2>
