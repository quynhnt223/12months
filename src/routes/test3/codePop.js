// helper.js
export function attachDynamicTooltips(rootEl, getText) {
  const divs = rootEl.querySelectorAll("span[id^='t']");

  divs.forEach((el) => {
    let tooltipEl;
    let hide; // hoist so we can clean up listeners

    el.addEventListener("click", (e) => {
      e.stopPropagation(); // prevent contenteditable from hijacking
      e.preventDefault();

      // toggle off
      if (tooltipEl) {
        tooltipEl.remove();
        tooltipEl = null;
        document.removeEventListener("click", hide);
        return;
      }

      // create tooltip
      tooltipEl = document.createElement("div");
      tooltipEl.innerHTML = getText(el.id); // ✅ allow HTML
      Object.assign(tooltipEl.style, {
        position: "absolute",
        background: "#ffffffff",
        color: "#596373ff",
        padding: "15px",
        borderRadius: "8px",
        fontSize: "16px",
        fontWeight: 500,
        lineHeight: 1.4,
        zIndex: 9999,
        maxWidth: "388px",
        boxShadow: "rgba(0, 0, 0, 0.45) 0px 5px 15px",
      });

      document.body.appendChild(tooltipEl);
      tooltipEl.classList.add("tooltip");

      // position relative to viewport
      const rect = el.getBoundingClientRect();
      tooltipEl.style.top = `${window.scrollY + rect.bottom + 8}px`;
      tooltipEl.style.left = `${window.scrollX + rect.left}px`;

      // hide on outside click
      hide = (evt) => {
        if (tooltipEl && !tooltipEl.contains(evt.target) && evt.target !== el) {
          tooltipEl.remove();
          tooltipEl = null;
          document.removeEventListener("click", hide);
        }
      };
      document.addEventListener("click", hide);
    });
  });
}
