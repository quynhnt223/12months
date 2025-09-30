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
            { id: 1, name: "item1" },
            { id: 2, name: "item2" },
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
<div class="coder">
  <header class="header">
    <input type="text" value="Title" />
    <button class="darkbtn"><Icon name="eye" size="14"></Icon></button>
    <button class="darkbtn"><Icon name="plus" size="16"></Icon></button>
  </header>
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
          {item.name}<input value="cas asc as cas c as" type="text" />
          {#if item[SHADOW_ITEM_MARKER_PROPERTY_NAME]}
            <div class="custom-shadow-item"></div>
          {/if}
        </div>
      {/each}
    </section>
    <div class="data">
      {JSON.stringify(doc)}
    </div>
  </div>
</div>

<style>
  input {
    background: none;
    outline: none;
    border: none;
  }
  .darkbtn {
    border-radius: 3px;
    width: 24px;
    height: 24px;
    background: #42414b;
    margin-right: 6px;
  }
  .coder {
    position: absolute;
    z-index: 999;
    width: 568px;
    height: calc(100% - 45px);
    right: 200px;
    top: 12px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    background: #272630;
    border-radius: 6px;
    border: solid 1px rgb(83, 83, 10);
  }
  .header {
    display: flex;
    align-items: center;
    height: 36px;
  }
  .header input {
    flex: 1;
    color: #858585;
    padding: 12px;
    padding-left: 15px;
  }
  .body {
    padding: 20px;
  }
  section {
    padding: 3px;
    padding-top: 36px;
    padding-bottom: 68px;
    background: var(--c3);
    border-radius: 8px;
  }
  .item {
    background: #fff;
    position: relative;
    padding: 20px;
    margin-bottom: 10px;
    border-radius: 6px;
    outline: none;
    box-shadow:
      rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
      rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  }
  .data {
    padding: 20px;
    color: #827f7f;
  }

  :global(.test #dnd-action-dragged-el) {
    position: relative;
    outline: none !important;
    border: none !important;
    box-shadow: none;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    background: var(--c2) !important;
    z-index: 999999 !important;
  }
  .custom-shadow-item {
    position: absolute;
    z-index: 999999 !important;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    visibility: visible;
    background: rgb(135, 167, 222);
    opacity: 0.5;
    margin: 0;
    border-radius: 6px;
    box-shadow: inset 0px 2px 1px rgba(0, 0, 0, 0.25);
  }
</style>
