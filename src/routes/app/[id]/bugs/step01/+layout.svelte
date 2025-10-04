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
          <p>
            short: this warning happen because you use singleTab method but in
            browse current have more than 1 tab.
          </p>
          <p>
            so you should change <code
              >tabManager: persistentSingleTabManager</code
            >
            to <code> tabManager: persistentMultipleTabManager</code>
          </p>
        </section>
      {/snippet}
    </Toggle1>
    <Toggle1 t="And Chrome Warning...">
      {#snippet content()}
        <section>
          <Img i="2" c="2" />
        </section>
      {/snippet}
    </Toggle1>
    <Toggle1 t="Explain...">
      {#snippet content()}
        <section>
          <Img i="3" c="3" />
        </section>
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
