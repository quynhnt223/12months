<script>
  import Icon from "$lib/Icon.svelte";
</script>

<div class="wrap">
  <div class="card">
    <div class="icon">
      <Icon name="clock" size="18" color="#ceee18"></Icon>
    </div>
    <div class="title">Duration</div>
    <div class="score">88<span> %</span></div>
  </div>
  <div class="card">
    <div class="icon">
      <Icon name="chart" size="18" color="#ceee18"></Icon>
    </div>
    <div class="title">Regularity</div>
    <div class="score">88<span> %</span></div>
  </div>
  <div class="card">
    <div class="icon">
      <Icon name="quality" size="18" color="#ceee18"></Icon>
    </div>
    <div class="title">Quality</div>
    <div class="score">78<span> %</span></div>
  </div>
  <div class="card">
    <div class="icon">
      <Icon name="condition" size="18" color="#ceee18"></Icon>
    </div>
    <div class="title">Condition</div>
    <div class="score">68<span> %</span></div>
  </div>
  <div class="card">
    <div class="icon">
      <Icon name="ai" size="18" color="#ceee18"></Icon>
    </div>
    <div class="title">Ask AI</div>
    <div class="score">Hi<span> ...</span></div>
  </div>
</div>

<style>
  .wrap {
    display: flex;
    gap: 10px;
    padding-left: 68px;
    padding-right: 24px;
  }
  .card {
    position: relative;
    background: #384252;
    box-shadow:
      1px 2px 1px rgba(21, 23, 42, 0.79),
      inset 1px 2px 1px rgba(128, 130, 162, 0.81);
    border-radius: 12px;
    width: 15%;
    height: 68px;
    color: #fff;
    padding: 10px;
    padding-top: 6px;
    font-size: 11px;
  }
  .title {
    letter-spacing: 1px;
  }
  .score {
    margin-top: 8px;
    font-size: 28px;
    font-weight: 500;
    color: rgb(206, 238, 24);
  }
  .score span {
    font-size: 12px;
    color: rgb(147, 151, 147);
    padding-left: 6px;
  }
  .icon {
    position: absolute;
    top: 0;
    right: 0;
    width: 36px;
    height: 36px;
    display: grid;
    place-content: center;
  }
</style>
