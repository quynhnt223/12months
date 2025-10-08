<script>
  import Coder from "../Coder.svelte";
  import Sidebar from "../Sidebar.svelte";

  let { children } = $props();
</script>

{@render children()}
<Coder></Coder>
<Sidebar
  steps={["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"]}
  bugs={["01", "02", "03", "04", "05", "06", "07", "08"]}
></Sidebar>
<div class="dwrap"></div>
