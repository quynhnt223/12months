<script>
  import Icon from "$lib/Icon.svelte";
  import Toggle1 from "../../Toggle1.svelte";
  import Wrapper2 from "../../Wrapper2.svelte";
  import { states } from "$lib/states.svelte.js";
  import Img from "../../Img.svelte";
  let { children } = $props();

  states.toggle1 = null;
</script>

{@render children()}
<Wrapper2 icon="bug" color="#fb5555" title="Firestore Cache Warning">
  {#snippet body()}
    <Toggle1 t="What's wrong" toggle={true}>
      {#snippet content()}
        <section>
          <Img i="1" c="2" />
        </section>
      {/snippet}
    </Toggle1>
    <Toggle1 t="Explain it Simple">
      {#snippet content()}
        <section>
          <p>...</p>
          <p>
            ... <code>...</code>
            ... <code> ...</code>
          </p>
        </section>
      {/snippet}
    </Toggle1>
    <Toggle1 t="Why 1">
      {#snippet content()}
        <section>...</section>
      {/snippet}
    </Toggle1>
    <Toggle1 t="Why 2">
      {#snippet content()}
        <section>...</section>
      {/snippet}
    </Toggle1>
    <Toggle1 t="Solution">
      {#snippet content()}
        <section>...</section>
      {/snippet}
    </Toggle1>
    <Toggle1 t="Remember">
      {#snippet content()}
        <section>...</section>
      {/snippet}
    </Toggle1>
  {/snippet}
</Wrapper2>

<style>
  code {
    background: rgb(194, 198, 207);
    margin-left: 6px;
    margin-right: 6px;
    margin-bottom: 6px;
    border-radius: 2px;
  }
</style>
