<script>
  import { fade } from "svelte/transition";
  import { states } from "$lib/states.svelte.js";
  let { t = "title...", c = "green", content, toggle = false } = $props();

  $effect(() => {
    if (states.toggle1 != null) {
      toggle = states.toggle1;
    }
  });
</script>

<div class="t-wrap">
  <header class="t-hd">
    <button onclick={() => (toggle = !toggle)} class="{c} sound1">{t}</button>
  </header>
  {#if toggle}
    <section class="t-body" transition:fade={{ duration: 300 }}>
      <div class="t-editor">{@render content?.()}</div>
    </section>
  {/if}
</div>

<style>
  .t-wrap {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }
  .t-hd {
  }
  .t-hd button {
    display: grid;
    place-content: center;
    display: inline-block;
    border-radius: 8px;
    background: var(--green1);
    box-shadow: var(--shadow-sm);
    padding: 8px 18px;
    color: #001503;
    text-transform: capitalize;
  }
  :global(.red1) {
    background: var(--red1) !important;
    color: #fff !important;
    font-weight: 600 !important;
  }
  .t-editor {
    padding-top: 15px;
    min-height: 86px;
  }
  :global(.t-editor svg) {
    width: 100%;
    height: auto;
  }
</style>
