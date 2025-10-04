<script>
  import Coder from "../Coder.svelte";
  import Sidebar5 from "../Sidebar5.svelte";

  let { children } = $props();
</script>

{@render children()}
<Coder></Coder>
<Sidebar5
  items={[
    { id: "step01", name: "Set up", type: "green" },
    { id: "step02", name: "step02", type: "green" },
    { id: "step03", name: "step03", type: "green" },
    { id: "step04", name: "step04", type: "green" },
    { id: "step05", name: "step05", type: "green" },
    { id: "step06", name: "step06", type: "green" },
    { id: "step07", name: "step07", type: "green" },
    { id: "step08", name: "step08", type: "green" },
    { id: "step09", name: "step09", type: "green" },
    { id: "step10", name: "step10", type: "green" },
    { id: "step11", name: "step11", type: "green" },
    { id: "step12", name: "step12", type: "green" },
    { id: "step13", name: "step13", type: "green" },
    { id: "step14", name: "step14", type: "green" },
    { id: "step15", name: "step15", type: "green" },
    { id: "step16", name: "step16", type: "green" },
    { id: "step17", name: "step17", type: "green" },
    { id: "step18", name: "step18", type: "green" },
    { id: "step19", name: "step19", type: "green" },
    { id: "step20", name: "step20", type: "green" },
    { id: "step21", name: "step21", type: "green" },
    { id: "step22", name: "step22", type: "green" },
  ]}
></Sidebar5>
<div class="dwrap"></div>
