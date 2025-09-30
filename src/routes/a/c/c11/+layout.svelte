<script>
  import App11 from "$lib/design/comp/app/App11.svelte";
  import Layout2 from "$lib/design/comp/layouts/Layout2.svelte";

  let { children } = $props();
  let count = $state(1);
</script>

{@render children()}
<Layout2 img="c11" icon="clothes" title="Clothes" top="290">
  {#snippet children1()}
    <App11></App11>
  {/snippet}
</Layout2>
