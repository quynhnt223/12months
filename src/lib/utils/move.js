export function moveHelper({
  selector = ".move",
  threshold = 4,
  handle = null,
} = {}) {
  const active = new Map(); // el -> state

  const isInteractive = (target) =>
    target.closest?.(
      'a,button,input,textarea,select,[contenteditable=""],[contenteditable="true"]'
    );

  const hasHandle = (target, el) => {
    if (!handle) return true; // no handle required
    return target.closest?.(handle) && el.contains(target);
  };

  const onDown = (e) => {
    const el = e.currentTarget;

    // If user pressed on an interactive control (or not on the handle), let it click normally.
    if (!hasHandle(e.target, el) || isInteractive(e.target)) return;

    // Do NOT preventDefault on pointerdown; it can cancel clicks.
    const { x0, y0 } = getTranslate(el);
    active.set(el, {
      id: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      x0,
      y0,
      dragging: false,
    });

    // listen globally so we can move even if pointer leaves the element
    window.addEventListener("pointermove", onMove, { passive: false });
    window.addEventListener("pointerup", onUp, { passive: false });
  };

  const onMove = (e) => {
    for (const [el, st] of active) {
      if (st.id !== e.pointerId) continue;

      const dx = e.clientX - st.startX;
      const dy = e.clientY - st.startY;

      // start dragging only after crossing threshold
      if (!st.dragging) {
        if (Math.abs(dx) + Math.abs(dy) < threshold) return; // not a drag yet
        st.dragging = true;
        el.setPointerCapture?.(e.pointerId);
        el.style.touchAction = "none";
        el.style.cursor = "grabbing";
      }

      // Once dragging, prevent default to stop text selection/scroll
      e.preventDefault();

      setTranslate(el, st.x0 + dx, st.y0 + dy);
      break;
    }
  };

  const onUp = (e) => {
    for (const [el, st] of active) {
      if (st.id !== e.pointerId) continue;
      if (st.dragging) {
        // release capture; allow normal events again
        el.releasePointerCapture?.(e.pointerId);
        el.style.cursor = "grab";
      }
      active.delete(el);
      break;
    }
    if (active.size === 0) {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    }
  };

  function enhance(el) {
    if (el.__moveBound) return;
    el.__moveBound = true;
    el.style.cursor = "grab";
    el.addEventListener("pointerdown", onDown);
  }
  function unenhance(el) {
    if (!el.__moveBound) return;
    delete el.__moveBound;
    el.removeEventListener("pointerdown", onDown);
  }

  function getTranslate(el) {
    const t = getComputedStyle(el).transform;
    if (!t || t === "none") return { x0: 0, y0: 0 };
    const m = new DOMMatrixReadOnly(t);
    return { x0: m.m41, y0: m.m42 };
  }
  function setTranslate(el, x, y) {
    const style = el.style.transform || "";
    const hasTranslate = /translate\([^)]*\)/.test(style);
    const translate = `translate(${x}px, ${y}px)`;
    el.style.transform = hasTranslate
      ? style.replace(/translate\([^)]*\)/, translate)
      : `${translate} ${style}`.trim();
  }

  // init + observe
  document.querySelectorAll(selector).forEach(enhance);
  const mo = new MutationObserver((mutations) => {
    for (const m of mutations) {
      m.addedNodes.forEach((n) => {
        if (n.nodeType !== 1) return;
        if (n.matches?.(selector)) enhance(n);
        n.querySelectorAll?.(selector).forEach(enhance);
      });
      m.removedNodes.forEach((n) => {
        if (n.nodeType !== 1) return;
        if (n.matches?.(selector)) unenhance(n);
        n.querySelectorAll?.(selector).forEach(unenhance);
      });
    }
  });
  mo.observe(document.body, { childList: true, subtree: true });

  return () => {
    mo.disconnect();
    document.querySelectorAll(selector).forEach(unenhance);
    active.clear();
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerup", onUp);
  };
}
