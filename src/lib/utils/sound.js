// src/lib/sound.js
let audio = null;

export function playSound(src) {
  // Create a fresh Audio instance for each sound
  const newAudio = new Audio(src);
  newAudio.loop = false;

  newAudio.play().catch((err) => {
    console.warn("Audio play failed:", err);
  });

  // Update the global reference for stop functionality
  audio = newAudio;
}

export function stopSound() {
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
  }
}

export function getAudio() {
  return audio;
}
export function handleClick(event) {
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
