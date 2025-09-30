// noteCode.js
export function noteCode(node, options = {}) {
  const { debounceMs = 500, storagePrefix = "savet" } = options;

  let saveTimeouts = new Map();
  const savedElements = new Map();

  // Save content to localStorage
  function saveContent(element, content) {
    const elementId =
      element.id ||
      element.dataset.savetId ||
      `auto-${Math.random().toString(36).substr(2, 9)}`;
    const storageKey = `${storagePrefix}-${elementId}`;

    if (debounceMs > 0) {
      // Clear existing timeout for this element
      if (saveTimeouts.has(element)) {
        clearTimeout(saveTimeouts.get(element));
      }

      // Set new timeout
      const timeoutId = setTimeout(() => {
        localStorage.setItem(storageKey, content);
        saveTimeouts.delete(element);
      }, debounceMs);

      saveTimeouts.set(element, timeoutId);
    } else {
      localStorage.setItem(storageKey, content);
    }
  }

  // Load saved content
  function loadSavedContent(element) {
    const elementId = element.id || element.dataset.savetId;
    if (!elementId) return;

    const storageKey = `${storagePrefix}-${elementId}`;
    const saved = localStorage.getItem(storageKey);

    if (saved) {
      // Check if it's a contenteditable element
      if (element.contentEditable === "true") {
        if (saved !== element.innerHTML) {
          element.innerHTML = saved;
          // Dispatch input event to sync with any Svelte binding
          element.dispatchEvent(new Event("input", { bubbles: true }));
        }
      } else {
        // Regular form elements (input, textarea)
        if (saved !== element.value) {
          element.value = saved;
          element.dispatchEvent(new Event("input", { bubbles: true }));
        }
      }
    }
  }

  // Handle input events for form elements and contenteditable
  function handleInput(event) {
    const target = event.target;
    if (target.classList.contains("savet")) {
      let content;

      // Check if it's a contenteditable element
      if (target.contentEditable === "true") {
        content = target.innerHTML;
      } else {
        // Regular form elements (input, textarea)
        content = target.value;
      }

      saveContent(target, content);
    }
  }

  // Handle element additions (for dynamically added elements)
  function handleNewElements() {
    const savetElements = node.querySelectorAll(".savet");

    savetElements.forEach((element) => {
      if (!savedElements.has(element)) {
        // Generate ID if not present
        if (!element.id && !element.dataset.savetId) {
          element.dataset.savetId = `auto-${Math.random()
            .toString(36)
            .substr(2, 9)}`;
        }

        // Load saved content
        loadSavedContent(element);
        savedElements.set(element, true);
      }
    });
  }

  // Initial setup
  handleNewElements();

  // Add event listeners (using delegation)
  node.addEventListener("input", handleInput);

  // Also listen for 'blur' event for contenteditable elements
  // This ensures content is saved when user clicks away
  node.addEventListener("blur", handleInput, true);

  // Optional: Watch for new elements being added
  let observer;
  if (typeof MutationObserver !== "undefined") {
    observer = new MutationObserver((mutations) => {
      let shouldCheck = false;
      mutations.forEach((mutation) => {
        if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
          shouldCheck = true;
        }
      });
      if (shouldCheck) {
        handleNewElements();
      }
    });

    observer.observe(node, {
      childList: true,
      subtree: true,
    });
  }

  return {
    update(newOptions) {
      Object.assign(options, newOptions);
    },

    destroy() {
      // Clear all timeouts
      saveTimeouts.forEach((timeoutId) => clearTimeout(timeoutId));
      saveTimeouts.clear();
      savedElements.clear();

      // Remove event listeners
      node.removeEventListener("input", handleInput);
      node.removeEventListener("blur", handleInput, true);

      // Disconnect observer
      if (observer) {
        observer.disconnect();
      }
    },
  };
}

// Utility function to manually save all savet elements
export function saveAllSavetElements(containerElement = document) {
  const savetElements = containerElement.querySelectorAll(".savet");

  savetElements.forEach((element) => {
    const elementId = element.id || element.dataset.savetId;
    if (elementId) {
      let content;

      // Check if it's a contenteditable element
      if (element.contentEditable === "true") {
        content = element.innerHTML;
      } else if (element.value !== undefined) {
        // Regular form elements (input, textarea)
        content = element.value;
      }

      if (content !== undefined) {
        localStorage.setItem(`savet-${elementId}`, content);
      }
    }
  });
}

// Utility function to clear all saved data
export function clearAllSavetData(prefix = "savet") {
  const keys = Object.keys(localStorage).filter((key) =>
    key.startsWith(`${prefix}-`)
  );
  keys.forEach((key) => localStorage.removeItem(key));
}
