<script>
  import Icon from "$lib/Icon.svelte";
  import { states } from "$lib/states.svelte.js";
  let { icon = "edit", color = "#19f081", title = "title...", body } = $props();
</script>

<div class="wr1 wr2">
  <header class="hd1">
    <Icon name={icon} {color} size="28"></Icon>
    <div class="t1">
      {title}
    </div>
    <div class="btns2">
      <button
        class="bt3 sound1"
        onclick={() => (states.toggle1 = !states.toggle1)}
        ><Icon name="toggle" size="21"></Icon></button
      >
    </div>
  </header>
  <div class="body">
    {@render body?.()}
  </div>
</div>

<style>
  .body {
    height: calc(100% - 48px);
    overflow: auto;
    padding: 24px;
    padding-top: 6px;
  }
</style>
