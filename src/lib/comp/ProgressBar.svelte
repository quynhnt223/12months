<script>
  // Props
  let { total = 6, active = 1, color = "#118C3E" } = $props();
</script>

<div class="bar">
  {#each Array(total) as _, i}
    <div
      class="segment"
      style:background={i < active ? color : "#fff"}
      class:active={i < active}
    ></div>
  {/each}
</div>

<style>
  .bar {
    display: flex;
    gap: 3px;
    width: fit-content;
    padding-left: 12px;
    padding-top: 6px;
  }

  .segment {
    width: 21px;
    height: 8px;
    border-radius: 4px;
    background: #fff;
  }

  .segment.active {
    opacity: 1;
  }
</style>
