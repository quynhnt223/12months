<script>
  import { page } from "$app/state";
  import Icon from "$lib/Icon.svelte";
  let { items = [] } = $props();

  // split into 2 columns
  let half = Math.ceil(items.length / 2);
  let leftItems = $derived(items.slice(0, half));
  let rightItems = $derived(items.slice(half));
</script>

<div class="sidebar">
  <div class="col">
    {#each leftItems as item}
      <a
        href={item.id}
        class="btn"
        class:green={item.type === "green"}
        class:red={item.type === "red"}
        class:item-active={item.id === page.route.id.slice(-6)}
      >
        {item.name}
        {#if item.id === page.route.id.slice(-6)}
          <div class="dot"></div>
        {/if}
      </a>
    {/each}
  </div>

  <div class="col">
    {#each rightItems as item}
      <a
        href={item.id}
        class="btn"
        class:green={item.type === "green"}
        class:red={item.type === "red"}
        class:item-active={item.id === page.route.id.slice(-6)}
      >
        {item.name}
        {#if item.id === page.route.id.slice(-6)}
          <div class="dot"></div>
        {/if}
      </a>
    {/each}
  </div>
  <a href="/app/{page.params.id}/" class="home-btn"
    ><Icon name="home" size="16"></Icon></a
  >
</div>

<style>
  .sidebar {
    position: fixed;
    z-index: 2;
    display: flex;
    gap: 10px;
    padding: 15px;
    top: 0;
    bottom: 0;
    right: 0;
    width: 186px;
    background: var(--bg1);
    box-shadow:
      rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
      rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  }
  .col {
    display: flex;
    flex-direction: column;
  }
  .btn {
    position: relative;
    width: 72px;
    height: 45px;
    display: grid;
    place-content: center;
    position: relative;
    display: inline-block;
    text-align: center;
    margin-bottom: 8px;
    font: inherit;
    background-color: #19f081;
    border: 0;
    color: #001503;
    border-radius: 10px;
    font-size: 15px;
    padding: 10px;
    font-weight: 600;
    box-shadow: var(--shadow-lg);
    cursor: pointer;
    text-transform: capitalize;
  }
  .btn.green {
    background: #19f081;
  }
  .btn.red {
    background: #fb5555;
    color: #fff;
  }
  .item-active {
    background: #001503 !important;
    color: #9c9c9c !important;
    padding-top: 20px;
  }
  .dot {
    width: 8px;
    height: 8px;
    background: rgb(23, 241, 99);
    z-index: 1;
    position: absolute;
    top: 10px;
    right: 45%;
    border-radius: 100px;
    filter: blur(2px);
  }
  .home-btn {
    position: absolute;
    bottom: 8px;
    left: 8px;
    width: 36px;
    height: 36px;
    border-radius: 12px;
    background: var(--thumb-bg);
    display: grid;
    place-content: center;
    box-shadow: var(--shadow-lg);
  }
  a {
    -webkit-user-drag: none;
  }
</style>
