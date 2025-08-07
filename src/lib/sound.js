// src/lib/sound.js
let audio = null;

export function playSound(src) {
  if (!audio) {
    audio = new Audio();
    audio.loop = false; // or true if you want it to loop
  }
  audio.src = src;
  audio.play();
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
