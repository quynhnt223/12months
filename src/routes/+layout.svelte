<script>
  import "../app.css";
  import { playSound } from "$lib/sound.js"; // adjust path as needed

  let { children } = $props();

  function handleClick(event) {
    // look for the nearest ancestor (or self) that:
    //  • has a data-sound attribute, OR
    //  • has a class that starts with "sound"
    const btn = event.target.closest('[data-sound], [class*="sound"]');
    if (!btn) return;

    // first priority: data-sound
    let key = btn.dataset.sound;
    if (!key) {
      // fallback: class="sound123"
      const soundClass = Array.from(btn.classList).find((c) =>
        c.startsWith("sound")
      );
      if (!soundClass) return;
      key = soundClass.replace("sound", "");
    }

    playSound(`/sound${key}.mp3`);
  }
</script>

<div on:click|capture={handleClick}>
  {@render children()}
</div>
