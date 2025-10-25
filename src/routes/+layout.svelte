<script>
  import { setupSoundEffects } from "$lib/utils/sound.js";
  import "../app.css";
  let { children } = $props();
  $effect(() => setupSoundEffects());
</script>

{@render children()}
