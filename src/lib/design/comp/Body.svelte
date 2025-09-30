<script>
  import Left from "./Left.svelte";
  import Middle from "./Middle.svelte";
  import Right from "./Right.svelte";
</script>

<div class="wrap">
  <div class="left"><Left></Left></div>
  <div class="middle"><Middle></Middle></div>
  <div class="right"><Right></Right></div>
</div>

<style>
  .wrap {
    height: calc(100% - 42px);
    display: flex;
  }
  .left,
  .middle,
  .right {
    height: 100%;
  }
  .left {
    width: 24%;
    border-right: solid 2px var(--dblue);
  }
  .middle {
    width: 52%;
    border-right: solid 2px var(--dblue);
  }
  .right {
    width: 24%;
  }
</style>
