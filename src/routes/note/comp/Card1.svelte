<script>
  import { states } from "../states.svelte.js";
  import { act } from "../cardViewAction.svelte.js";
</script>

<div class="wrap">
  <div class="header">
    <h5><span>💡</span> What: Giải quyết vấn đề gì?</h5>
  </div>
  <div class="body">
    when user try to go to <span class="hl r">the route that not exist</span>.
    they will face a problem:
    <span class="hl y">server will return 404 error</span>
  </div>
</div>

<style>
  .wrap {
    display: flex;
    flex-direction: column;
    display: inline-block;
    box-shadow:
      rgba(0, 0, 0, 0.4) 0px 1px 1px,
      rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
    border-radius: 6px;
    overflow: hidden;
    margin-bottom: 20px;
  }
  .header {
    background: rgb(233, 234, 240);
  }
  .header h5 {
    padding: 5px;
    padding-left: 8px;
    font-weight: 500;
  }
  h5 span {
    font-size: 18px;
  }
  .body {
    padding: 10px;
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .hl {
    padding: 3px;
    border-radius: 3px;
    padding-left: 8px;
    padding-right: 8px;
    padding-bottom: 4px;
    margin-left: 3px;
    margin-right: 3px;
    box-shadow:
      rgba(0, 0, 0, 0.4) 0px 1px 1px,
      rgba(0, 0, 0, 0.2) 0px -1px 0px inset;
  }
  .y {
    background: rgb(158, 245, 27);
  }
  .r {
    background: #d79898;
  }
</style>
