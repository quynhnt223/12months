<script>
  import Icon from "$lib/Icon.svelte";
  import Wrapper2 from "../../Wrapper2.svelte";
  let { children } = $props();
</script>

{@render children()}
<Wrapper2 icon="bug" color="#fb5555" title="Bug 2">
  {#snippet body()}
    <a href="../lessons/step01">Lesson 01</a>
    <h1>Hello Worls</h1>
    <p>We should have some working</p>
  {/snippet}
</Wrapper2>
