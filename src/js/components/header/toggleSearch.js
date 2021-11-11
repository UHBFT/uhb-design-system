import {toggleAttribute} from '../../general/helpers';

export default () => {
  // Assign search HTML elements
  const search = document.querySelector('.uhb-c-header__search');
  const searchOpen = document.querySelector('.uhb-c-header__search-open');
  const searchClose = document.querySelector('.uhb-c-header__search-close');
  const searchContainer = document.querySelector('.uhb-c-header__search-container');
  
  /** 
   * Toggle header search overlay
  */
  const toggleSearch = (event) => {
    event.preventDefault();
    toggleAttribute(searchOpen, 'aria-expanded');
    search.classList.toggle('is-open');
    document.body.parentNode.classList.toggle('is-locked');

    searchContainer.addEventListener('transitionend', function focusToggles() {
      if (search.classList.contains('is-open')) {
        searchClose.focus();
      } else {
        searchOpen.focus();
      }
      searchContainer.removeEventListener('transitionend', focusToggles, false);
    })
  }

  if (search && searchOpen && searchClose) {
    [searchOpen, searchClose].forEach((toggle)  => {
      toggle.addEventListener('click', toggleSearch);
    })

    search.addEventListener('keyup', (event) => {
      if (event.isComposing || event.keyCode === 229) {
        return;
      }
  
      if (event.key === 'Escape' && search.classList.contains('is-open')) {
        toggleSearch(event);
      }
    })

    search.addEventListener('click', (event) => {
      // "onBlur" close if visible part is clicked
      if (search.classList.contains('is-open') && event.target.matches('.uhb-c-header__search')) {
        toggleSearch(event);
      };
    });
  }
};

// export default () => {
//   // Assign search HTML elements
//   const search = document.querySelector('.uhb-c-header__search');
//   const searchOpen = document.querySelector('.uhb-c-header__search-open');
//   const searchClose = document.querySelector('.uhb-c-header__search-close');

//   /**
//    * Toggle header nav classes and attributes
//    * @param {Object} event click event
//    */
//   const toggleSearch = (event) => {
//     event.preventDefault();
    
//     // Check if search is currently opening or closing (necessary for correctly adding and removing mobile nav lists)
//     if (!search.classList.contains('js-closing') && !search.classList.contains('js-opening')) {
//       // Check if search is open
//       if (search.classList.contains('is-open')) {
//         search.classList.add('js-closing');
//         search.classList.remove('is-open');
//         scrollLock(false);

//         search.addEventListener('transitionend', function animationStatus() {
//           search.classList.remove('js-closing');
//           searchOpen.focus();
//           toggleAttribute(searchOpen, 'aria-expanded');
//           toggleAttribute(searchClose, 'aria-expanded');
//           search.removeEventListener('transitionend', animationStatus, false);
//         })
//       } else {
//         search.classList.add('js-opening');
//         search.classList.add('is-open');
//         scrollLock(true);

//         search.addEventListener('transitionend', function animationStatus() {
//           search.classList.remove('js-opening');
//           searchClose.focus();
//           toggleAttribute(searchOpen, 'aria-expanded');
//           toggleAttribute(searchClose, 'aria-expanded');
//           loopFocusableElements(search);
//           search.removeEventListener('transitionend', animationStatus, false);
//         });
//       };
//     };
//   };

//   // Check necessary HTML elements exist
//   if (search && searchOpen && searchClose) {
//     // Add click event listener to nav open and close buttons
//     [searchOpen, searchClose].forEach((element) => {
//       element.addEventListener('click', toggleSearch);
//     });

//     // Add click event listener to document
//   document.addEventListener('click', (event) => {
//     // "onBlur" close if visible part is clicked
//     if (search.classList.contains('is-open') && event.target.matches('.uhb-c-header__search')) {
//       toggleSearch(event);
//     };
//    });
//   };
  
  
// }