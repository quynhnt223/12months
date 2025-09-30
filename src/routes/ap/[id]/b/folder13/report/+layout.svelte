<script>
  let { children } = $props();
</script>

<section class="report-layout">
  <h3>{data.heading}</h3>
  {@render children()}
</section>
