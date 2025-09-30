<script>
  import Icon from "$lib/Icon.svelte";
  import LeftCard from "./LeftCard.svelte";
  import RightCard from "./RightCard.svelte";
</script>

<div class="cwrap">
  <div class="cheader">
    <div class="title mt">Workspace</div>
    <div class="nav mn">
      <a href="/"><Icon name="map" color="#1d496c" /></a><a href="/"
        ><Icon name="goal" color="#1d496c" /></a
      >
    </div>
  </div>
  <div class="cbody">
    <div class="list">
      <div class="left">
        <div class="col-title">TO DO</div>
        <div class="col-body">
          <LeftCard></LeftCard>
        </div>
      </div>
      <div class="right">
        <div class="col-title">FOCUS TODAY</div>
        <div class="right-body">
          <RightCard></RightCard>
          <RightCard></RightCard>
          <RightCard></RightCard>
          <RightCard></RightCard>
          <RightCard></RightCard>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .cwrap {
    position: relative;
    z-index: 9;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .list {
    height: 100%;
    display: flex;
    gap: 12px;
  }
  .left {
    background: #7795c9ff;
    height: 100%;
    width: 42%;
    padding: 8px;
    border-radius: 3px;
  }
  .right {
    background: #7795c9a6;
    padding: 8px;
    width: 58%;
    display: flex;
    flex-direction: column;
    border-radius: 3px;
  }
  .col-title {
    font-weight: 800;
    margin-bottom: 8px;
    color: var(--bg);
  }
</style>
