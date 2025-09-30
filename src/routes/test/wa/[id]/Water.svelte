<script>
  import { b01 } from "./waterAction.svelte.js";
</script>

{JSON.stringify(b01.data)}
<button onclick={() => b01.remove()}>-</button>
<button onclick={() => b01.add()}>+</button>
