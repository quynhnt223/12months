<script>
  import Icon from "$lib/Icon.svelte";
  import { c01 } from "$lib/actions/c/c01.svelte.js";
  let data = $state([
    { id: 1, who: "mom", handle: "good", score: 25 },
    { id: 2, who: "mom", handle: "bad", score: -25 },
  ]);

  let num = $state(0);

  function add() {
    num += 1;
  }
  function remove() {
    num -= 1;
  }
</script>

<div class="wrap4">
  <div class="header">
    <div class="icon"><Icon name="emotion"></Icon></div>
    <div class="title">Anger</div>
    <div class="num">{num}</div>
    <button class="btn minus" onclick={remove}>-</button>
    <button class="btn plus" onclick={() => c01.add()}>+</button>
    <a href="./info" class="info">?</a>
  </div>
  <div class="body">
    {#if num === 0}
      <div class="no">👍 you have <span>0</span> anger today</div>
    {:else}
      {#each data as item}
        <div class="list">
          <div class="card">
            <div class="text1">i'm having a temple with</div>
            <div class="text2">mom</div>
            <div class="text3">and i handle it</div>
            <div class="text4">well</div>
            <div class="score">+25 points</div>
          </div>
        </div>
      {/each}
    {/if}
    {JSON.stringify(c01.data)}
  </div>
</div>

<style>
  .wrap4 {
    position: absolute;
    background: #f9ebdf;
    z-index: 99;
    min-height: 200px;
    width: 450px;
    top: 80px;
    right: 24%;
    border-radius: 8px;
    box-shadow:
      rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
      rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    border: solid 1px green;
    overflow: hidden;
  }
  .header {
    height: 45px;
    background: #bcd6c2;
    display: flex;
    align-items: center;
  }
  .btn,
  .num,
  .info {
    height: 36px;
    width: 36px;
    border-radius: 6px;
    display: grid;
    place-content: center;
  }
  .no {
    padding: 20px;
    display: grid;
    place-content: center;
  }
  .no span {
    font-size: 36px;
  }
  .card {
    display: flex;
    align-items: center;
    padding: 9px;
  }
</style>
