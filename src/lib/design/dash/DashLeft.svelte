<script>
  import { states } from "$lib/states.svelte.js";
  import { page } from "$app/stores";
  import Icon from "$lib/Icon.svelte";
  // You can pass your own items in as a prop if you want.
  export let items = [
    { id: 1, label: "SLEEP", icon: "sleep", link: "folder1" },
    { id: 2, label: "WATER", icon: "water", link: "folder2" },
    { id: 3, label: "MORNING ROUTINE", icon: "morning", link: "folder3" },
    { id: 4, label: "NIGHT ROUTINE", icon: "night", link: "folder4" },
    { id: 5, label: "NUTRITION", icon: "nutrition", link: "folder5" },
    { id: 6, label: "FITNESS", icon: "fitness", link: "folder6" },
    { id: 7, label: "CLOTHES", icon: "clothes", link: "folder7" },
    { id: 8, label: "MONEY", icon: "money", link: "folder8" },
    { id: 9, label: "PLAY", icon: "play", link: "folder9" },
    { id: 10, label: "WISDOM", icon: "wisdom", link: "folder10" },
    { id: 11, label: "SPIRITUAL", icon: "spiritual", link: "folder11" },
    { id: 12, label: "GOOD HABITS", icon: "habit", link: "folder12" },
    { id: 13, label: "LOVE", icon: "love", link: "folder13" },
    { id: 14, label: "FAMILY", icon: "family", link: "folder14" },
    { id: 15, label: "TO DO LIST", icon: "todo", link: "folder15" },
    { id: 16, label: "MINDSET", icon: "mindset", link: "folder16" },
    { id: 17, label: "GARDENING", icon: "garden", link: "folder17" },
    { id: 18, label: "PET CARE", icon: "pet", link: "folder18" },
    { id: 19, label: "PLANT CARE", icon: "plant", link: "folder19" },
    { id: 20, label: "REFLECTION", icon: "plant", link: "folder20" },
  ];

  const pad2 = (n) => String(n).padStart(2, "0");
</script>

<div class="cwrap">
  <div class="cheader">
    <div class="title">Power Boosters</div>
    <div class="nav">
      <a href="/" data-label="Planning"
        ><Icon name="map" color="#9df30e" />
      </a><a href="/" data-label="Goal"
        ><Icon name="goal" color="#9df30e" />
      </a>
    </div>
  </div>

  <div class="cbody">
    <div class="list">
      {#each items as item (item.id)}
        <a
          href="/ap/{item.link}-{states.pageId}/b/{item.link}"
          class="card sound1"
          class:leftactive={$page.url.pathname === item.link}
        >
          <div class="num">{pad2(item.id)}</div>
          <div class="icon">
            <Icon name={item.icon} size="18" color="#3E3F4D" />
          </div>
          <div class="text">{item.label}</div>
        </a>
      {/each}
    </div>
  </div>
</div>

<style>
  .cwrap {
    width: 24%;
  }
  .list {
    display: grid;
    height: 100%;
  }
  .card {
    display: flex;
    align-items: center;
    background: #9df30e;
    color: #3e3f4d;
    border-radius: 6px;
    overflow: hidden;
    box-shadow:
      rgba(0, 0, 0, 0.12) 0px 1px 3px,
      rgba(0, 0, 0, 0.24) 0px 1px 2px;
  }
  .num {
    background: #10756c;
    color: #ffffffa8;
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
    background: #82cc08;
  }
  .leftactive {
    background: #384253;
    border: 1px solid #363f53;
    box-shadow: inset 2px 2px 2px #475f88;
  }
</style>
