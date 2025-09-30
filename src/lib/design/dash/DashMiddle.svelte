<script>
  import Icon from "$lib/Icon.svelte";
  import LeftCard from "$lib/design/comp/LeftCard.svelte";
  import RightCard from "$lib/design/comp/RightCard.svelte";
</script>

<div class="cwrap">
  <div class="cheader">
    <div class="title mt">Workspace</div>
    <div class="nav mn">
      <a href="/"><Icon name="map" color="#fff" /></a><a href="/"
        ><Icon name="goal" color="#fff" /></a
      >
    </div>
  </div>
  <div class="cbody">
    <div class="list">
      <div class="left">
        <div class="col-title">Focus Today</div>
        <div class="col-body">
          <RightCard></RightCard>
          <RightCard></RightCard>
          <RightCard></RightCard>
          <RightCard></RightCard>
          <RightCard></RightCard>
        </div>
      </div>
      <div class="right">
        <div class="col-title">sadas</div>
        <div class="right-body"></div>
      </div>
    </div>
  </div>
</div>

<style>
  .cwrap {
    width: 52%;
    position: relative;
    z-index: 9;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .list {
    height: 100%;
    display: flex;
    border-radius: 8px;
    gap: 2px;
    background: radial-gradient(
      circle at center,
      #a0c2d8 0%,
      /* light bluish center */ #7ea5bb 40%,
      /* slightly darker blue */ #58788f 80% /* dark bluish edges */
    );
    box-shadow:
      rgba(0, 0, 0, 0.12) 0px 1px 3px,
      rgba(0, 0, 0, 0.24) 0px 1px 2px;
  }
  .left {
    height: 100%;
    width: 58%;
    padding: 8px;
    border-radius: 3px;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }
  .right {
    padding: 8px;
    width: 42%;
    display: flex;
    flex-direction: column;
    border-radius: 3px;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
  .col-title {
    font-weight: 500;
    margin-bottom: 8px;
    font-size: 12px;
    color: #fff;
  }
</style>
