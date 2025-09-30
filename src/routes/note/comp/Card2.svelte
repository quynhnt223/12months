<div class="wrap">
  <div class="header">
    <h5><span>⚙️</span> How: Giải quyết như thế nào</h5>
  </div>
  <div class="body">
    <p>
      Sẽ có nhiều giải pháp. nhưng giải pháp đơn giản nhất là gì <span
        class="hl n"
        >put <code>error handle logic</code> in 📁 +error.svelte.</span
      >
    </p>
    <button>🖼️</button>
  </div>
</div>

<style>
  .wrap {
    display: flex;
    flex-direction: column;
    display: inline-block;
    box-shadow:
      rgba(0, 0, 0, 0.4) 0px 1px 1px,
      rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
    border-radius: 6px;
    overflow: hidden;
    margin-bottom: 20px;
  }
  .header {
    background: rgb(233, 234, 240);
  }
  .header h5 {
    padding: 5px;
    padding-left: 8px;
    font-weight: 500;
  }
  h5 span {
    font-size: 18px;
  }
  .body {
    padding: 10px;
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .hl {
    padding: 3px;
    border-radius: 3px;
    padding-left: 8px;
    padding-right: 8px;
    padding-bottom: 4px;
    margin-left: 3px;
    margin-right: 3px;
    box-shadow:
      rgba(0, 0, 0, 0.4) 0px 1px 1px,
      rgba(0, 0, 0, 0.2) 0px -1px 0px inset;
  }
  .n {
    background: rgb(104, 109, 119);
    color: #fff;
  }
  .r {
    background: #d79898;
  }
  code {
    font-family: "Courier New", Courier, monospace;
    color: rgb(221, 234, 39);
    font-size: 14px;
    font-weight: 600;
    padding-left: 8px;
    padding-right: 8px;
  }
  .img1 {
    position: absolute;
    border-radius: 12px;
    right: 186px;
    top: 68px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border: solid 2px #20ff25;
  }
  p {
    padding-bottom: 12px;
  }
</style>
