<script>
  import Icon from "$lib/Icon.svelte";

  let {
    children1,
    children2,
    children3,
    title = "water",
    icon = "water",
  } = $props();
</script>

<div class="wrap">
  <h1><Icon name={icon}></Icon>{title}</h1>
  <div class="wrap1">{@render children1()}</div>
  <div class="wrap2">{@render children2()}</div>
  <div class="wrap3">{@render children3()}</div>
</div>

<style>
  .wrap {
    position: absolute;
    left: calc(24% + 10px);
    top: 100px;
    width: 506px;
    height: 338px;
    z-index: 9;
    border-radius: 12px;
    box-shadow: -16px 25px 36px rgba(0, 0, 0, 0.5);
    background: rgb(129, 209, 160);
  }
  .wrap1 {
    background: green;
  }
  .wrap2 {
    background: red;
  }
  .wrap3 {
    background: blue;
  }
</style>
