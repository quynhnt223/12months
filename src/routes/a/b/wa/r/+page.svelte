<script>
  import Icon from "$lib/Icon.svelte";
  import Body from "./Body.svelte";
  import Body2 from "./Body2.svelte";
  import Header from "./Header.svelte";
  import Top from "./Top.svelte";
</script>

<div class="wrap">
  <Header></Header>
  <Top></Top>
  <div class="body">
    <Body></Body>
  </div>
</div>

<style>
  .wrap {
    position: absolute;
    inset: 0;
    width: calc(100% + 50px);
    background: radial-gradient(
      67.57% 67.57% at 50% 50%,
      #79889d 0%,
      #445369 100%
    );
    z-index: 11;
    border-radius: 12px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }

  .body {
    height: calc(100% - 45px - 68px);
  }
</style>
