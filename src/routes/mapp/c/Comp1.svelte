<script>
  import Btn1 from "./comp/btn/Btn1.svelte";
  import Cr1 from "./comp/cr/Cr1.svelte";
  import Hd1 from "./comp/header/Hd1.svelte";
  import Hd2 from "./comp/header/Hd2.svelte";
</script>

<div class="wrap">
  <Hd1></Hd1>
  <div class="body">
    <Hd2></Hd2>
    <Cr1></Cr1>
    <Cr1></Cr1>
    <Cr1></Cr1>
    <Hd2></Hd2>
    <Cr1></Cr1>
    <Cr1></Cr1>
    <Cr1></Cr1>
  </div>
</div>

<style>
  .wrap {
    position: fixed;
    inset: 0;
    background: var(--bg1);
  }
  .body {
    padding: 12px;
    padding-top: 0;
  }
</style>
