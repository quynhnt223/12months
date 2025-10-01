<script>
  import Coder from "../Coder.svelte";
  import Sidebar from "../Sidebar.svelte";

  let { children } = $props();
</script>

{@render children()}
<Coder></Coder>
<Sidebar steps={["01", "02"]} bugs={["01"]}></Sidebar>
<div class="dwrap"></div>
