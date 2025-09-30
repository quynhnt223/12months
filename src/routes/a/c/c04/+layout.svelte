<script>
  import App04 from "$lib/design/comp/app/App04.svelte";
  import Layout2 from "$lib/design/comp/layouts/Layout2.svelte";

  let { children } = $props();
  let count = $state(1);
</script>

{@render children()}
<Layout2 img="c04" icon="clothes" title="Clothes" top="190">
  {#snippet children1()}
    <App04></App04>
  {/snippet}</Layout2
>
