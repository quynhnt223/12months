<script>
  import App06 from "$lib/design/comp/app/App06.svelte";
  import Layout2 from "$lib/design/comp/layouts/Layout2.svelte";

  let { children } = $props();
  let count = $state(1);
</script>

{@render children()}
<Layout2 img="c06" icon="clothes" title="Clothes" top="240">
  {#snippet children1()}
    <App06></App06>
  {/snippet}
</Layout2>
