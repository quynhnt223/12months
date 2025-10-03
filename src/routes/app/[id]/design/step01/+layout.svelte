<script>
  import Icon from "$lib/Icon.svelte";
  import Toggle1 from "../../Toggle1.svelte";
  import Wrapper2 from "../../Wrapper2.svelte";
  import { states } from "$lib/states.svelte.js";
  let { children } = $props();

  states.toggle1 = true;
</script>

{@render children()}
<Wrapper2 icon="color" title="Color System">
  {#snippet body()}
    <Toggle1 t="Light Theme">
      {#snippet content()}
        <div class="cards">
          <div class="card1" style="background: #19f081">Main Green</div>
          <div class="card1" style="background: #001503; color: #9c9c9c">
            Black 01
          </div>
          <div class="card1" style="background: #ececec">Sidebar bg</div>
          <div class="card1" style="background: var(--thumb-bg)">Home Btn</div>
        </div>
      {/snippet}
    </Toggle1>
    <Toggle1 t="Dark Theme">
      {#snippet content()}
        <div class="cards">
          <div
            class="card1"
            style="background: #272630; color: var(--dark-icon);"
          >
            Coder Bg
          </div>
          <div class="card1" style="background: #413f4b; color:#c4bebe">
            Comment Box
          </div>
          <div class="card1" style="background: var(--code-active);">
            Neon Green
          </div>
          <div class="card1" style="background: #bae628"></div>
        </div>
      {/snippet}
    </Toggle1>
    <Toggle1 t="Text">
      {#snippet content()}
        <div class="cards">
          <div
            class="card1"
            style="background: #272630; color: var(--dark-icon);"
          >
            Coder Bg
          </div>
          <div class="card1" style="background: #413f4b; color:#c4bebe">
            Comment Box
          </div>
          <div class="card1" style="background: var(--code-active);">
            Neon Green
          </div>
          <div class="card1" style="background: #bae628"></div>
        </div>
      {/snippet}
    </Toggle1>
  {/snippet}
</Wrapper2>

<style>
  .cards {
    display: flex;
    gap: 8px;
  }
  .card1 {
    width: 145px;
    height: 124px;
    border-radius: 12px;
    padding: 6px;
    padding-bottom: 10px;
    font-size: 16px;
    font-weight: 600;
    display: flex;
    align-items: end;
    justify-content: center;
    background: #fff;
    color: #203e1d;
    box-shadow: var(--shadow-lg);
  }
</style>
