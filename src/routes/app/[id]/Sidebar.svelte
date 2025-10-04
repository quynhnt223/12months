<script>
  import { page } from "$app/state";
  import Icon from "$lib/Icon.svelte";
  let { steps, bugs } = $props();
</script>

<div class="sidebar">
  <div class="left">
    {#each steps as n}
      <a
        href="step{n}"
        class="btn1 sound1"
        class:l-active={`p${n}` === page.route.id.slice(-3)}
      >
        Step {n}
        {#if `p${n}` === page.route.id.slice(-3)}
          <div class="dot"></div>
        {/if}
      </a>
    {/each}
  </div>

  <div class="right">
    {#each bugs as n}
      <a
        href="bug{n}"
        class="btn1 sound1 bug"
        class:l-active={`g${n}` === page.route.id.slice(-3)}
      >
        Bug {n}
        {#if `g${n}` === page.route.id.slice(-3)}
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
  .btn1 {
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
  }
  .right .btn1 {
    background: #fb5555;
    color: #fff;
  }
  .btn1:active {
    translate: 0 0.1125em; /* half of 0.225em */
    box-shadow:
      inset 0 0.015em 0 0 #f4f4f4,
      0 0.015em 0 0 #efefef,
      0 0.03em 0 0 #ececec,
      0 0.0625em 0 0 #e0e0e0,
      0 0.0625em 0 0 #dedede,
      0 0.1em 0 0 #dcdcdc,
      0 0.1125em 0 0 #cacaca,
      0 0.1125em 0.1875em 0 #cecece;
  }
  .l-active {
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
