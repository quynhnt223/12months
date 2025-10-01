<div class="dwrap">
  <div class="card1 move">
    <header>
      <h3>💧 Drinking Water</h3>
    </header>
    <div class="body">
      <button class="water active">🥛</button>
      <button class="water active">🥛</button>
      <button class="water active">🥛</button>
      <button class="water active">🥛</button>
      <button class="water active">🥛</button>
      <button class="water active">🥛</button>
      <button class="water active">🥛</button>
      <button class="water active">🥛</button>
      <button class="water active">🥛</button>
      <button class="water active">🥛</button>
      <button class="water active">🥛</button>
      <button class="water active">🥛</button>
    </div>
  </div>
  <div class="code"></div>
  <div class="sidebar">
    <div class="left">
      <a href="#" class="btn1 sound1">Step 01</a>
      <a href="#" class="btn1 sound1">Step 02</a>
      <a href="#" class="btn1 sound1">Step 03</a>
      <a href="#" class="btn1 sound1">Step 04</a>
      <a href="#" class="btn1 sound1">Step 05</a>
      <a href="#" class="btn1 sound1 l-active"
        >Step 06
        <div class="dot"></div></a
      >
      <a href="#" class="btn1 sound1">Step 07</a>
      <a href="#" class="btn1 sound1">Step 08</a>
      <a href="#" class="btn1 sound1">Step 09</a>
      <a href="#" class="btn1 sound1">Step 10</a>
      <a href="#" class="btn1 sound1">Step 11</a>
    </div>
    <div class="right">
      <a href="#" class="btn1 sound1">Bug 01</a>
      <a href="#" class="btn1 sound1">Bug 02</a>
      <a href="#" class="btn1 sound1">Bug 03</a>
      <a href="#" class="btn1 sound1">Bug 04</a>
      <a href="#" class="btn1 sound1">Bug 05</a>
      <a href="#" class="btn1 sound1">Bug 06</a>
    </div>
  </div>
</div>

<style>
  .card1 {
    position: absolute;
    border-radius: 32px;
    z-index: 9;
    width: 368px;
    height: 268px;
    left: 736px;
    top: 86px;
    background: #f3f7ff;
    box-shadow: var(--chakra-shadows-2xl);
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  header {
    height: 45px;
    padding: 15px;
  }
  header h3 {
    color: #161718;
    font-weight: 600;
    font-size: 18px;
  }
  .body {
    padding: 20px;
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    gap: 6px;
  }
  .water {
    width: 36px;
    height: 45px;
    background: #dae7ff;
    box-shadow: var(--shadow-lg);
    border-radius: 8px;
  }
  .water:active {
    box-shadow: var(--shadow-sm);
  }
  .active {
    background: #3f9aff;
  }
  .code {
    position: fixed;
    inset: 0;
    width: 668px;
    background: #272630;
    border-right: solid 1px #9f9f9f;
    box-shadow: rgb(0 0 0 / 69%) 1px 1px 2px;
  }
  .sidebar {
    position: fixed;
    display: flex;
    padding: 15px;
    top: 0;
    bottom: 0;
    right: 0;
    width: 186px;
    background: #c2ffd3;
    box-shadow:
      rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
      rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  }
  .btn1 {
    position: relative;
    width: 72px;
    height: 48px;
    display: grid;
    place-content: center;
    position: relative;
    display: inline-block;
    margin-bottom: 10px;
    font: inherit;
    background-color: #19f081;
    border: 0;
    color: #203e1d;
    border-radius: 10px;
    font-size: 15px;
    padding: 10px;
    font-weight: 600;

    box-shadow: var(--shadow-lg);

    cursor: pointer;
  }
  .right .btn1 {
    background: #fb5555;
    color: #fff;
  }
  .btn1:active {
    translate: 0 0.1125em; /* half of 0.225em */
    box-shadow:
      inset 0 0.015em 0 0 #f4f4f4,
      0 0.015em 0 0 #efefef,
      0 0.03em 0 0 #ececec,
      0 0.0625em 0 0 #e0e0e0,
      0 0.0625em 0 0 #dedede,
      0 0.1em 0 0 #dcdcdc,
      0 0.1125em 0 0 #cacaca,
      0 0.1125em 0.1875em 0 #cecece;
  }
  .l-active {
    background: #001503 !important;
    color: #9c9c9c;
    padding-top: 20px;
  }
  .dot {
    width: 8px;
    height: 8px;
    background: rgb(23, 241, 99);
    z-index: 1;
    position: absolute;
    top: 10px;
    right: 45%;
    border-radius: 100px;
    filter: blur(2px);
  }
</style>
