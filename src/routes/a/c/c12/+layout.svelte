<script>
  import App12 from "$lib/design/comp/app/App12.svelte";
  import Layout2 from "$lib/design/comp/layouts/Layout2.svelte";

  let { children } = $props();
  let count = $state(1);
</script>

{@render children()}
<Layout2 img="c12" icon="clothes" title="Clothes" top="320">
  {#snippet children1()}
    <App12></App12>
  {/snippet}
</Layout2>
