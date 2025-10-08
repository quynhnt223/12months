<script>
  // Step 1: define state
  let data = $state(null);

  function add() {
    data = [{ id: 1 }];
  }
</script>

<div class="wrap">
  {#if data && Array.isArray(data) && data.length > 0}
    {#each data as cup}
      <h3>hello</h3>
    {/each}
  {:else}
    <p>No data available</p>
  {/if}
  <button onclick={add}>add</button>
</div>

<style>
  .wrap {
    position: absolute;
    z-index: 9999999;
    background: rgb(214, 219, 214);
    top: 100px;
    left: 700px;
    padding: 20px;
    border-radius: 20px;
  }
  h2 {
    font-size: 1.6rem;
    margin-bottom: 8px;
  }
  .btns {
    display: flex;
    gap: 8px;
  }
  button {
    padding: 8px 14px;
    border-radius: 10px;
    border: none;
    background: #19f081; /* Fresh mint */
    color: #001503;
    font-weight: 600;
    cursor: pointer;
  }
  button:last-child {
    background: #fb5555; /* Active red */
    color: white;
  }
</style>
