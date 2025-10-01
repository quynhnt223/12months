<script>
  import { page } from "$app/state";
  import { dndzone, SHADOW_ITEM_MARKER_PROPERTY_NAME } from "svelte-dnd-action";
  import { dm } from "$lib/data/sync6.js";
  import { states } from "$lib/states.svelte.js";
  import Icon from "$lib/Icon.svelte";
  import Wrapper1 from "../../Wrapper1.svelte";
  let { children } = $props();
</script>

{@render children()}
<Wrapper1 icon="water" title="Water Tracker">
  {#snippet body()}{/snippet}
</Wrapper1>
