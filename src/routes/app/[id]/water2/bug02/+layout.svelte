<script>
  import { page } from "$app/state";
  import { dndzone, SHADOW_ITEM_MARKER_PROPERTY_NAME } from "svelte-dnd-action";
  import { dm } from "$lib/data/sync6.svelte.js";
  import { getId } from "$lib/utils/getId.js";
  import { states } from "$lib/states.svelte.js";
  import Icon from "$lib/Icon.svelte";
  import Wrapper1 from "../../Wrapper1.svelte";
  import { getIdToken } from "firebase/auth";

  let { children } = $props();

  let dayId = $state("day01");
</script>

{@render children()}
<Wrapper1 icon="water" title="Water Tracker">
  {#snippet body()}{/snippet}
</Wrapper1>
