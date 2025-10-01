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

<style>
  .card1 {
    position: absolute;
    border-radius: 16px;
    z-index: 9;
    width: 368px;
    height: 268px;
    left: 736px;
    top: 86px;
    background: #f3f7ff;
    box-shadow: var(--sd4);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border: solid 1px #c2c2c2;
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
</style>
