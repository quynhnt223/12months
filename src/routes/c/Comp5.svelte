<script>
  import { states } from "./utils/states.svelte.js";
  import List from "./comp/comp5/List.svelte";
  let p = $state(15);
</script>

<div class="wrap">
  <header class="header">
    <div class="left">
      <div class="title">Morning Routine</div>
      <div class="progress-bar">
        <div class="progress" style="width:{p}%">0</div>
      </div>
    </div>
    <div class="right">
      <button onclick={() => (states.isOpen = false)} class="close"
        ><span class="material-symbols-rounded">edit</span></button
      >
      <button onclick={() => (states.isOpen = false)} class="close"
        ><span class="material-symbols-rounded">visibility</span></button
      >
      <button onclick={() => (states.isOpen = false)} class="close"
        ><span class="material-symbols-rounded">bar_chart</span>
      </button>
      <button onclick={() => (states.isOpen = false)} class="close"
        ><span class="material-symbols-rounded">close</span>
      </button>
    </div>
  </header>
  <div class="body">
    <List></List>
  </div>
</div>
<svelte:head>
  <style>
    body,
    html {
      background: #212121 !important;
    }
  </style>
</svelte:head>

<style>
  .wrap {
    position: fixed;
    inset: 0;
    background: #212121;
    display: flex;
    flex-direction: column;
  }
  .header {
    height: 45px;
    padding-left: 12px;
    padding-right: 12px;
    display: flex;
    align-items: start;

    gap: 12px;
    margin-bottom: 15px;
  }
  .title {
    color: rgb(0, 206, 62);
    font-weight: 600;
    text-transform: uppercase;
    font-weight: 800;
    letter-spacing: 1px;
  }
  .body {
    flex: 1;
    padding: 12px;
    padding-top: 0;
  }
  .left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 6px;
    height: 45px;
    padding-bottom: 2px;
  }
  .progress-bar {
    height: 16px;
    width: 100%;
    position: relative;
    background: rgb(66, 66, 66);
    border-radius: 3px;
    overflow: hidden;
  }
  .progress {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    background: rgb(0, 206, 62);
    font-size: 10px;
    padding: 2px;
    padding-right: 4px;
    text-align: right;
    font-weight: 800;
  }
  .progress span {
    font-size: 6px;
  }
  .right {
    height: 45px;
    flex: 1;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: end;
    gap: 5px;
    padding: 2px;
  }
  .close {
    width: 45px;
    height: 45px;
    background: #212121;
    border-radius: 10px;
    color: #fff;
    background: #2f2f34;
    display: grid;
    cursor: pointer;
    place-content: center;
    box-shadow: inset 0px -1px 1px #171515;
  }
  .right .material-symbols-rounded {
    color: #9da7a0;
    font-size: 18px;
  }
</style>
