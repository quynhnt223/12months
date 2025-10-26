<script>
  import "./app.css";
  import { states } from "./c/utils/states.svelte.js";
  import Comp1 from "./c/Comp1.svelte";
  import Comp2 from "./c/Comp2.svelte";
  import Comp3 from "./c/Comp3.svelte";
  import Comp4 from "./c/Comp4.svelte";
  import Comp5 from "./c/Comp5.svelte";
  import Comp6 from "./c/Comp6.svelte";
  import Comp7 from "./c/Comp7.svelte";
  import Comp8 from "./c/Comp8.svelte";
  import Comp9 from "./c/Comp9.svelte";
  import Comp10 from "./c/Comp10.svelte";
  import Comp11 from "./c/Comp11.svelte";
  import Comp12 from "./c/Comp12.svelte";
  import Comp13 from "./c/Comp13.svelte";
  import Comp14 from "./c/Comp14.svelte";
  import Comp15 from "./c/Comp15.svelte";
  import Comp16 from "./c/Comp16.svelte";
  import Comp17 from "./c/Comp17.svelte";
  import Comp18 from "./c/Comp18.svelte";
  import Comp19 from "./c/Comp19.svelte";
  import Comp20 from "./c/Comp20.svelte";
  import Comp21 from "./c/Comp21.svelte";
  import Comp22 from "./c/Comp22.svelte";
  import Comp23 from "./c/Comp23.svelte";
  import Comp24 from "./c/Comp24.svelte";
  import Comp25 from "./c/Comp25.svelte";
  import Comp26 from "./c/Comp26.svelte";
  import Comp27 from "./c/Comp27.svelte";
  import Comp28 from "./c/Comp28.svelte";
  import Btn1 from "./c/comp/btn/Btn1.svelte";

  // prettier-ignore
  const components = [Comp1, Comp2, Comp3, Comp4, Comp5, Comp6, Comp7, Comp8, Comp9, Comp10, Comp11, Comp12, Comp13, Comp14, Comp15, Comp16, Comp17, Comp18, Comp19, Comp20, Comp21, Comp22, Comp23, Comp24, Comp25, Comp26, Comp27, Comp28];

  const buttons = [
    { name: "Water", color: "#4a9eff", icon: "💧" },
    { name: "Nutrition", color: "#ff6b6b", icon: "🍎" },
    { name: "Money", color: "#51cf66", icon: "💰" },
    { name: "Routines", color: "#ffd43b", icon: "📋" },
    { name: "Work", color: "#ff922b", icon: "💼" },
    { name: "Fitness", color: "#cc5de8", icon: "💪" },
    { name: "Sleep", color: "#748ffc", icon: "😴" },
    { name: "Reading", color: "#ffa94d", icon: "📚" },
    { name: "Social", color: "#ff6b9d", icon: "👥" },
    { name: "Meditation", color: "#69db7c", icon: "🧘" },
    { name: "Cooking", color: "#ff8787", icon: "👨‍🍳" },
    { name: "Learning", color: "#ffd43b", icon: "🎓" },
    { name: "Cleaning", color: "#74c0fc", icon: "🧹" },
    { name: "Shopping", color: "#ff6b6b", icon: "🛒" },
    { name: "Gaming", color: "#a78bfa", icon: "🎮" },
    { name: "Music", color: "#f783ac", icon: "🎵" },
    { name: "Movies", color: "#ffa94d", icon: "🎬" },
    { name: "Walking", color: "#51cf66", icon: "🚶" },
    { name: "Journaling", color: "#cc5de8", icon: "📝" },
    { name: "Coding", color: "#4a9eff", icon: "💻" },
    { name: "Drawing", color: "#ff6b9d", icon: "🎨" },
    { name: "Yoga", color: "#69db7c", icon: "🧘‍♀️" },
    { name: "Calls", color: "#ffd43b", icon: "📞" },
    { name: "Challenges", color: "#748ffc", icon: "📅" },
    { name: "Drawing", color: "#ff6b9d", icon: "🎨" },
    { name: "Yoga", color: "#69db7c", icon: "🧘‍♀️" },
    { name: "Calls", color: "#ffd43b", icon: "📞" },
    { name: "Pray", color: "orange", icon: "📅" },
  ];

  let isOpen = $state(false);
  let activeComponentIndex = $state(0);

  const Active = $derived(components[activeComponentIndex]);

  function open(index) {
    activeComponentIndex = index;
    states.isOpen = true;
  }

  function close() {
    states.isOpen = false;
  }
</script>

<div class="wrap">
  <div class="grid">
    {#each buttons as btn, index}
      <button class="btn pop1" onclick={() => open(index)}>
        <span class="big-letters" style="color: {btn.color}"
          >{btn.name.slice(0, 2)}</span
        ><span class="small-letters">{btn.name.slice(2)}</span>
      </button>
    {/each}
  </div>
</div>

{#if states.isOpen}
  <div class="comp-wrap">
    <Btn1 cl={close} i="close" cs="closeBtn"></Btn1>
    {#if components[activeComponentIndex]}
      <Active />
    {/if}
  </div>
{/if}

<style>
  .wrap {
    position: fixed;
    inset: 0;
    padding: 6px;
    background: var(--bg1);
    padding-bottom: 86px;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(7, 1fr);
    gap: 5px;
    width: 100%;
    height: 100%;
  }

  .btn {
    background-color: var(--bg2);
    color: white;
    font-size: 1.5rem;
    font-weight: 600;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: opacity 0.2s;
    box-shadow:
      0px 1px 0px #2f2c2c,
      inset 0px 1px 0px rgba(174, 174, 174, 0.17);
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
    position: relative;
    display: flex;
    align-items: start;
    justify-content: start;
    padding: 8px;
  }

  .big-letters {
    font-size: 24px;
    font-weight: 800;
  }

  .small-letters {
    font-size: 9px;
    font-weight: 400;
    color: #ffffff;
    padding-top: 12px;
  }

  .btn:active {
    opacity: 0.8;
  }

  .comp-wrap {
    position: fixed;
    inset: 0;
    z-index: 99999;
  }
  :global(.closeBtn) {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 99999999;
  }
</style>
