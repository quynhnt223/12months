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
          <div class="card1" style="background: #19f081">Fresh Mint</div>
          <div class="card1" style="background: #001503; color: #9c9c9c">
            <div class="dot"></div>
            Active Black
          </div>
          <div class="card1" style="background: #ececec">Sidebar bg</div>
          <div class="card1" style="background: var(--thumb-bg)">Home Btn</div>
        </div>
      {/snippet}
    </Toggle1>
    <Toggle1 t="Add-ons">
      {#snippet content()}
        <div class="cards">
          <div class="card1" style="background: #fb5555; color: #fff;">
            Active Red
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
    position: relative;
    width: 168px;
    height: 168px;
    border-radius: 12px;
    padding: 6px;
    padding-bottom: 10px;
    font-size: 12px;
    font-weight: 600;
    display: flex;
    align-items: end;
    justify-content: center;
    background: #fff;
    color: #203e1d;
    box-shadow: var(--shadow-lg);
  }
  .dot {
    width: 16px;
    height: 16px;
    background: var(--green1);
    z-index: 1;
    position: absolute;
    top: 10px;
    right: 45%;
    border-radius: 100px;
  }
</style>
