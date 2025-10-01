<script>
  import Icon from "$lib/Icon.svelte";
  import { dndzone, SHADOW_ITEM_MARKER_PROPERTY_NAME } from "svelte-dnd-action";

  let { children } = $props();

  let doc = $state({
    mainData: {
      days: {
        day01: {
          title: "hello",
          items: [
            { id: 1, name: "We love Life Man!" },
            { id: 2, name: "Ok, I got You Bruh" },
            { id: 3, name: "item3" },
            { id: 4, name: "item4" },
          ],
        },
      },
    },
  });

  let day = $state(doc.mainData.days.day01);

  function handleDndConsider(e) {
    day.items = e.detail.items;
  }
  function handleDndFinalize(e) {
    day.items = e.detail.items;
  }
</script>

{@render children()}
<div class="app-wrap">
  <div class="body">
    <section
      class="test"
      use:dndzone={{
        items: day.items,
        dropTargetStyle: { outline: "none" },
      }}
      onconsider={handleDndConsider}
      onfinalize={handleDndFinalize}
    >
      {#each day.items as item (item.id)}
        <div class="item">
          {item.name}
          {#if item[SHADOW_ITEM_MARKER_PROPERTY_NAME]}
            <div class="custom-shadow-item"></div>
          {/if}
        </div>
      {/each}
    </section>
    <div class="data"></div>
  </div>
</div>

<style>
  .app-wrap {
    position: absolute;
    z-index: 999;
    width: 568px;
    height: calc(100% - 45px);
    left: 700px;
    top: 12px;
    box-shadow: var(--chakra-shadows-2xl);
    background: #ececec;
    border-radius: 32px;
  }

  .body {
    padding: 20px;
  }
  section {
    padding: 3px;
    padding-top: 36px;
    padding-bottom: 68px;
    border-radius: 8px;
  }
  .item {
    background: #26fb78;
    font-size: 24px;
    font-weight: 500;
    position: relative;
    padding: 20px;
    margin-bottom: 10px;
    border-radius: 12px;
    outline: none;
    box-shadow: var(--shadow-lg);
  }
  .data {
    padding: 20px;
    color: #827f7f;
  }

  :global(.item#dnd-action-dragged-el) {
    position: relative;
    outline: none !important;
    border: none !important;
    box-shadow: var(--shadow-sm) !important;
    z-index: 99999999 !important;
  }
  .custom-shadow-item {
    position: absolute;
    z-index: 999999 !important;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    visibility: visible;
    background: #808391;
    border: dotted 1px green;
    opacity: 0.5;
    margin: 0;
    border-radius: 12px;
    box-shadow: inset 0px 2px 1px rgba(0, 0, 0, 0.25);
  }
</style>
