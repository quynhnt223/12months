<script>
  import Coder from "../Coder.svelte";
  import Sidebar3 from "../Sidebar3.svelte";

  let { children } = $props();
</script>

{@render children()}
<Coder></Coder>
<Sidebar3
  steps={["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"]}
  bugs={["12", "13", "14", "15", "16", "17", "18", "19", "20"]}
></Sidebar3>
<div class="dwrap"></div>
