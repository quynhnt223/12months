<script>
  import { data } from "./data/comp5";
  import { states } from "./utils/states.svelte.js";
  import List from "./comp/comp5/List.svelte";
  import Chant from "./comp/comp5/Chant.svelte";
  import Image from "./comp/comp5/Image.svelte";
  import List2 from "./comp/comp5/List2.svelte";
  import Calendar from "./comp/comp5/Calendar.svelte";

  let activeStep = $state(0);
  let currentStepData = $derived(data[activeStep]);
  let p = $state(15);
</script>

{#if states.isImageOpen}
  <Image></Image>
{/if}
<div class="wrap">
  <header class="header">
    <div class="left">
      <div class="title" key={activeStep}>{currentStepData.name}</div>
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
    {#key activeStep}
      <div class="content-transition">
        {#if currentStepData.type === "list"}
          <List></List>
        {:else if currentStepData.type === "list2"}
          <List2></List2>
        {:else if currentStepData.type === "cal"}
          <Calendar></Calendar>
        {:else}
          <Chant></Chant>
        {/if}
      </div>
    {/key}
  </div>
  <div class="footer-wrap">
    <div class="footer">
      {#each data as item, i}
        <button
          onclick={() => (activeStep = i)}
          class:active-step={activeStep === i}
          >{item.step}
        </button>
      {/each}
    </div>
  </div>
</div>
<svelte:head>
  <style>
    body,
    html {
      background: var(--bg1) !important;
    }
  </style>
</svelte:head>

<style>
  .wrap {
    position: fixed;
    inset: 0;
    background: var(--bg1);
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
    color: var(--negr);
    font-weight: 600;
    text-transform: uppercase;
    font-weight: 800;
    letter-spacing: 1px;
  }
  .body {
    flex: 1;
    padding: 12px;
    padding-top: 0;
    overflow: hidden;
    position: relative;
  }
  .content-transition {
    height: 100%;
    overflow: auto;
    animation: fadeIn 0.2s ease-out;
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  .left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 6px;
    height: 45px;
    width: 186px;
    overflow: hidden;
    padding-bottom: 2px;
  }
  .progress-bar {
    height: 16px;
    width: 100%;
    position: relative;
    background: var(--bg2);
    border-radius: 3px;
    overflow: hidden;
  }
  .progress {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    background: var(--negr);
    font-size: 10px;
    padding: 2px;
    padding-right: 4px;
    text-align: right;
    font-weight: 800;
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
    background: var(--bg2);
    border-radius: 10px;
    color: #fff;
    display: grid;
    cursor: pointer;
    place-content: center;
    box-shadow: inset 0px -1px 1px #171515;
  }
  .right .material-symbols-rounded {
    color: #9da7a0;
    font-size: 18px;
  }
  .footer-wrap {
    height: 100px;
    padding: 12px;
  }
  .footer {
    height: 45px;
    display: flex;
    gap: 2px;
    align-items: start;
    border-radius: 12px;
    overflow: hidden;
  }
  .footer button {
    height: 45px;
    width: 20%;
    border-radius: 3px;
    background: var(--hv1);
    color: #9da7a0;
    font-size: 24px;
    font-weight: 800;
    transition:
      background-color 0.2s ease,
      color 0.2s ease;
  }
  button.active-step {
    background: #00ce3e;
    color: #171515;
  }
</style>
