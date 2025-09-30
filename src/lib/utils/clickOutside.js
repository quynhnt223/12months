// Method 4: Multiple exclude classes
export function clickOutsideAdvanced(node, { handler, excludeClasses = [] }) {
  const handleClick = (event) => {
    const isOutside = !node.contains(event.target);
    const isExcluded = excludeClasses.some((className) =>
      event.target.closest(`.${className}`)
    );

    if (isOutside && !isExcluded) {
      handler();
    }
  };

  document.addEventListener("click", handleClick, true);

  return {
    destroy() {
      document.removeEventListener("click", handleClick, true);
    },
  };
}

export function clickOutside(node, callback) {
  function handleClick(event) {
    if (node && !node.contains(event.target)) {
      callback(event);
    }
  }

  document.addEventListener("mousedown", handleClick, true);

  return {
    destroy() {
      document.removeEventListener("mousedown", handleClick, true);
    },
  };
}
