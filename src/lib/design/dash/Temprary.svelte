<script>
  import { states } from "$lib/states.svelte.js";
</script>

<div class="tem">
  <div class="tem-text"><span>userId</span> {states.userId}</div>
  <div class="tem-text"><span>pageId</span> {states.pageId}</div>
  <div class="tem-text"><span>isPro</span> {states.isPro}</div>
  <div class="tem-text"><span>fullscreen</span> {states.isFullscreen}</div>
  <div class="tem-text"><span>docId</span></div>
  <div class="tem-text"><span>Mo?</span>{states.startOnMonday}</div>
  <div class="tem-text"><span>Sound</span>{states.isSoundOn}</div>
</div>

<style>
  .tem {
    position: absolute;
    z-index: 2;
    top: 80px;
    left: 15px;
    background: rgb(53, 55, 60);
    width: 136px;
    height: 300px;
    border-radius: 8px;
    color: #ffffff99;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.35);
    font-size: 11px;
    padding: 10px;
    overflow: hidden;
  }
  .tem span {
    color: var(--dashlime);
    font-weight: 600;
    margin-right: 5px;
  }
  .tem-text {
    margin-bottom: 6px;
  }
</style>
