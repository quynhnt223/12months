<script>
  import App09 from "$lib/design/comp/app/App09.svelte";
  import Layout2 from "$lib/design/comp/layouts/Layout2.svelte";

  let { children } = $props();
  let count = $state(1);
</script>

{@render children()}
<Layout2 img="c09" icon="clothes" title="Clothes" top="300">
  {#snippet children1()}
    <App09></App09>
  {/snippet}
</Layout2>
