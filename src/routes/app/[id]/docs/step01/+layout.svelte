<script>
  import Icon from "$lib/Icon.svelte";
  let { children } = $props();
</script>

{@render children()}
<div class="coder move">
  <header class="header">
    <input type="text" value="Title" />
    <button class="darkbtn"><Icon name="eye" size="14"></Icon></button>
    <button class="darkbtn"><Icon name="plus" size="16"></Icon></button>
  </header>
</div>

<style>
  input {
    background: none;
    outline: none;
    border: none;
  }
  .darkbtn {
    border-radius: 3px;
    width: 24px;
    height: 24px;
    background: #42414b;
    margin-right: 6px;
  }
  .coder {
    position: absolute;
    z-index: 999;
    width: 568px;
    height: calc(100% - 45px);
    right: 255px;
    top: 12px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    background: #272630;
    border-radius: 6px;
    border: solid 1px rgb(83, 83, 10);
  }
  .header {
    display: flex;
    align-items: center;
    height: 36px;
  }
  .header input {
    flex: 1;
    color: #858585;
    padding: 12px;
    padding-left: 15px;
  }
</style>
