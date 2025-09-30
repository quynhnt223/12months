<script>
  import App03 from "$lib/design/comp/app/App03.svelte";
  import Layout2 from "$lib/design/comp/layouts/Layout2.svelte";

  let { children } = $props();
  let count = $state(1);
</script>

{@render children()}
<Layout2 img="c03" icon="clothes" title="Clothes" top="160">
  {#snippet children1()}
    <App03></App03>
  {/snippet}</Layout2
>
