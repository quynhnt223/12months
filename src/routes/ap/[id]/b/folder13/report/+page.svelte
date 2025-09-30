<script>
</script>

<svelte:head>
  <title>{data.title}</title>
</svelte:head>

<section class="report-page">
  <h2>{data.title}</h2>
  <p>{data.summary}</p>
  <dl>
    <dt>Items Reviewed</dt>
    <dd>{data.metrics.itemsReviewed}</dd>
    <dt>Status</dt>
    <dd>{data.metrics.status}</dd>
  </dl>
</section>
