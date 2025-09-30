<script>
  import { goto } from "$app/navigation";
  import { todayId } from "$lib/utils/todayId.js";
  import DashLayout from "$lib/design/dash/DashLayout.svelte";

  goto(`/ap/dash-${todayId()}`);

  let { children } = $props();
</script>

<!--DashLayout is layerLevel1-->
<DashLayout>
  {#snippet layerLevel2()}
    {@render children()}
  {/snippet}
</DashLayout>
