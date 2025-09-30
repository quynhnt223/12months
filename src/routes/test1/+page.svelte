<script>
  import Icon from "$lib/Icon.svelte";
  import { act } from "./act.svelte.js";
</script>

{#snippet children(items)}
  {#each items as item}
    <div class="item">
      <div class="header">
        {#if item.type === "folder"}
          <div class="plus-wrap">
            <button class="plus" onclick={() => act.toggle(item)}>
              <Icon name={item.isOpen ? "minus" : "plus"} size="12"></Icon>
            </button>
          </div>
        {:else}
          <div class="file-dot-wrap"><div class="file-dot"></div></div>
        {/if}
        <div class="icon">
          <Icon
            name={item.type === "folder" ? "folder" : "file"}
            color={item.type === "folder" ? "#cde81aff" : "blue"}
          ></Icon>
        </div>
        <p>{item.name}</p>
        {#if item.type === "folder"}
          <button onclick={() => act.focus(item)}>🔍</button>
          <button onclick={() => act.add(item.children, "folder")}>📁</button>
          <button onclick={() => act.add(item.children, "file")}>📄</button>
        {/if}
      </div>
      {#if item.isOpen}
        <div class="children">
          {#if item.children?.length}
            {@render children(item.children)}
          {/if}
        </div>{/if}
    </div>
  {/each}
{/snippet}

<div class="wrap">
  {#if act.isFocus}
    <div class="main-header">
      <button onclick={() => act.unFocus()}><Icon name="back"></Icon></button>
      {act.focusTitle}
    </div>
  {/if}
  {@render children(act.displayData)}
</div>

<button onclick={() => act.add(act.displayData, "folder")}>📁sf</button>
<button onclick={() => act.add(act.displayData, "file")}>📄fa</button>

<style>
  .wrap {
    width: 300px;
  }
  .header {
    display: flex;
    align-items: center;
    margin-left: -12px;
  }
  .header p {
    flex: 1;
    padding-left: 5px;
  }
  .item {
    margin-left: 24px;
    border-left: dotted 1px green;
  }
  .icon {
    width: 24px;
    height: 24px;
    display: grid;
    place-content: center;
  }
  .plus-wrap,
  .file-dot-wrap {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .file-dot-wrap {
    justify-content: end;
  }
  .plus {
    width: 12px;
    height: 12px;
    background: #ddd;
    border-radius: 2px;
    border: solid 1px green;
    display: grid;
    place-content: center;
  }
  .file-dot {
    height: 1px;
    width: 12px;
    border-top: dotted 1px green;
  }
  .main-header {
    display: flex;
    font-weight: 600;
  }
</style>
