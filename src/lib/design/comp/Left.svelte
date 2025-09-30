<script>
  import { page } from "$app/stores";
  import Icon from "$lib/Icon.svelte";
  // You can pass your own items in as a prop if you want.
  export let items = [
    { id: 1, label: "SLEEP", icon: "sleep", link: "/a/b/sl" },
    { id: 2, label: "WATER", icon: "water", link: "/a/b/wa" },
    { id: 3, label: "MORNING ROUTINE", icon: "morning", link: "/a/b/mor" },
    { id: 4, label: "NIGHT ROUTINE", icon: "night", link: "/a/b/ni" },
    { id: 5, label: "NUTRITION", icon: "nutrition", link: "/a/b/nu" },
    { id: 6, label: "FITNESS", icon: "fitness", link: "/a/b/fi" },
    { id: 7, label: "CLOTHES", icon: "clothes", link: "/a/b/cl" },
    { id: 8, label: "MONEY", icon: "money", link: "/a/b/mon" },
    { id: 9, label: "PLAY", icon: "play", link: "/a/b/pl" },
    { id: 10, label: "WISDOM", icon: "wisdom", link: "/a/b/wi" },
    { id: 11, label: "SPIRITUAL", icon: "spiritual", link: "/a/b/sp" },
    { id: 12, label: "GOOD HABITS", icon: "habit", link: "/a/b/ha" },
    { id: 13, label: "LOVE", icon: "love", link: "/a/b/lo" },
    { id: 14, label: "FAMILY", icon: "family", link: "/a/b/fa" },
    { id: 15, label: "TO DO LIST", icon: "todo", link: "/a/b/to" },
    { id: 16, label: "MINDSET", icon: "mindset", link: "/a/b/mi" },
    { id: 17, label: "GARDENING", icon: "garden", link: "/a/b/ga" },
    { id: 18, label: "PET CARE", icon: "pet", link: "/a/b/pe" },
    { id: 19, label: "PLANT CARE", icon: "plant", link: "/a/b/pla" },
    { id: 20, label: "REFLECTION", icon: "plant", link: "/a/b/pla" },
  ];

  const pad2 = (n) => String(n).padStart(2, "0");
</script>

<div class="cwrap">
  <div class="cheader">
    <div class="title">Power Boosters</div>
    <div class="nav">
      <a href="/" data-label="Planning"
        ><Icon name="map" color="#38761d" />
      </a><a href="/" data-label="Goal"
        ><Icon name="goal" color="#38761d" />
      </a>
    </div>
  </div>

  <div class="cbody">
    <div class="list">
      {#each items as item (item.id)}
        <a
          href={item.link}
          class="card sound1"
          class:leftactive={$page.url.pathname === item.link}
        >
          <div class="num">{pad2(item.id)}</div>
          <div class="icon">
            <Icon name={item.icon} size="18" color="#c2f406" />
          </div>
          <div class="text">{item.label}</div>
        </a>
      {/each}
    </div>
  </div>
</div>

<style>
  .list {
    display: grid;
    gap: 6px;
    height: 100%;
  }
  .card {
    display: flex;
    align-items: center;
    background: #568a63ff;
    color: var(--bg);
    border-radius: 3px;
    overflow: hidden;
  }
  .num {
    background: #2f6e4b;
    font-weight: 800;
    font-size: 12px;
    letter-spacing: 0.5px;
    display: grid;
    place-items: center;
    width: 36px;
    align-self: stretch;
  }
  .icon {
    width: 36px;
    display: grid;
    place-content: center;
  }
  .text {
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.6px;
    text-transform: uppercase;
  }
  .card:hover {
    background: #21522f;
  }
  .leftactive {
    background: #384253;
    border: 1px solid #363f53;
    box-shadow: inset 2px 2px 2px #475f88;
  }
  .leftactive .num {
  }
</style>
