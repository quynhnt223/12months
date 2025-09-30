<script>
  import DateNav from "./DateNav.svelte";
  import Water from "./Water.svelte";

  import { dataManager } from "./sync2.js";

  // Just importing is enough, constructor runs automatically
  // If you want to debug:
  console.log("Sync system initialized:", dataManager.getSyncStatus());
</script>

<DateNav></DateNav>
<Water></Water>
