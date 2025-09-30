<script>
  import Time from "./Time.svelte";
</script>

<div class="wrap"><Time></Time></div>

<style>
  .wrap {
    position: relative;
    height: 42px;
    width: 100%;
    border-bottom: solid 2px var(--dblue);
    padding-left: 20px;
    padding-right: 20px;
    z-index: 2;
  }
</style>
