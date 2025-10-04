<script>
  import Icon from "$lib/Icon.svelte";
  import Toggle1 from "../../Toggle1.svelte";
  import Wrapper2 from "../../Wrapper2.svelte";
  import { states } from "$lib/states.svelte.js";
  let { children } = $props();

  states.toggle1 = true;
</script>

{@render children()}
<Wrapper2 icon="color" title="12months Light theme colors">
  {#snippet body()}
    <Toggle1 t="4 màu chủ đạo">
      {#snippet content()}
        <div class="cards">
          <div class="card1" style="background: #19f081">
            <div class="num">#19f081</div>
            <div>Fresh Mint</div>
          </div>
          <div class="card1" style="background: #001503; color: #9c9c9c">
            <div class="dot"></div>
            <div class="num">#001503</div>
            <div>Active Black</div>
          </div>
          <div class="card1" style="background: #ececec;color:#001503">
            <div class="num">#ececec</div>
            <div>Paper White</div>
          </div>
          <div class="card1" style="background: #fb5555; color: #fff;">
            <div class="num">#fb5555</div>
            <div>Active Red</div>
          </div>
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
    width: 142px;
    height: 168px;
    border-radius: 12px;
    padding: 15px;
    padding-bottom: 10px;
    font-size: 16px;
    font-weight: 600;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: space-between;
    background: #fff;
    color: #001503;
    box-shadow: var(--shadow-lg);
  }
  .dot {
    width: 16px;
    height: 16px;
    background: var(--green1);
    z-index: 1;
    position: absolute;
    top: 15px;
    right: 15px;
    border-radius: 100px;
  }
  .num {
    font-size: 18px;
    text-transform: uppercase;
  }
</style>
