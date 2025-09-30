<script>
  import LogOut from "$lib/design/comp/LogOut.svelte";
  import { movable } from "@svelte-put/movable";
</script>

<div class="wrap2" use:movable>
  <header><span>Menu</span><a class="close" href="/a">x</a></header>
  <div class="body">
    <LogOut></LogOut>
  </div>
</div>

<style>
  .wrap2 {
    width: 200px;
    height: 300px;
    background: #f9ebdf;
    color: var(--dblue);
    position: absolute;
    z-index: 9;
    top: 20px;
    right: 36px;
    border-radius: 6px;
    font-weight: 700;

    box-shadow:
      rgba(0, 0, 0, 0.16) 0px 3px 6px,
      rgba(0, 0, 0, 0.23) 0px 3px 6px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  header {
    height: 40px;
    background: var(--dblue);
    padding: 12px;
    color: var(--bg);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 0;
  }
  .close {
    height: 40px;
    width: 40px;
    display: grid;
    place-content: center;
    color: var(--bg);
  }
</style>
