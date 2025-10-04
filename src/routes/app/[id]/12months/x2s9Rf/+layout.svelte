<script>
  import Icon from "$lib/Icon.svelte";
  import Toggle1 from "../../Toggle1.svelte";
  import Wrapper2 from "../../Wrapper2.svelte";
  import { states } from "$lib/states.svelte.js";
  let { children } = $props();

  states.toggle1 = true;
</script>

{@render children()}
<Wrapper2 icon="book" title="title...">
  {#snippet body()}
    <Toggle1 t="header 1...">
      {#snippet content()}{/snippet}
    </Toggle1>
  {/snippet}
</Wrapper2>
