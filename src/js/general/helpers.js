/**
 * Returns NodeList of focusable child elements of specified element
 * @param {HTMLElement} element element with focuable child elements
 */
export const getFocusableElements = (element) => {
  return element.querySelectorAll('a, button, input, textarea, select, details,[tabindex]:not([tabindex="-1"])');
}

/**
 * Loops through a NodeList of focusable child elements of specified element
 * @param {HTMLElement} element element with focuable child elements
 */
export const loopFocusableElements = (element) => {
  if (!element) return false;

  const focusableElements = getFocusableElements(element);

  if (focusableElements.length > 0) {
    // Get first and last focusable elements
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    const keyboardHandler = (event) => {
      // Check if shift key is down
      if (event.keyCode === 9) {
        // Check if shift key is down and the current focused element is the first
        if (event.shiftKey && document.activeElement === firstFocusableElement) {
          event.preventDefault();
          // Loop focus to last element
          lastFocusableElement.focus();
          // Check if shift key is down and current focused element is the last
        } else if (!event.shiftKey && document.activeElement === lastFocusableElement) {
          event.preventDefault();
          // Loop focus to first element
          firstFocusableElement.focus();
        }
      }
    };
    // Add event listener to cookie notice
    element.addEventListener('keydown', keyboardHandler);

    // Remove event listener
    return function cleanUp() {
      if (keyboardHandler) {
        element.removeEventListener('keydown', keyboardHandler);
      }
    };
  }
}

export const throttle = (callback, limit) => {
  var tick = false;
  return function () {
    if (!tick) {
      callback.call();
      tick = true;
      setTimeout(function () {
        tick = false;
      }, limit);
    }
  }
}

export const toggleAttribute = (element, attr) => {
  if (!element || !attr) return false;

  const value = (element.getAttribute(attr) === 'true') ? 'false' : 'true';
  element.setAttribute(attr, value);
};


/**
 * Adds styles to an element ready for slide animations
 * @param {HTMLElement} outer element to slide
 * @param {HTMLElement} child of slider element
 */
export const slideInit = (element, elementInner) => {
  element.style.overflow = 'hidden';
  element.style.height = '0px';
  elementInner.style.visibility = 'hidden';
};

/**
 * Animates an element to slide out
 * @param {HTMLElement} outer element to slide
 * @param {HTMLElement} child of slider element
 */
export const slideEl = (element, elementInner) => {

  /**
   * Returns true if the element is already expanded
   */
  const isExpanded = () => {
    if (element.style.height === '0px') return false;
  }

  if (element.style.height === '0px') {
    const height = elementInner.offsetHeight + 'px';
    element.style.height = height;
    elementInner.style.visibility = 'visible';
      
    element.addEventListener('transitionend', function clean() {
      if (element.style.height === height) {
        element.style.height = 'auto';
        element.style.overflow = 'visible';
      }

      element.removeEventListener('transitionend', clean);
    });
  } else {
    const height = elementInner.offsetHeight + 'px';
    element.style.height = height;
      
    setTimeout(() => {
      element.style.overflow = 'hidden';
      element.style.height = '0px';
    })
  
    element.addEventListener('transitionend', function clean() {
      if (element.style.height === '0px') {
        elementInner.style.visibility = 'hidden';
      }
  
      element.removeEventListener('transitionend', clean);
    });
  }
};