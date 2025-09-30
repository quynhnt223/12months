<script>
  import { states } from "$lib/states.svelte.js";
  import { setting } from "./settingAction.svelte.js";

  // Custom action for click outside
  function clickOutside(node) {
    const handleClick = (event) => {
      if (!node.contains(event.target) && !event.target.closest(".menu-btn")) {
        states.isMenuOpen = false;
      }
    };

    document.addEventListener("click", handleClick, true);

    return {
      destroy() {
        document.removeEventListener("click", handleClick, true);
      },
    };
  }
</script>

<div class="dash-menu" use:clickOutside>
  <div class="dash-menu-item">
    <span class="dash-menu-item-text">Start Day of Week</span>
    <button
      class="sun-mon-toggle {states.startOnMonday ? 'mon' : 'sun'}"
      onclick={() => (states.startOnMonday = !states.startOnMonday)}
      >{states.startOnMonday ? "Monday" : "Sunday"}</button
    >
  </div>
  <div class="dash-menu-item">
    <span class="dash-menu-item-text">Sound</span>
    <button
      class="sound-toggle {states.isSoundOn ? 'sound-on' : 'sound-off'}"
      onclick={() => (states.isSoundOn = !states.isSoundOn)}
      >{states.isSoundOn ? "On" : "Off"}</button
    >
  </div>
  <div class="dash-menu-item">
    <span class="dash-menu-item-text">Start Day of Week</span>
  </div>
  <div class="dash-menu-item">
    <span class="dash-menu-item-text">Start Day of Week</span>
  </div>
  <div class="dash-menu-item">
    <span class="dash-menu-item-text">Start Day of Week</span>
  </div>
  <h1>{states.docId}</h1>
</div>

<style>
  .dash-menu {
    position: absolute;
    padding: 15px;
    z-index: 8;
    width: 186px;
    height: 268px;
    background: #27272f;
    border-radius: 12px;
    border-top-right-radius: 6px;
    top: 86px;
    right: 45px;
    box-shadow: 6px 5px 12px 2px #0000001f;
  }
  .dash-menu-item {
    display: flex;
    align-items: center;

    color: rgb(128, 128, 122);
    font-size: 11px;
    font-weight: 600;
  }
  .dash-menu-item-text {
    padding-top: 9px;
    padding-bottom: 9px;
  }
  .sun-mon-toggle,
  .sound-toggle {
    padding: 6px;
    font-size: 12px;
    border-radius: 3px;
    margin-left: 12px;
    font-weight: 600;
    background: #383740;
  }
  .sun {
    color: #4e99f4;
  }
  .mon {
    color: #c3f52c;
  }
  .sound-on {
    background: rgb(26, 233, 26);
  }
  .sound-off {
    background: #413f4f;
    color: #817a8a;
  }
</style>
