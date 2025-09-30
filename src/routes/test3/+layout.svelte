<script>
  import "./note.css";

  let { children } = $props();
</script>

<div class="wrap">
  <div class="sidenav">
    <a href="/test3/pages/data-connect">Data Connect</a>
    <a href="/test3/pages/p1">Recursive Sidebar</a>
    <a href="/test3/pages/p2">Note Page</a>
    <a href="/test3/pages/p36">Svelte 5 + Sveltekit</a>
    <a href="/test3/pages/p37">Documenting & Component Rules</a>
    <a href="/test3/pages/p38">Tổng hợp Code</a>
  </div>
  <div class="content">
    {@render children()}
  </div>
</div>

<style>
  .wrap {
    position: fixed;
    inset: 0;
    background: rgb(255, 255, 255);
    display: flex;
  }
  .sidenav {
    height: 100%;
    width: 368px;
    background: rgb(255, 255, 255);
    padding: 20px;
    padding-left: 36px;
    padding-right: 100px;
  }
  .sidenav a {
    color: #4a5160;
    font-size: 16px;
    font-weight: 600;
  }
  .content {
    flex: 1;
    height: 100%;
    overflow: auto;
    padding: 20px;
    padding-right: 300px;
    line-height: 1.6;
  }

  a {
    background: none;
    font-size: 14px;
    font-weight: 500;
    padding: 6px;
    border-radius: 2px;
    display: block;
    width: 100%;
  }
  a:hover {
    background: rgb(232, 242, 232);
  }
</style>
