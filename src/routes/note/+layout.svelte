<script>
   import "./noteapp.css";
   import { noteCode } from "./noteCode.js";
   import NoteSideNav from "./NoteSideNav.svelte";
   let { children } = $props();
</script>

<div class="note-wrap">
   <div class="note-sidebar">
      <NoteSideNav></NoteSideNav>
   </div>
   <div class="note-content" use:noteCode={{ debounceMs: 500 }}>
      {@render children()}
   </div>
</div>

<style>
   .note-wrap {
      position: fixed;
      inset: 0;
      display: flex;
      background-image: radial-gradient(#2d430c 0.2px, #27272f 0.2px);
      background-size: 4px 4px;
   }
   .note-sidebar {
      width: 300px;
   }
   .note-content {
      flex: 1;
      overflow: hidden;
      padding: 20px;
      padding-left: 68px;
      padding-right: 68px;
      height: 100%;
   }
</style>
