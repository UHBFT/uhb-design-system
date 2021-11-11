import {slideEl} from '../../general/helpers';
import {toggleAttribute} from '../../general/helpers';

export default () => {
  // NodeList of all accordion elements
  const accordions = document.querySelectorAll('.uhb-c-accordion');
  
  /** Toggle accordion item expanded state.
   * @param {event} event click event.
   * @param {HTMLElement} element accordion item element.
   */
  const toggleAccordion = (event, element) => {
    event.preventDefault();

    // Assign accordion HTML elements
    const toggle = element.querySelector('.uhb-c-accordion__toggle');
    const content = element.querySelector('.uhb-c-accordion__content');
    const contentInner = element.querySelector('.uhb-c-accordion__content-inner');
    element.classList.toggle('is-expanded');
    toggleAttribute(toggle, 'aria-expanded');
    toggleAttribute(content, 'aria-hidden');
    slideEl(content, contentInner);
  }

  accordions.forEach((accordion) => {
    // Attach event listener to accordion container to use event delegation
    accordion.addEventListener('click', (event) => {
      const item = event.target.closest('.uhb-c-accordion__toggle');
      // Check if accordion toggle has been clicked
      if (item) {
        toggleAccordion(event, event.target.closest('.uhb-c-accordion__toggle').parentNode);
      }
    })
  })
}