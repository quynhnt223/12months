<script>
  import { page } from "$app/state";
  import { dashData } from "$lib/data/dashData.js";
  import { autoScale } from "$lib/utils/autoScale.svelte.js";
  import { setupSoundEffects } from "$lib/utils/sound.js";
  import { states } from "$lib/states.svelte.js";
  import ProgressBar from "$lib/comp/ProgressBar.svelte";
  import ToggleBar from "$lib/comp/ToggleBar.svelte";

  let { children } = $props();

  let data = $state(dashData);

  $effect(() => autoScale());

  $effect(() => setupSoundEffects());
</script>

<div class="dashboard">
  <div
    class="dash-body"
    style="
        --base-w: {states.scaleInfo.w}px;
        --base-h: {states.scaleInfo.h}px;
        transform: scale({states.scaleInfo.s});
        margin-left: {states.scaleInfo.x}px;
        margin-top: {states.scaleInfo.y}px;
      "
  >
    {@render children()}
    <div class="dash-left">
      <div class="dash-section-header">
        <h2>Power</h2>
        <ProgressBar total={7} active={1} color="#118C3E"></ProgressBar>
      </div>
      <div class="dash-card-grid">
        {#each data.a.items as it (it.id)}
          <a
            href="/app/a/{it.link}"
            class="dash-card sound1 pop1"
            class:active-card={it.link === page.route.id.slice(-3)}
            draggable="false"
          >
            <div class="card-top">
              <span class="material-symbols-rounded">{it.icon}</span>
              <div class="name">{it.name}</div>
            </div>
            <div class="dash-card-bottom">
              <span>On</span>
              <ToggleBar
                bind:checked={it.on}
                onChange={(v) => console.log("Toggle:", v)}
              />
            </div>
          </a>
        {/each}
      </div>
    </div>
    <div class="dash-middle">
      <div class="dash-section-header"></div>
      <img class="dash-image" src="/dash-bg.png" alt="img" />
    </div>
    <div class="dash-right">
      <div class="dash-section-header">
        <h2>Challenges</h2>
        <ProgressBar total={5} active={1} color="#A61420"></ProgressBar>
      </div>
      <div class="dash-card-grid">
        {#each data.b.items as it (it.id)}
          <div class="dash-card">
            <div class="card-top">
              <span
                class="material-symbols-rounded"
                style="color:#096906!important">{it.icon}</span
              >
              <div class="name">{it.name}</div>
            </div>
            <div class="dash-card-bottom">
              <span>On</span>
              <ToggleBar
                bind:checked={it.on}
                onChange={(v) => console.log("Toggle:", v)}
              />
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>

<style>
  .material-symbols-rounded {
    color: #096906 !important;
    font-size: 20px;
  }
  :root {
    --br-xl: 16px;
  }

  .dashboard {
    background: rgb(255, 255, 255);
    position: fixed;
    inset: 0px;
    user-select: none;
  }

  .dash-body {
    transform-origin: left top;
    width: var(--base-w);
    height: var(--base-h);
    display: flex;
    gap: 12px;
    padding-top: 20px;
  }

  .dash-left {
    width: 305px;
    height: 100%;
    background: linear-gradient(
      162.42deg,
      rgb(42, 255, 127) 3.16%,
      rgb(25, 153, 76) 81.52%
    );
    box-shadow:
      rgba(0, 0, 0, 0.16) 0px 3px 6px,
      rgba(0, 0, 0, 0.23) 0px 3px 6px;
    border-top-left-radius: var(--br-xl);
    border-top-right-radius: var(--br-xl);
  }

  .dash-middle {
    position: relative;
    flex: 1 1 0%;
    height: 100%;
    background: linear-gradient(
      139.18deg,
      rgb(84, 127, 255) 6.3%,
      rgb(25, 57, 153) 69.53%
    );
    box-shadow:
      rgba(0, 0, 0, 0.16) 0px 3px 6px,
      rgba(0, 0, 0, 0.23) 0px 3px 6px;
    border-top-left-radius: var(--br-xl);
    border-top-right-radius: var(--br-xl);
  }

  .dash-right {
    width: 305px;
    height: 100%;
    background: linear-gradient(rgb(255, 111, 123) 0%, rgb(153, 25, 36) 100%);
    box-shadow:
      rgba(0, 0, 0, 0.16) 0px 3px 6px,
      rgba(0, 0, 0, 0.23) 0px 3px 6px;
    border-top-left-radius: var(--br-xl);
    border-top-right-radius: var(--br-xl);
  }

  .dash-image {
    position: absolute;
    bottom: 0px;
    width: 100%;
  }

  .dash-section-header {
    height: 45px;
    display: flex;
    align-items: center;
    border-radius: var(--br-xl);
  }

  .dash-section-header h2 {
    font-weight: 900;
    color: rgb(37, 51, 41);
    padding-left: 16px;
  }

  .dash-card-grid {
    display: grid;
    gap: 4px;
    padding: 0px 16px 16px;
    grid-template-columns: repeat(3, 86px);
  }

  .dash-card {
    width: 86px;
    height: 86px;
    background: rgb(255, 255, 255);
    border-radius: 8px;
    box-shadow: rgba(0, 0, 0, 0.44) 0px 1px 0px;
    font-size: 11px;
    font-weight: 500;
    color: rgb(9, 105, 6);
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;
  }

  .dash-card-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .dash-card-bottom span {
    font-size: 10px;
    font-weight: 400;
  }
  .dash-card {
    width: 86px;
    height: 86px;
    background: rgb(255, 255, 255);
    border-radius: 8px;
    box-shadow: rgba(0, 0, 0, 0.44) 0px 1px 0px;
    font-size: 11px;
    font-weight: 500;
    color: rgb(9, 105, 6);
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;
    transition: transform 0.1s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .dash-card:hover {
    transform: translateY(-2px);
    box-shadow: rgba(0, 0, 0, 0.44) 0px 3px 0px;
  }

  .dash-card:active {
    transform: translateY(1px) scale(0.98);
    box-shadow: rgba(0, 0, 0, 0.44) 0px 0px 0px;
    transition: transform 0.05s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .active-card {
    background: linear-gradient(
      135deg,
      rgb(60, 70, 65) 0%,
      rgb(50, 60, 55) 100%
    );
    color: rgb(200, 255, 220);
  }

  .active-card .material-symbols-rounded {
    color: rgb(42, 255, 127) !important;
  }

  .active-card .dash-card-bottom span {
    color: rgb(200, 255, 220);
  }
</style>
