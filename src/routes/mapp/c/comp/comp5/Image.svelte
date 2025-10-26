<script>
  import { states } from "../../utils/states.svelte.js";
</script>

<div class="wrap">
  <div class="header">
    <div class="img-title">{states.currentImgTitle}</div>
    <button class="close" onclick={() => (states.isImageOpen = false)}
      ><span class="material-symbols-rounded">close</span></button
    >
  </div>
  <img src="/images/{states.img}.jpg" alt="img" />
</div>

<style>
  .wrap {
    position: fixed;
    z-index: 9999;
    background: rgb(64, 65, 64);
    top: 20px;
    left: 15px;
    right: 20px;
    overflow: hidden;
    border-radius: 12px;
    background: #2a2a2a;
    border: 1px solid #3a3232;
    box-shadow:
      0px 6px 8px 3px rgba(0, 0, 0, 0.25),
      inset 0px 2px 1px #424650;
    padding: 8px;
    padding-top: 55px;
    padding-bottom: 20px;
  }
  .img-title {
    position: absolute;
    top: 12px;
    left: 12px;
    text-transform: uppercase;
    color: #ffffff4f;
  }
  .close {
    width: 45px;
    height: 45px;
    position: absolute;
    top: 6px;
    right: 6px;
    border-radius: 6px;
    background: #00000078;
    color: #00ce3e;
  }
  img {
    width: 100%;
    border-radius: 8px;
  }
</style>
