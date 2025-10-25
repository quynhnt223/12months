<script>
  import C1 from "$lib/comp/card/C1.svelte";
  import C2 from "$lib/comp/card/C2.svelte";
  import C3 from "$lib/comp/card/C3.svelte";
  import Card1 from "$lib/comp/layout/Card1.svelte";
  import Layout1 from "$lib/comp/layout/Layout1.svelte";
</script>

<Layout1 title="Sleep" icon="alarm_smart_wake" grid={[8, 20]}>
  <Card1 grid={[1, 4, 1, 3]}><C1></C1></Card1>
  <Card1 grid={[1, 4, 4, 3]}
    ><C1 icon="sunny" title="Wake Up" time="6:00" color="#a9a9a9" pt="6:30"
    ></C1></Card1
  >
  <Card1 grid={[5, 4, 1, 6]}
    ><C1
      icon="battery_4_bar"
      title="Total Sleep"
      time="6.5 hours"
      color="#48d253"
      pt="8 hours"
    ></C1></Card1
  >
  <Card1 grid={[1, 8, 7, 5]}><C2></C2></Card1>
  <Card1 grid={[1, 8, 12, 9]}><C3></C3></Card1></Layout1
>
