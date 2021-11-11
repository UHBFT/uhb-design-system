import {slideInit} from '../../general/helpers';
import {slideEl} from '../../general/helpers';
import {toggleAttribute} from '../../general/helpers';


/**
 * Manage 
 */
export default () => {
  // Assign HTML elements
  const sideNav =   document.querySelector('.uhb-c-side-nav');
  const toggle =    document.querySelector('.uhb-c-side-nav__toggle');
  const container = document.querySelector('.uhb-c-side-nav__container');

  /**
   * Adds necessary attrubutes to a side nav element
   */
  const initSideNav = () => {
    // Set aria attributes
    toggle.setAttribute('aria-controls', container.getAttribute('id'));
    toggle.setAttribute('aria-expanded', 'false' !== toggle.getAttribute('aria-expanded'));

    // Initialise the slide elements
    slideInit(container, container.firstElementChild);
  }

  /**
   * Toggle side nav animation
   * @param {Object} event click event object
   */
  const toggleSideNav = (event) => {
    event.preventDefault();
    // Toggle the slide animation
    slideEl(container, container.firstElementChild);
    // Toggle the open state class
    sideNav.classList.toggle('is-open');
    // Toggle the aria-expanded attribute
    toggleAttribute(toggle, 'aria-expanded');
  } 

  // Check all necessary HTML emements exist
  if (sideNav && toggle && container) {
    initSideNav(sideNav);
    
    toggle.addEventListener('click', (event) => {
      toggleSideNav(event);
    })
  }
};
