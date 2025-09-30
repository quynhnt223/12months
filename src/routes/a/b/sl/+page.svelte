<script>
  import Quality from "$lib/design/comp/Quality.svelte";
  import SleepBody from "$lib/design/comp/SleepBody.svelte";
  import Speed from "$lib/design/comp/Speed.svelte";
  import Icon from "$lib/Icon.svelte";
</script>

<div class="bwrap move">
  <div class="bmain">
    <div class="bimg">
      <img src="/b/a1" />
      <div class="overlay"></div>
      <button class="bbtn"
        ><Icon name="idea" color="#B8E61E" size="18" /></button
      >
      <div class="bpcard1">
        <Speed></Speed>
        <Quality></Quality>
      </div>
    </div>
    <div class="bheader">
      <div class="btitle">
        <Icon name="sleep" color="#3BFD89" /><span>Sleep</span>
      </div>
      <div class="bnav">
        <button class="bbtn1 sound1"
          ><Icon name="guide" color="#3BFD89"></Icon></button
        >
        <button class="bbtn2 sound1" data-label="option">
          <Icon name="option" color="#3BFD89"></Icon></button
        >
      </div>
    </div>
    <div class="bbody"><SleepBody></SleepBody></div>
  </div>
  <div class="bmenu"></div>
  <a href="/a" class="close sound2" data-label="sdas">x</a>
</div>

<style>
  .bwrap {
    position: absolute;
    left: calc(24% + 10px);
    top: 52px;
    width: 506px;
    height: 338px;
    z-index: 9;
    border-radius: 6px;
  }
  .close {
    position: absolute;
    display: grid;
    place-content: center;
    width: 36px;
    height: 36px;
    background: green;
    color: #3bfd89;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    top: 20px;
    right: -36px;
    box-shadow:
      rgba(0, 0, 0, 0.16) 0px 3px 6px,
      rgba(0, 0, 0, 0.23) 0px 3px 6px;
  }
  .bmain {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    background: #132538;
    display: grid;
    grid-template-columns: 225px 1fr;
    grid-template-rows: 36px 1fr; /* first row fixed, second row takes rest */
    gap: 3px; /* optional */
    border-radius: 8px;
  }
  .bheader {
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 3px;
    border-top-right-radius: 6px;
    grid-row: 1; /* first row */
    grid-column: 2; /* right column */
    background: #23334d;
  }
  .bnav {
    display: flex;
    align-items: center;
    padding-right: 12px;
  }
  .btitle {
    padding-left: 12px;
    font-weight: 700;
    font-size: 18px;
    display: flex;
    align-items: center;
    color: #3bfd89;
  }
  .btitle span {
    padding-left: 8px;
  }
  .bbtn1,
  .bbtn2 {
    width: 32px;
    height: 32px;
    margin-left: 6px;
    border-radius: 6px;
    background: none;
  }
  .bbtn1:hover,
  .bbtn2:hover {
    background: rgb(151, 178, 151);
  }
  .bbody {
    background: #23334d;
    border-radius: 3px;
    display: grid;
    grid-row: 2; /* second row */
    grid-column: 2; /* right column */
    border: solid 1px #474f6d;
  }

  .bimg {
    grid-row: 1 / span 2; /* span both rows */
    grid-column: 1; /* left column */
    background: lightblue;
    overflow: hidden;
    border-radius: 6px;
    box-shadow:
      rgb(4 3 3 / 76%) -7px -3px 28px 4px,
      rgba(0, 0, 0, 0.1) 0px 2px 4px 0px;
    box-shadow: inset -2px -2px 1px rgba(92, 101, 154, 0.32);
    filter: drop-shadow(-6px -2px 8px rgba(0, 0, 0, 0.24))
      drop-shadow(-2px 2px 1px rgba(29, 19, 63, 0.84));
  }
  .bimg img {
    width: 100%;
  }
  .overlay {
    position: absolute;
    inset: 0;
    z-index: 1;
  }
  .bpcard1 {
    position: absolute;
    bottom: 10px;
    right: 10px;
    /* Rectangle 14 */

    width: 168px;
    height: 186px;
    z-index: 2;
    background: rgba(52, 62, 80, 0.94);
    box-shadow:
      0px 6px 8px rgba(0, 0, 0, 0.72),
      inset 1px 2px 1px #68699a;
    backdrop-filter: blur(9px);
    /* Note: backdrop-filter has minimal browser support */
    border-radius: 18px;
  }
  .bbtn {
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
  .bbtn:hover {
    background: #222b39;
  }
</style>
