<script>
  import { page } from "$app/state";
  import { nanoid } from "nanoid";
  import { dndzone, SHADOW_ITEM_MARKER_PROPERTY_NAME } from "svelte-dnd-action";
  import { dm } from "$lib/data/sync6.js";
  import { states } from "$lib/states.svelte.js";
  import Icon from "$lib/Icon.svelte";
  import Wrapper1 from "../../Wrapper1.svelte";

  let { children } = $props();

  let docId = $derived(`${states.userId}-bwa0-${page.params.id.slice(-4)}`);
  let dayId = $state("day01");
</script>

{@render children()}
<Wrapper1 icon="water" title="Water Tracker">
  {#snippet body()}{/snippet}
</Wrapper1>
