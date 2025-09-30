<script>
  import "../app.css";
  import "../style.css";
  import { handleClick } from "$lib/utils/sound.js";
  import { labelHelper } from "$lib/utils/label.js";
  import { moveHelper } from "$lib/utils/move.js";
  import { floatingCardHelper } from "$lib/utils/stickyCard.js";

  let { children } = $props();

  $effect(() => labelHelper({ offset: 10, delay: 120 }));
  $effect(() => moveHelper({ selector: ".move" }));
</script>

{@render children()}
<svelte:window onclickcapture={handleClick} />
