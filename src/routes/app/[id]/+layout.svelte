<script>
  import { page } from "$app/state";
  import Icon from "$lib/Icon.svelte";
  import { states } from "$lib/states.svelte.js";

  let { children } = $props();

  let apps = $state([
    { id: "01", name: "🎨 Design", link: "design" },
    { id: "02", name: "🎴 Svelte DnD", link: "sveltednd" },
    { id: "03", name: "🗓️ 12months", link: "12months" },
    { id: "04", name: "📓 docs", link: "docs" },
    { id: "05", name: "🗃️ data", link: "data" },
    { id: "06", name: "⚙️ Svelte 5", link: "svelte5" },
    { id: "07", name: "📗 Lessons", link: "lessons" },
    { id: "08", name: "🚨 Bugs", link: "bugs" },
    { id: "09", name: "💧 water", link: "water" },
    { id: "10", name: "🥑 nutrition", link: "nutrition" },
    { id: "11", name: "🥑 nutrition", link: "nutrition" },
    { id: "12", name: "Work 1", link: "water" },
    { id: "13", name: "Work 2", link: "water" },
    { id: "14", name: "bwa0", link: "water" },
    { id: "15", name: "bwa0", link: "water" },
    { id: "16", name: "bwa0", link: "water" },
    { id: "17", name: "💧 water", link: "water" },
    { id: "18", name: "🥑 nutrition", link: "nutrition" },
    { id: "19", name: "bwa0", link: "water" },
    { id: "20", name: "bwa0", link: "water" },
    { id: "21", name: "bwa0", link: "water" },
    { id: "22", name: "bwa0", link: "water" },
    { id: "23", name: "bwa0", link: "water" },
    { id: "24", name: "bwa0", link: "water" },
    { id: "25", name: "bwa0", link: "water" },
    { id: "26", name: "bwa0", link: "water" },
    { id: "27", name: "bwa0", link: "water" },
    { id: "28", name: "bwa0", link: "water" },
    { id: "29", name: "bwa0", link: "water" },
    { id: "30", name: "bwa0", link: "water" },
    { id: "31", name: "bwa0", link: "water" },
    { id: "32", name: "bwa0", link: "water" },
    { id: "33", name: "bwa0", link: "water" },
    { id: "34", name: "bwa0", link: "water" },
    { id: "35", name: "bwa0", link: "water" },
    { id: "36", name: "bwa0", link: "water" },
    { id: "37", name: "bwa0", link: "water" },
    { id: "38", name: "bwa0", link: "water" },
    { id: "39", name: "bwa0", link: "water" },
    { id: "40", name: "bwa0", link: "water" },
    { id: "41", name: "bwa0", link: "water" },
    { id: "42", name: "bwa0", link: "water" },
    { id: "43", name: "bwa0", link: "water" },
    { id: "44", name: "bwa0", link: "water" },
    { id: "45", name: "bwa0", link: "water" },
    { id: "46", name: "bwa0", link: "water" },
    { id: "47", name: "bwa0", link: "water" },
    { id: "48", name: "bwa0", link: "water" },
  ]);

  function close() {
    states.isFloatingCard = false;
  }
</script>

<svelte:head>
  <style>
    body {
      background: #19f081;
    }
  </style>
</svelte:head>

{@render children()}

<div class="wrap">
  {#each apps as app}
    <a
      href="/app/290925/{app.link}/step01"
      class="openFloatingCard sound1"
      onclick={() => (states.isFloatingCard = true)}
      ><div class="header">
        {app.name}
      </div>
    </a>
  {/each}
</div>

<style>
  :root {
    --c3: #b3f02d;
    --c1: #9d94f4;
    --c2: #34e569;
    --c4: #d1ff17;
    --c5: #d1ff17;
    --c6: #d1ff17;
    --sd1: 0px 1px 1px rgba(0, 0, 0, 0.25);
    --sd2: 0px 1px 1px rgba(40, 33, 92, 0.63);
  }
  .wrap {
    position: fixed;

    inset: 36px;
    left: 400px;
    right: 36px;
    display: grid;
    gap: 6px;
    grid-template-columns: repeat(8, 1fr); /* 7 equal-width columns */
    grid-auto-rows: 86px; /* Row height */
    -webkit-user-select: none; /* Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+/Edge */
    user-select: none; /* Standard */
  }
  .header {
    height: 36px;
    padding-left: 8px;
    display: flex;
    align-items: center;
    font-weight: 600;
    color: #203e1d;
  }

  .openFloatingCard {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: #000;
    text-transform: capitalize;
    border-radius: 6px;
    background: #fff;
    box-shadow: var(--shadow-sm);
  }
</style>
