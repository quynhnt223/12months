<script>
  import FullscreenBtn from "../../../note/FullscreenBtn.svelte";

  // You can make these props if you want to reuse the component
  let presentationUrl =
    "https://docs.google.com/presentation/d/e/2PACX-1vRy9OtmeB7FhKMNstZrMR8UhEzc7QRzjBxzg9jbn9LFfIiXwVYyn4FbLm9zPtJFecBjRFPfI1daJ35V/pubembed?start=false&loop=false&delayms=3000";

  // Optional: Add loading state
  let isLoading = true;

  function handleLoad() {
    isLoading = false;
  }
</script>

<div class="presentation-container">
  {#if isLoading}
    <div class="loading">Loading presentation...</div>
  {/if}
  <div class="full"><FullscreenBtn></FullscreenBtn></div>
  <iframe
    src={presentationUrl}
    frameborder="0"
    allowfullscreen="true"
    mozallowfullscreen="true"
    webkitallowfullscreen="true"
    on:load={handleLoad}
    title="Google Slides Presentation"
  ></iframe>
</div>
<a
  target="_blank"
  href="https://docs.google.com/document/d/1wlm7Ger6jUVELAgRpXkJ6n5O7AosSCSzOqZdTE7A63A/edit?tab=t.xizup5oy4vus"
  >Edit</a
>

<style>
  .presentation-container {
    position: absolute;
    top: 100px;
    left: 30px;
    width: 800px;
    height: 450px; /* Adjust as needed */

    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  iframe {
    width: 100%;
    height: calc(100% + 36px);
    border: none;
  }

  .loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #666;
    font-size: 16px;
  }
  .full {
    position: absolute;
    z-index: 9;
    top: 0;
    left: 0;
  }
</style>
