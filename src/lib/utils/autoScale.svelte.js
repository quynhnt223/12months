// autoScale.svelte.js
import { states } from "$lib/states.svelte.js";

function calculateScale() {
  const ww = window.innerWidth;
  const wh = window.innerHeight;

  const s = Math.min(ww / states.scaleInfo.w, wh / states.scaleInfo.h);
  states.scaleInfo.s = s;

  // Center the scaled content
  states.scaleInfo.x = (ww - states.scaleInfo.w * s) / 2;
  states.scaleInfo.y = (wh - states.scaleInfo.h * s) / 2;
}

const handleResize = () => calculateScale();
const handleFullscreenChange = () => {
  states.isFullscreen = !!document.fullscreenElement;
  setTimeout(calculateScale, 100);
};

export function autoScale() {
  calculateScale(); // Initial calculation
  window.addEventListener("resize", handleResize);
  document.addEventListener("fullscreenchange", handleFullscreenChange);

  return () => {
    window.removeEventListener("resize", handleResize);
    document.removeEventListener("fullscreenchange", handleFullscreenChange);
  };
}
