<script>
  let { i = "1", c = "#4e3534" } = $props();
</script>

<div class="error bg{c}"><img src="/img/{i}.png" alt="img" /></div>

<style>
  .error {
    padding: 20px;
    background: #4e3534;
    border-radius: 12px;
    box-shadow: var(--shadow-lg);
  }
  img {
    max-width: 100%;
  }
  :global(.bg2) {
    background: #282828 !important;
  }
  :global(.bg3) {
    background: #212121 !important;
  }
</style>
