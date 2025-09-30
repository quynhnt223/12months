<script>
  import App05 from "$lib/design/comp/app/App05.svelte";
  import Layout2 from "$lib/design/comp/layouts/Layout2.svelte";

  let { children } = $props();
  let count = $state(1);
</script>

{@render children()}
<Layout2 img="c05" icon="clothes" title="Clothes" top="210">
  {#snippet children1()}
    <App05></App05>
  {/snippet}</Layout2
>
