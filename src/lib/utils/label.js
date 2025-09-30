// $lib/helpers/label.js
/**
 * Show tooltips for any element with data-label="...".
 * Call once (e.g., in root +layout.svelte) and it will auto-handle future elements too.
 *
 * @param {Object} [options]
 * @param {number} [options.offset=10]       // px from cursor
 * @param {number} [options.delay=100]       // ms before showing
 * @param {string} [options.className='']    // extra class on tooltip element for custom styling
 * @returns {() => void}                     // cleanup function to remove listeners
 */
export function labelHelper(options = {}) {
  if (typeof window === "undefined") return () => {}; // SSR guard

  const { offset = 10, delay = 100, className = "" } = options;

  let tooltip;
  let showTimer = null;
  let currentTarget = null;
  let trackMove = false;

  // Create tooltip node (once)
  tooltip = document.createElement("div");
  tooltip.setAttribute("data-label-tooltip", "");
  tooltip.setAttribute("role", "tooltip");
  tooltip.style.position = "fixed";
  tooltip.style.pointerEvents = "none";
  tooltip.style.zIndex = "2147483647";
  tooltip.style.maxWidth = "32rem";
  tooltip.style.padding = "6px 8px";
  tooltip.style.borderRadius = "6px";
  tooltip.style.font =
    "12px/1.2 system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif";
  tooltip.style.background = "var(--label-bg, rgba(20,20,25,0.95))";
  tooltip.style.color = "var(--label-fg, #fff)";
  tooltip.style.boxShadow = "var(--label-shadow, 0 6px 22px rgba(0,0,0,.25))";
  tooltip.style.transform = "translate3d(0,0,0)";
  tooltip.style.opacity = "0";
  tooltip.style.transition = "opacity 120ms ease";
  tooltip.style.whiteSpace = "pre-wrap";
  tooltip.style.visibility = "hidden";
  if (className) tooltip.className = className;

  document.body.appendChild(tooltip);

  function show(text) {
    tooltip.textContent = text;
    tooltip.style.visibility = "visible";
    // Force layout to make opacity transition visible
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    tooltip.offsetHeight;
    tooltip.style.opacity = "1";
  }

  function hide() {
    tooltip.style.opacity = "0";
    tooltip.style.visibility = "hidden";
    tooltip.textContent = "";
    if (currentTarget) {
      currentTarget.removeAttribute("aria-describedby");
      currentTarget = null;
    }
  }

  function clamp(n, min, max) {
    return Math.max(min, Math.min(n, max));
  }

  function positionAt(x, y) {
    const rect = tooltip.getBoundingClientRect();
    const pad = 6;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    let left = x + offset;
    let top = y + offset;

    // If overflowing right/bottom, flip sides or clamp
    if (left + rect.width + pad > vw) left = x - rect.width - offset;
    if (left < pad) left = pad;

    if (top + rect.height + pad > vh) top = y - rect.height - offset;
    if (top < pad) top = pad;

    tooltip.style.left = `${clamp(left, pad, vw - rect.width - pad)}px`;
    tooltip.style.top = `${clamp(top, pad, vh - rect.height - pad)}px`;
  }

  function closestLabeled(el) {
    return el?.closest?.("[data-label]");
  }

  function onPointerMove(e) {
    if (!trackMove || !currentTarget) return;
    positionAt(e.clientX, e.clientY);
  }

  function onPointerOver(e) {
    const t = closestLabeled(e.target);
    if (!t) return;

    // Ignore if empty label
    const text = t.getAttribute("data-label") ?? "";
    if (!text.trim()) return;

    currentTarget = t;
    currentTarget.setAttribute("aria-describedby", "label-tooltip");

    if (showTimer) clearTimeout(showTimer);
    showTimer = setTimeout(() => {
      show(text);
      trackMove = true;
      positionAt(e.clientX, e.clientY);
    }, delay);
  }

  function onPointerOut(e) {
    // If moving from the labeled element to the tooltip itself, still hide (no hover intent on tooltip)
    const leaving = closestLabeled(e.target);
    const entering = closestLabeled(e.relatedTarget);
    if (leaving && leaving === currentTarget && entering !== currentTarget) {
      if (showTimer) {
        clearTimeout(showTimer);
        showTimer = null;
      }
      trackMove = false;
      hide();
    }
  }

  function onKeydown(e) {
    if (e.key === "Escape") {
      if (showTimer) clearTimeout(showTimer);
      trackMove = false;
      hide();
    }
  }

  function onScrollOrResize() {
    // Hide on layout changes to avoid stale positioning
    if (currentTarget) hide();
  }

  // Use pointer events for mouse, pen, and (optionally) touch.
  // For touch, most UIs don't show hover tooltips, so we only show on long-press if desired.
  // Here we just ignore touch hover by checking pointerType.
  function guardTouch(fn) {
    return (e) => {
      if (e.pointerType === "touch") return; // no tooltip on touch
      fn(e);
    };
  }

  document.addEventListener("pointerover", guardTouch(onPointerOver), true);
  document.addEventListener("pointerout", guardTouch(onPointerOut), true);
  document.addEventListener("pointermove", guardTouch(onPointerMove), true);
  window.addEventListener("keydown", onKeydown, true);
  window.addEventListener("scroll", onScrollOrResize, true);
  window.addEventListener("resize", onScrollOrResize, true);

  // Cleanup function
  return () => {
    document.removeEventListener(
      "pointerover",
      guardTouch(onPointerOver),
      true
    );
    document.removeEventListener("pointerout", guardTouch(onPointerOut), true);
    document.removeEventListener(
      "pointermove",
      guardTouch(onPointerMove),
      true
    );
    window.removeEventListener("keydown", onKeydown, true);
    window.removeEventListener("scroll", onScrollOrResize, true);
    window.removeEventListener("resize", onScrollOrResize, true);
    if (tooltip?.parentNode) tooltip.parentNode.removeChild(tooltip);
  };
}
