<script>
  import { page } from "$app/state";
  import Icon from "$lib/Icon.svelte";
  import Coder from "../Coder.svelte";
  let { children } = $props();
  let links = [
    "step1",
    "step2",
    "step3",
    "step4",
    "step5",
    "step6",
    "step7",
    "step8",
  ];
</script>

{@render children()}
<div class="nav">
  {#each links as link}
    <a
      class="link {link.toLowerCase().includes('bug') ? 'bug' : ''}"
      class:active={link === page.route.id.split("/").pop()}
      href="/app/{page.params.id}/water/{link}">{link}</a
    >
  {/each}
  <a href="/app/{page.params.id}" class="home sound2"
    ><Icon name="home" size="14" color="#fff"></Icon></a
  >
</div>

<Coder></Coder>

<style>
  .nav {
    position: fixed;
    padding: 20px;
    right: 0;
    top: 0;
    bottom: 68px;
    width: 250px;
    z-index: 999;
    background: #fff;
    border-radius: 6px;
    box-shadow:
      rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
      rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  }
  .link {
    padding: 6px;
    color: #fff;
    border-radius: 6px;
    margin-right: 10px;
    margin-bottom: 10px;
    display: inline-block;
    background-color: #0095ff;
    border: 1px solid transparent;
    box-shadow: rgba(255, 255, 255, 0.4) 0 1px 0 0 inset;
  }
  .active {
    background: #1d202c;
  }
  .home {
    width: 28px;
    height: 28px;
    border-radius: 6px;
    position: absolute;
    bottom: 6px;
    right: 6px;
    background: rgb(43, 43, 45);
    display: grid;
    place-content: center;
  }
</style>
