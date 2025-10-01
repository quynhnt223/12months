<script>
  import Icon from "$lib/Icon.svelte";
  import Wrapper1 from "../../Wrapper1.svelte";
  let { children } = $props();
</script>

{@render children()}
<Wrapper1 icon="water" title="Water Tracker">
  {#snippet body()}{/snippet}
</Wrapper1>
