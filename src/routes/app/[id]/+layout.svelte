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
      color: "#19f081",
    },
    {
      id: "02",
      name: "Svelte DnD",
      link: "sveltednd",
      icon: "stacks",
      color: "#19f081",
    },
    {
      id: "03",
      name: "12months",
      link: "12months",
      icon: "folder_data",
      color: "#19f081",
    },
    {
      id: "04",
      name: "docs",
      link: "docs",
      icon: "book",
      color: "#19f081",
    },
    {
      id: "05",
      name: "data",
      link: "data",
      icon: "database",
      color: "#19f081",
    },
    {
      id: "06",
      name: "Svelte 5",
      link: "svelte5",
      icon: "settings",
      color: "#19f081",
    },
    {
      id: "07",
      name: "Lessons",
      link: "lessons",
      icon: "add_notes",
      color: "#19f081",
    },
    {
      id: "08",
      name: "Bugs",
      link: "bugs",
      icon: "adb",
      color: "#19f081",
    },
    {
      id: "09",
      name: "water",
      link: "water",
      icon: "water_do",
      color: "#7240e6",
    },
    {
      id: "10",
      name: "nutrition",
      link: "nutrition",
      icon: "skillet",
      color: "#7240e6",
    },
    {
      id: "11",
      name: "fitness",
      link: "nutrition",
      icon: "body_system",
      color: "#7240e6",
    },
    {
      id: "12",
      name: "sleep",
      link: "water",
      icon: "bed",
      color: "#7240e6",
    },
    {
      id: "13",
      name: "enviroment",
      link: "water",
      icon: "other_houses",
      color: "#7240e6",
    },
    {
      id: "14",
      name: "clothes",
      link: "water",
      icon: "laundry",
      color: "#7240e6",
    },
    {
      id: "15",
      name: "money",
      link: "water",
      icon: "money_bag",
      color: "#7240e6",
    },
    {
      id: "16",
      name: "morning",
      link: "water",
      icon: "sunny",
      color: "#7240e6",
    },
    {
      id: "17",
      name: "evening",
      link: "water",
      icon: "scene",
      color: "#7240e6",
    },
    {
      id: "18",
      name: "work 1",
      link: "nutrition",
      icon: "timer",
      color: "#7240e6",
    },
    {
      id: "19",
      name: "work 2",
      link: "water",
      icon: "timer",
      color: "#7240e6",
    },
    {
      id: "20",
      name: "work 3",
      link: "water",
      icon: "timer",
      color: "#7240e6",
    },
    {
      id: "21",
      name: "work 4",
      link: "water",
      icon: "timer",
      color: "#7240e6",
    },
    {
      id: "22",
      name: "work 5",
      link: "water",
      icon: "timer",
      color: "#7240e6",
    },
    {
      id: "23",
      name: "work 6",
      link: "water",
      icon: "timer",
      color: "#7240e6",
    },
    {
      id: "24",
      name: "bwa0",
      link: "water",
      icon: "house",
      color: "#7240e6",
    },
    {
      id: "25",
      name: "bwa0",
      link: "water",
      icon: "house",
      color: "#7240e6",
    },
    {
      id: "26",
      name: "bwa0",
      link: "water",
      icon: "house",
      color: "#7240e6",
    },
    {
      id: "27",
      name: "bwa0",
      link: "water",
      icon: "house",
      color: "#7240e6",
    },
    {
      id: "28",
      name: "bwa0",
      link: "water",
      icon: "house",
      color: "#7240e6",
    },
    {
      id: "29",
      name: "bwa0",
      link: "water",
      icon: "house",
      color: "#7240e6",
    },
    {
      id: "30",
      name: "bwa0",
      link: "water",
      icon: "house",
      color: "#7240e6",
    },
    {
      id: "31",
      name: "bwa0",
      link: "water",
      icon: "house",
      color: "#7240e6",
    },
    {
      id: "32",
      name: "bwa0",
      link: "water",
      icon: "house",
      color: "#7240e6",
    },
    {
      id: "33",
      name: "Ego",
      link: "water",
      icon: "conversation",
      color: "#c6d109",
    },
    {
      id: "34",
      name: "food",
      link: "water",
      icon: "no_food",
      color: "#c6d109",
    },
    {
      id: "35",
      name: "Anger",
      link: "water",
      icon: "sentiment_extremely_dissatisfied",
      color: "#c6d109",
    },
    {
      id: "36",
      name: "stress",
      link: "water",
      icon: "skull",
      color: "#c6d109",
    },
    {
      id: "37",
      name: "Addiction",
      link: "water",
      icon: "pill",
      color: "#c6d109",
    },
    {
      id: "38",
      name: "mess",
      link: "water",
      icon: "immunology",
      color: "#c6d109",
    },
    {
      id: "39",
      name: "bwa0",
      link: "water",
      icon: "house",
      color: "#c6d109",
    },
    {
      id: "40",
      name: "bwa0",
      link: "water",
      icon: "house",
      color: "#c6d109",
    },
    {
      id: "41",
      name: "bwa0",
      link: "water",
      icon: "house",
      color: "#c6d109",
    },
    {
      id: "42",
      name: "bwa0",
      link: "water",
      icon: "house",
      color: "#c6d109",
    },
    {
      id: "43",
      name: "bwa0",
      link: "water",
      icon: "house",
      color: "#c6d109",
    },
    {
      id: "44",
      name: "bwa0",
      link: "water",
      icon: "house",
      color: "#c6d109",
    },
    {
      id: "45",
      name: "bwa0",
      link: "water",
      icon: "house",
      color: "#c6d109",
    },
    {
      id: "46",
      name: "bwa0",
      link: "water",
      icon: "house",
      color: "#c6d109",
    },
    {
      id: "47",
      name: "bwa0",
      link: "water",
      icon: "house",
      color: "#c6d109",
    },
    {
      id: "48",
      name: "bwa0",
      link: "water",
      icon: "house",
      color: "#c6d109",
    },
  ]);

  function close() {
    states.isFloatingCard = false;
  }
</script>

<svelte:head>
  <style>
    body {
      background: #ececec;
    }
  </style>
</svelte:head>

{@render children()}
<img class="logo" src="/logo.png" alt="img" />
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
          <Speed></Speed>
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
    gap: 12px;
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
    color: #787978;
    position: relative;
    font-size: 14px;
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
    background-color: #fff;
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
    top: 0;
    right: 0;
    width: 50%;
    height: 36px;
    height: calc(100% - 36px);
  }
  .logo {
    position: absolute;
    z-index: 1;
    left: 20px;
    top: 15px;
    width: 140px;
  }
</style>
