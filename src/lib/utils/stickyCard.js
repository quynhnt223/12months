export function floatingCardHelper(options = {}) {
  const {
    cardSelector = '.floatingCard',
    triggerClass = 'openFloatingCard',
    animationDuration = 300,
    offset = { x: 10, y: 10 }
  } = options;

  console.log('FloatingCardHelper initialized with:', options);

  let activeCard = null;
  let activeTrigger = null;

  function waitForElement(selector, timeout = 5000) {
    console.log('Waiting for element:', selector);
    return new Promise((resolve, reject) => {
      const element = document.querySelector(selector);
      if (element) {
        console.log('Element found immediately:', element);
        resolve(element);
        return;
      }

      console.log('Element not found, setting up observer...');
      let timeoutId;
      const observer = new MutationObserver((mutations, obs) => {
        const element = document.querySelector(selector);
        if (element) {
          console.log('Element found via observer:', element);
          obs.disconnect();
          if (timeoutId) clearTimeout(timeoutId);
          resolve(element);
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true
      });

      timeoutId = setTimeout(() => {
        observer.disconnect();
        console.log('Timeout waiting for element:', selector);
        reject(new Error(`Element ${selector} not found within ${timeout}ms`));
      }, timeout);
    });
  }

  function positionCard(card, trigger) {
    console.log('Positioning card:', card, 'next to trigger:', trigger);
    
    if (!card || !trigger) {
      console.error('Missing card or trigger for positioning');
      return;
    }

    try {
      // Clear any transform from moveHelper completely since we're repositioning
      card.style.transform = '';
      card.style.transition = 'none';
      
      // Force reflow to get accurate measurements
      card.offsetHeight;
      
      const triggerRect = trigger.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const scrollX = window.scrollX;
      const scrollY = window.scrollY;
      
      console.log('Trigger rect:', triggerRect);
      console.log('Card rect:', cardRect);
      console.log('Viewport:', { width: viewportWidth, height: viewportHeight });

      // Calculate trigger's position in viewport (quadrant detection)
      const triggerCenterX = triggerRect.left + triggerRect.width / 2;
      const triggerCenterY = triggerRect.top + triggerRect.height / 2;
      
      const isLeftHalf = triggerCenterX < viewportWidth / 2;
      const isTopHalf = triggerCenterY < viewportHeight / 2;
      
      console.log('Quadrant detection:', { 
        triggerCenterX, 
        triggerCenterY, 
        isLeftHalf, 
        isTopHalf,
        quadrant: `${isTopHalf ? 'top' : 'bottom'}-${isLeftHalf ? 'left' : 'right'}`
      });

      let left, top;
      let preferredDirection = '';

      // Smart positioning based on quadrant
      if (isTopHalf && isLeftHalf) {
        // Top-left quadrant: prefer right or bottom
        const spaceRight = viewportWidth - triggerRect.right;
        const spaceBottom = viewportHeight - triggerRect.bottom;
        
        if (spaceRight >= cardRect.width + offset.x) {
          // Position to the right
          left = triggerRect.right + offset.x + scrollX;
          top = triggerRect.top + scrollY;
          preferredDirection = 'right';
        } else if (spaceBottom >= cardRect.height + offset.y) {
          // Position below
          left = triggerRect.left + scrollX;
          top = triggerRect.bottom + offset.y + scrollY;
          preferredDirection = 'bottom';
        } else {
          // Fallback to right with adjustment
          left = triggerRect.right + offset.x + scrollX;
          top = triggerRect.top + scrollY;
          preferredDirection = 'right-fallback';
        }
      } 
      else if (isTopHalf && !isLeftHalf) {
        // Top-right quadrant: prefer left or bottom
        const spaceLeft = triggerRect.left;
        const spaceBottom = viewportHeight - triggerRect.bottom;
        
        if (spaceLeft >= cardRect.width + offset.x) {
          // Position to the left
          left = triggerRect.left - cardRect.width - offset.x + scrollX;
          top = triggerRect.top + scrollY;
          preferredDirection = 'left';
        } else if (spaceBottom >= cardRect.height + offset.y) {
          // Position below
          left = triggerRect.right - cardRect.width + scrollX;
          top = triggerRect.bottom + offset.y + scrollY;
          preferredDirection = 'bottom';
        } else {
          // Fallback to left with adjustment
          left = triggerRect.left - cardRect.width - offset.x + scrollX;
          top = triggerRect.top + scrollY;
          preferredDirection = 'left-fallback';
        }
      }
      else if (!isTopHalf && isLeftHalf) {
        // Bottom-left quadrant: prefer right or top
        const spaceRight = viewportWidth - triggerRect.right;
        const spaceTop = triggerRect.top;
        
        if (spaceRight >= cardRect.width + offset.x) {
          // Position to the right
          left = triggerRect.right + offset.x + scrollX;
          top = triggerRect.bottom - cardRect.height + scrollY;
          preferredDirection = 'right';
        } else if (spaceTop >= cardRect.height + offset.y) {
          // Position above
          left = triggerRect.left + scrollX;
          top = triggerRect.top - cardRect.height - offset.y + scrollY;
          preferredDirection = 'top';
        } else {
          // Fallback to right with adjustment
          left = triggerRect.right + offset.x + scrollX;
          top = triggerRect.bottom - cardRect.height + scrollY;
          preferredDirection = 'right-fallback';
        }
      }
      else {
        // Bottom-right quadrant: prefer left or top
        const spaceLeft = triggerRect.left;
        const spaceTop = triggerRect.top;
        
        if (spaceLeft >= cardRect.width + offset.x) {
          // Position to the left
          left = triggerRect.left - cardRect.width - offset.x + scrollX;
          top = triggerRect.bottom - cardRect.height + scrollY;
          preferredDirection = 'left';
        } else if (spaceTop >= cardRect.height + offset.y) {
          // Position above
          left = triggerRect.right - cardRect.width + scrollX;
          top = triggerRect.top - cardRect.height - offset.y + scrollY;
          preferredDirection = 'top';
        } else {
          // Fallback to left with adjustment
          left = triggerRect.left - cardRect.width - offset.x + scrollX;
          top = triggerRect.bottom - cardRect.height + scrollY;
          preferredDirection = 'left-fallback';
        }
      }

      // Final boundary checks to keep card in viewport
      left = Math.max(scrollX + 10, Math.min(left, scrollX + viewportWidth - cardRect.width - 10));
      top = Math.max(scrollY + 10, Math.min(top, scrollY + viewportHeight - cardRect.height - 10));

      console.log('Final position:', { left, top, preferredDirection });

      // Set position and clear transform (this resets moveHelper position)
      card.style.position = 'absolute';
      card.style.left = `${left}px`;
      card.style.top = `${top}px`;
      card.style.zIndex = '1000';
      card.style.transform = ''; // Clear transform completely for fresh positioning
      
      // Re-enable transitions for future moveHelper interactions
      setTimeout(() => {
        card.style.transition = '';
      }, 10);
      
      console.log('Card positioned at:', card.style.left, card.style.top);
    } catch (error) {
      console.error('Error positioning card:', error);
    }
  }

  async function showCard(trigger) {
    console.log('showCard called with trigger:', trigger);
    console.log('Trigger type:', typeof trigger);
    console.log('Trigger nodeName:', trigger?.nodeName);
    console.log('Trigger classList:', trigger?.classList);
    console.log('Has getBoundingClientRect:', typeof trigger?.getBoundingClientRect);
    
    if (!trigger) {
      console.error('No trigger provided to showCard');
      return;
    }

    if (!trigger.getBoundingClientRect || typeof trigger.getBoundingClientRect !== 'function') {
      console.error('Trigger is not a valid DOM element:', trigger);
      return;
    }

    // Test if we can get bounding rect
    try {
      const testRect = trigger.getBoundingClientRect();
      console.log('Trigger rect test successful:', testRect);
    } catch (e) {
      console.error('Cannot get bounding rect from trigger:', e);
      return;
    }

    // Reset previous active states
    if (activeTrigger && activeTrigger !== trigger) {
      console.log('Removing active class from previous trigger');
      activeTrigger.classList.remove('floatingCard-trigger-active');
    }

    try {
      console.log('Waiting for card element...');
      const card = await waitForElement(cardSelector, 3000);
      console.log('Card found:', card);
      
      // Set initial styles
      card.style.display = 'block';
      card.style.opacity = '0';
      
      // Position the card
      positionCard(card, trigger);
      
      // Store references
      activeCard = card;
      activeTrigger = trigger;
      
      // Add active class to trigger
      trigger.classList.add('floatingCard-trigger-active');
      console.log('Added active class to trigger');
      
      // Simple fade in
      setTimeout(() => {
        card.style.transition = `opacity ${animationDuration}ms ease`;
        card.style.opacity = '1';
        console.log('Card should now be visible');
      }, 10);

      // Watch for card removal from DOM (when close button is clicked)
      const cardObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.removedNodes.forEach((node) => {
            if (node === activeCard) {
              // Card was removed from DOM, clean up references
              if (activeTrigger) {
                activeTrigger.classList.remove('floatingCard-trigger-active');
              }
              activeCard = null;
              activeTrigger = null;
              cardObserver.disconnect();
            }
          });
        });
      });

      cardObserver.observe(document.body, {
        childList: true,
        subtree: true
      });

    } catch (error) {
      console.error('Error showing card:', error);
    }
  }

  function handleResize() {
    if (activeCard && activeTrigger) {
      // Re-position card on window resize
      positionCard(activeCard, activeTrigger);
    }
  }

  // Set up event listeners
  function setupEventListeners() {
    console.log('Setting up event listeners for class:', triggerClass);
    
    document.addEventListener('click', (event) => {
      console.log('=== CLICK EVENT DEBUG ===');
      console.log('Clicked element:', event.target);
      console.log('Element tagName:', event.target.tagName);
      console.log('Element className:', event.target.className);
      console.log('Element classList:', Array.from(event.target.classList || []));
      
      // Check if clicked element or any parent has the trigger class
      const triggerElement = event.target.closest(`.${triggerClass}`);
      console.log('Found trigger element:', triggerElement);
      console.log('Trigger element tagName:', triggerElement?.tagName);
      console.log('Trigger element className:', triggerElement?.className);
      
      if (triggerElement) {
        console.log('✅ Valid trigger found, calling showCard');
        event.stopPropagation();
        showCard(triggerElement);
      } else {
        console.log('❌ No trigger element found');
      }
      console.log('=== END CLICK DEBUG ===');
    });
    
    // Reposition on window resize
    window.addEventListener('resize', handleResize);
  }

  // Initialize
  setupEventListeners();
  console.log('FloatingCardHelper setup complete');

  // Return cleanup function
  return () => {
    console.log('Cleaning up FloatingCardHelper');
    window.removeEventListener('resize', handleResize);
    if (activeTrigger) {
      activeTrigger.classList.remove('floatingCard-trigger-active');
    }
    activeCard = null;
    activeTrigger = null;
  };
}