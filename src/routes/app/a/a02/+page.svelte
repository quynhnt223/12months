<script>
  import C1 from "$lib/comp/card/C1.svelte";
  import C2 from "$lib/comp/card/C2.svelte";
  import C3 from "$lib/comp/card/C3.svelte";
  import Card1 from "$lib/comp/layout/Card1.svelte";
  import Layout1 from "$lib/comp/layout/Layout1.svelte";
</script>

<Layout1 title="Sleep" icon="alarm_smart_wake" grid={[8, 20]}>
  <Card1 grid={[1, 4, 1, 3]}>d</Card1>
  <Card1 grid={[1, 4, 4, 3]}>d</Card1>
  <Card1 grid={[5, 4, 1, 6]}>d</Card1>
  <Card1 grid={[1, 8, 7, 5]}>d</Card1>
  <Card1 grid={[1, 8, 12, 9]}>d</Card1></Layout1
>
