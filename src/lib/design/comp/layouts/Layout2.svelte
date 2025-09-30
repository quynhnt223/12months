<script>
  import Icon from "$lib/Icon.svelte";

  let { children1, icon, title, img, top = "100" } = $props();
</script>

<div class="l1wrap move" style="top:{top}px">
  <div class="l1img">
    <img src="/c/{img}.png" alt="img" />
    <div class="overlay"></div>

    <button class="l1btn1"
      ><Icon name="idea" color="#e64555" size="18" /></button
    >
    <div class="l1pcard1"></div>
  </div>
  <div class="l1header">
    <div class="l1title">
      <Icon name={icon} color="#e64555" /><span>{title}</span>
    </div>
  </div>
  <div class="l1body">{@render children1()}</div>
</div>

<style>
  .l1wrap {
    position: absolute;
    right: calc(24% - 10px);

    width: 506px;
    height: 338px;
    z-index: 9;
    border-radius: 12px;
    box-shadow: -16px 25px 36px rgba(0, 0, 0, 0.5);
    background: #1b2637;
    display: grid;
    grid-template-columns: 1fr 225px;
    grid-template-rows: 36px 1fr;
    gap: 3px;
    transform: translatex(25px);
    animation: slideDown 0.2s ease forwards;
  }
  @keyframes slideDown {
    to {
      transform: translateX(0);
    }
  }
  .overlay {
    position: absolute;
    inset: 0;
    z-index: 2;
  }
  .l1img img {
    position: relative;
    width: 100%;
    z-index: 1;
  }
  .l1img {
    position: relative;
    grid-row: 1 / span 2;
    grid-column: 2;
    overflow: hidden;
    border-radius: 6px;
  }
  .l1btn1 {
    position: absolute;
    top: 8px;
    right: 8px;
    width: 36px;
    height: 36px;
    z-index: 9;
    background: #313e51;
    box-shadow:
      1px 2px 2px rgba(19, 36, 47, 0.86),
      inset 0px 1px 1px #5985a2;
    border-radius: 8px;
    display: grid;
    place-content: center;
  }
  .l1header {
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 3px;
    border-top-right-radius: 6px;
    grid-row: 1;
    grid-column: 1;
    background: #23334d;
  }
  .l1title {
    padding-left: 12px;
    font-weight: 700;
    font-size: 18px;
    display: flex;
    align-items: center;
    color: #e64555;
  }
  .l1title span {
    padding-left: 8px;
  }
  .l1body {
    background: #23334d;
    border-radius: 3px;
    display: grid;
    grid-row: 2;
    grid-column: 1;
    border: solid 1px #474f6d;
  }
  .l1pcard1 {
    position: absolute;
    bottom: 10px;
    right: 10px;
    /* Rectangle 14 */

    width: 168px;
    height: 136px;
    z-index: 2;
    background: rgb(52 62 80 / 52%);
    box-shadow:
      0px 6px 8px rgba(0, 0, 0, 0.72),
      inset 1px 2px 1px #68699a;
    backdrop-filter: blur(9px);
    /* Note: backdrop-filter has minimal browser support */
    border-radius: 18px;
  }
</style>
