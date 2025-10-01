<script>
  import Icon from "$lib/Icon.svelte";
  let { icon = "edit", title = "title...", body } = $props();
</script>

<div class="wr1 move">
  <header class="hd1">
    <Icon name={icon} color="#2854C5" size="28"></Icon>
    <div class="t1">
      {title}
    </div>
    <div class="btns2">
      <button class="bt3 sound1"><Icon name="plan" size="21"></Icon></button>
      <button class="bt3 sound1"><Icon name="chart" size="21"></Icon></button>
    </div>
  </header>
  <div class="body">
    {@render body()}
  </div>
</div>

<style>
  .body {
  }
</style>
