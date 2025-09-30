<script>
  import Icon from "$lib/Icon.svelte";
  // You can pass your own items in as a prop if you want.
  export let items = [
    { id: 1, label: "MOTIVATION", icon: "emotion", link: "c01" },
    { id: 2, label: "STRESS", icon: "drug", link: "c02" },
    { id: 3, label: "POR*", icon: "mindset2", link: "c03" },
    { id: 4, label: "FOOD", icon: "nutrition", link: "c04" },
    { id: 5, label: "MESSY DESK", icon: "people", link: "c05" },
    { id: 6, label: "MESSY HOME", icon: "work", link: "c06" },
    { id: 7, label: "MESSY BODY", icon: "mental", link: "c07" },
    { id: 8, label: "NEGATIVITIES", icon: "money", link: "c08" },
    { id: 9, label: "INSECURE", icon: "play", link: "c09" },
    { id: 10, label: "EGO", icon: "wisdom", link: "c10" },
    { id: 11, label: "BOREDOM", icon: "health", link: "c11" },
    { id: 12, label: "SCREEN TIME", icon: "spiritual", link: "c12" },
    { id: 13, label: "PEOPLE", icon: "emotion", link: "c01" },
    { id: 14, label: "ANGER", icon: "drug", link: "c02" },
    { id: 15, label: "LOVE", icon: "mindset2", link: "c03" },
    { id: 16, label: "COMMUNICATION", icon: "nutrition", link: "c04" },
    { id: 17, label: "COMPASSION", icon: "people", link: "c05" },
    { id: 18, label: "MINDSET", icon: "work", link: "c06" },
    { id: 19, label: "SITING", icon: "work", link: "c06" },
  ];

  const pad2 = (n) => String(n).padStart(2, "0");
</script>

<div class="cwrap">
  <div class="cheader">
    <div class="title rt">Challenges</div>
    <div class="nav rn">
      <a href="/"><Icon name="map" color="#e64555" /></a><a href="/"
        ><Icon name="goal" color="#e64555" /></a
      >
    </div>
  </div>
  <div class="cbody">
    <div class="list">
      {#each items as item (item.id)}
        <a href="/a/c/{item.link}" class="card">
          <div class="num">{pad2(item.id)}</div>
          <div class="icon"><Icon name={item.icon} color="#fff" /></div>
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
    background: #e64555;
    color: var(--bg);
    border-radius: 6px;
    overflow: hidden;
    box-shadow:
      rgba(0, 0, 0, 0.12) 0px 1px 3px,
      rgba(0, 0, 0, 0.24) 0px 1px 2px;
  }
  .num {
    background: #d92b42;
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
</style>
