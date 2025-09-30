<script>
  import { states } from "$lib/states.svelte.js";
  import { c01 } from "$lib/actions/c/c01.svelte.js";
  import { add, remove } from "$lib/data/sync3.js";

  let { data } = $props();
</script>

<div class="wrap">
  {JSON.stringify(states.pageId)}
  <button onclick={() => add()}>add</button>
  <button onclick={() => remove()}>delete</button>
  <a href="./1">1</a>
  <a href="./2">2</a>
  <a href="./3">3</a>
  <a href="./4">3</a>
</div>

<style>
  .wrap {
    position: absolute;
    inset: 0;
    z-index: 9999;
    background: green;
  }
</style>
