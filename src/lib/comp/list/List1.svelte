<script>
  let { data = [{ id: 1, name: "hidadas" }] } = $props();
</script>

<div class="wrap">
  {#each data as item}
    <div class="item">{item.name}</div>
  {/each}
</div>
