<script>
  import App08 from "$lib/design/comp/app/App08.svelte";
  import Layout2 from "$lib/design/comp/layouts/Layout2.svelte";

  let { children } = $props();
  let count = $state(1);
</script>

{@render children()}
<Layout2 img="c08" icon="clothes" title="Clothes" top="280">
  {#snippet children1()}
    <App08></App08>
  {/snippet}
</Layout2>
