<script>
  let { cl, i = "timer", s = "24", ac } = $props();
</script>

<button onclick={cl} aria-label="btn" class:active={ac}>
  <span class="material-symbols-rounded" style="font-size:{s}px">{i}</span>
</button>

<style>
  button {
    background: #3b82f6;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: 0.2s;
  }
  button:hover {
    background: #2563eb;
  }
  .active {
    background: green;
  }
</style>
