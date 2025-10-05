<script>
  import { page } from "$app/state";
  import Icon from "$lib/Icon.svelte";
  import { states } from "$lib/states.svelte.js";
  import Speed from "./Speed.svelte";

  let { children } = $props();

  let apps = $state([
    {
      id: "01",
      name: "Design",
      link: "design",
      icon: "colors",
      color: "#8C6FF0",
    },
    {
      id: "02",
      name: "Svelte DnD",
      link: "sveltednd",
      icon: "stacks",
      color: "#FF5C38",
    },
    {
      id: "03",
      name: "12months",
      link: "12months",
      icon: "folder_data",
      color: "#2D9CDB",
    },
    { id: "04", name: "docs", link: "docs", icon: "book", color: "#5C6BC0" },
    {
      id: "05",
      name: "data",
      link: "data",
      icon: "database",
      color: "#26A69A",
    },
    {
      id: "06",
      name: "Svelte 5",
      link: "svelte5",
      icon: "settings",
      color: "#F9A825",
    },
    {
      id: "07",
      name: "Lessons",
      link: "lessons",
      icon: "add_notes",
      color: "#AB47BC",
    },
    { id: "08", name: "Bugs", link: "bugs", icon: "adb", color: "#E53935" },
    {
      id: "09",
      name: "water",
      link: "water",
      icon: "water_do",
      color: "#42A5F5",
    },
    {
      id: "10",
      name: "nutrition",
      link: "nutrition",
      icon: "skillet",
      color: "#66BB6A",
    },
    {
      id: "11",
      name: "fitness",
      link: "nutrition",
      icon: "body_system",
      color: "#F57C00",
    },
    { id: "12", name: "sleep", link: "water", icon: "bed", color: "#3949AB" },
    {
      id: "13",
      name: "enviroment",
      link: "water",
      icon: "other_houses",
      color: "#43A047",
    },
    {
      id: "14",
      name: "clothes",
      link: "water",
      icon: "laundry",
      color: "#9C27B0",
    },
    {
      id: "15",
      name: "money",
      link: "water",
      icon: "money_bag",
      color: "#4CAF50",
    },
    {
      id: "16",
      name: "morning",
      link: "water",
      icon: "sunny",
      color: "#FFC107",
    },
    {
      id: "17",
      name: "evening",
      link: "water",
      icon: "scene",
      color: "#7E57C2",
    },
    {
      id: "18",
      name: "work 1",
      link: "nutrition",
      icon: "timer",
      color: "#2196F3",
    },
    {
      id: "19",
      name: "work 2",
      link: "water",
      icon: "timer",
      color: "#00ACC1",
    },
    {
      id: "20",
      name: "work 3",
      link: "water",
      icon: "timer",
      color: "#26C6DA",
    },
    {
      id: "21",
      name: "work 4",
      link: "water",
      icon: "timer",
      color: "#29B6F6",
    },
    {
      id: "22",
      name: "work 5",
      link: "water",
      icon: "timer",
      color: "#64B5F6",
    },
    {
      id: "23",
      name: "work 6",
      link: "water",
      icon: "timer",
      color: "#81D4FA",
    },
    { id: "24", name: "bwa0", link: "water", icon: "house", color: "#90A4AE" },
    { id: "25", name: "bwa0", link: "water", icon: "house", color: "#B0BEC5" },
    { id: "26", name: "bwa0", link: "water", icon: "house", color: "#CFD8DC" },
    { id: "27", name: "bwa0", link: "water", icon: "house", color: "#B39DDB" },
    { id: "28", name: "bwa0", link: "water", icon: "house", color: "#80CBC4" },
    { id: "29", name: "bwa0", link: "water", icon: "house", color: "#AED581" },
    { id: "30", name: "bwa0", link: "water", icon: "house", color: "#FFB74D" },
    { id: "31", name: "bwa0", link: "water", icon: "house", color: "#4DB6AC" },
    { id: "32", name: "bwa0", link: "water", icon: "house", color: "#BA68C8" },
    { id: "33", name: "bwa0", link: "water", icon: "house", color: "#F06292" },
    { id: "34", name: "bwa0", link: "water", icon: "house", color: "#7986CB" },
    { id: "35", name: "bwa0", link: "water", icon: "house", color: "#26A69A" },
    { id: "36", name: "bwa0", link: "water", icon: "house", color: "#FF8A65" },
    { id: "37", name: "bwa0", link: "water", icon: "house", color: "#9575CD" },
    { id: "38", name: "bwa0", link: "water", icon: "house", color: "#81C784" },
    { id: "39", name: "bwa0", link: "water", icon: "house", color: "#4FC3F7" },
    { id: "40", name: "bwa0", link: "water", icon: "house", color: "#F48FB1" },
    { id: "41", name: "bwa0", link: "water", icon: "house", color: "#A1887F" },
    { id: "42", name: "bwa0", link: "water", icon: "house", color: "#CE93D8" },
    { id: "43", name: "bwa0", link: "water", icon: "house", color: "#90CAF9" },
    { id: "44", name: "bwa0", link: "water", icon: "house", color: "#B3E5FC" },
    { id: "45", name: "bwa0", link: "water", icon: "house", color: "#FFCC80" },
    { id: "46", name: "bwa0", link: "water", icon: "house", color: "#C5E1A5" },
    { id: "47", name: "bwa0", link: "water", icon: "house", color: "#80DEEA" },
    { id: "48", name: "bwa0", link: "water", icon: "house", color: "#E1BEE7" },
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
        <div class="icon">
          <span
            class="material-symbols-rounded"
            style="color:{app.color}!important">{app.icon}</span
          >
        </div>
        <div>{app.name}</div>
        <div class="thumb">
          <Speed value={50} color="#6c7fff"></Speed>
        </div>
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
    height: 100%;
    padding: 9px;
    padding-left: 8px;
    display: flex;
    align-items: center;
    flex-direction: column;
    align-items: start;
    justify-content: space-between;
    font-weight: 600;
    color: #203e1d;
    position: relative;
    font-size: 12px;
  }

  .openFloatingCard {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: #000;
    text-transform: capitalize;
    border-radius: 12px;
    background: #fff;
    box-shadow: var(--shadow-lg);
  }
  .icon {
    width: 28px;
    height: 28px;
    display: grid;
    place-content: center;
    border-radius: 10px;
    background-color: #e0e8ef;
    border-style: solid;
    border-width: 2px 2px 2px 2px;
    border-color: rgba(255, 255, 255, 0.333);

    padding: 16px 24px 16px 28px;
    transform: translate(0px, 0px) rotate(0deg);
    transition: 0.2s;
    box-shadow:
      inset 0 0.0625em 0 0 #f4f4f4,
      0 0.0625em 0 0 #efefef,
      0 0.125em 0 0 #ececec,
      0 0.25em 0 0 #e0e0e0,
      0 0.3125em 0 0 #dedede,
      0 0.375em 0 0 #dcdcdc,
      0 0.425em 0 0 #cacaca,
      0 0.425em 0.5em 0 #cecece;
  }

  .thumb {
    position: absolute;
    display: grid;
    place-content: center;
    top: 10px;
    right: 8px;
    bottom: 10px;
    width: 36px;
    height: calc(100% - 20px);
  }
</style>
