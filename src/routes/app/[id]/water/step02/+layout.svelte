<script>
  // Step 2 → Render planned cups dynamically
  import { page } from "$app/state";
  import { dm } from "$lib/data/sync6.js";
  import { states } from "$lib/states.svelte.js";

  let { children } = $props();

  // 🔹 reactive docId (depends on user + route param)
  let docId = $derived(`${states.userId}-bwa0-${page.params.id.slice(-4)}`);

  function makeEmptyMonth() {
    const days = {};
    for (let d = 1; d <= 31; d++) {
      const key = `day${String(d).padStart(2, "0")}`;
      days[key] = { items: [] };
    }
    return { days };
  }

  // 🔹 state object for current doc
  let doc = $state({
    mainData: makeEmptyMonth(),
  });

  // 🔹 current day selection
  let dayId = $state("day01");
  let day = $derived(doc.mainData.days[dayId] ?? { items: [] });

  // 🔹 load data whenever docId changes
  $effect(() => {
    dm.loadData(docId, doc);
  });
</script>

{@render children()}

<div class="water move">
  {#if day.items.length === 0}
    <p>No planned cups</p>
  {:else}
    <div>
      {#each day.items as p, i}
        <div class="cup">
          {p.amount} ml ⏰ {p.plannedTime}
          {#if p.done}
            ✅ Drank at {p.drankTime}
          {:else}
            ❌ Not yet
          {/if}
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .water {
    width: 300px;
    min-height: 200px;
    position: absolute;
    z-index: 99;
    top: 100px;
    right: 300px;
    background: #fff;
    border-radius: 12px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    padding: 20px;
  }
</style>
