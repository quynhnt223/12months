<script>
  import App02 from "$lib/design/comp/app/App02.svelte";
  import Layout2 from "$lib/design/comp/layouts/Layout2.svelte";

  let { children } = $props();
  let count = $state(1);
</script>

{@render children()}
<Layout2 img="c02" icon="clothes" title="Clothes" top="130">
  {#snippet children1()}
    <App02></App02>
  {/snippet}</Layout2
>
