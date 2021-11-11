import {toggleAttribute} from '../../general/helpers';

export default () => {
  // Assign navigation HTML elements
  const navigation = document.querySelector('.uhb-c-header__navigation');
  const navigationContainer = document.querySelector('.uhb-c-header__navigation-container');
  const navigationOpen = document.querySelector('.uhb-c-header__navigation-open');
  const navigationClose = document.querySelector('.uhb-c-header__navigation-close');

  /** 
   * Toggle header search overlay
  */
  const toggleNavigation = (event) => {
    event.preventDefault();
    toggleAttribute(navigationOpen, 'aria-expanded');
    toggleAttribute(navigationClose, 'aria-expanded');
    navigation.classList.toggle('is-open');
    document.body.parentNode.classList.toggle('is-locked');

    navigationContainer.addEventListener('transitionend', function focusToggles() {
      if (navigation.classList.contains('is-open')) {
        navigationClose.focus();
      } else {
        navigationOpen.focus();
      }
      navigationContainer.removeEventListener('transitionend', focusToggles, false);
    })
  }

  if (navigation && navigationOpen && navigationClose) {
    [navigationOpen, navigationClose].forEach((toggle) => {
      toggle.addEventListener('click', (event) => {
        toggleNavigation(event);
      })
    })

    document.addEventListener('keyup', (event) => {
      if (event.isComposing || event.keyCode === 229) {
        return;
      }
  
      if (event.key === 'Escape' && navigation.classList.contains('is-open')) {
        toggleNavigation(event);
      }
    })

    document.addEventListener('click', (event) => {
      // "onBlur" close if visible part is clicked
      if (navigation.classList.contains('is-open') && event.target.matches('.uhb-c-header__navigation')) {
        toggleNavigation(event);
      };
    });
  }
};

// import {toggleAttribute} from '../../general/helpers';
// import {loopFocusableElements} from '../../general/helpers';
// import {scrollLock} from '../../general/scroll-lock';

// export default () => {
//   // Assign nav HTML elements
//   const nav = document.querySelector('.uhb-c-header__nav');
//   const navInner = document.querySelector('.uhb-c-header__nav-inner');
//   const navOpen = document.querySelector('.uhb-c-header__nav-open');
//   const navClose = document.querySelector('.uhb-c-header__nav-close');
//   const mobilenavListEls = document.querySelectorAll('[data-mobile-nav="true"]');

//   /**
//    * Return built mobile nav lists
//    * @param {HTMLElement} lists NodeList of mobile nav lists
//    */
//   const buildMobilenavListEls = (lists) => {
//     const builtLists = [];
//     // Loop though mobile nav lists and push to array
//     lists.forEach((list) => {
//       // Create nav list element
//       const navListEl = document.createElement('ul');
//       navListEl.classList.add('uhb-c-header__nav-list', 'uhb-u-hide-from-xl');
//       navListEl.setAttribute('data-remove-on-close', 'true');

//       if (list.getAttribute('data-mobile-nav-class')) {
//         navListEl.classList.add('uhb-c-header__nav-list--' + list.getAttribute('data-mobile-nav-class') + '');
//       }

//       if (list.getAttribute('data-mobile-nav-layout')) {
//         navListEl.classList.add('uhb-c-header__nav-list--' + list.getAttribute('data-mobile-nav-layout') + '');
//       }

//       if (list.getAttribute('data-mobile-nav-background')) {
//         navListEl.classList.add('uhb-u-background-' + list.getAttribute('data-mobile-nav-background') + '');
//       }

//       if (list.getAttribute('data-mobile-nav-highlight')) {
//         navListEl.classList.add('uhb-c-header__nav-list--highlight');
//       }

//       // Loop through each li 
//       list.querySelectorAll('li').forEach((listItem) => {
//         const navItemEl = document.createElement('li');
//         navItemEl.classList.add('uhb-c-header__nav-item');

//         const navLinkEl = listItem.querySelector('a').cloneNode(true);
//         navLinkEl.className = 'uhb-c-header__nav-link';
//         navItemEl.appendChild(navLinkEl);
//         navListEl.appendChild(navItemEl);
//       })
//       builtLists.push(navListEl);
//     })

//     return builtLists;
//   }

//   /**
//    * Toggle header nav classes and attributes
//    * @param {Object} event click event
//    */
//   const toggleNav = (event) => {
//     event.preventDefault();
//     // Build mobile nav lists
//     const mobilenavListElsArr = buildMobilenavListEls(mobilenavListEls);
    
//     // Check if nav is currently opening or closing (necessary for correctly adding and removing mobile nav lists)
//     if (!nav.classList.contains('js-closing') && !nav.classList.contains('js-opening')) {
//       if (nav.classList.contains('is-open')) {
//         nav.classList.add('js-closing');
//         nav.classList.remove('is-open');
//         scrollLock(false);

//         nav.addEventListener('transitionend', function animationStatus() {
//           nav.classList.remove('js-closing');
//           navOpen.focus();
//           toggleAttribute(navOpen, 'aria-expanded');
//           toggleAttribute(navClose, 'aria-expanded');
//           if (!nav.classList.contains('is-open')) {
//             navInner.querySelectorAll('[data-remove-on-close]').forEach((navListEl) => {
//               navInner.removeChild(navListEl);
//             });
//           }
//           nav.removeEventListener('transitionend', animationStatus, false);
//         })
//       } else {
//         nav.classList.add('js-opening');
//         nav.classList.add('is-open');
//         scrollLock(true);
//         //html.classList.add('js-menu-open');
//         if (mobilenavListElsArr.length > 0) {
//           mobilenavListElsArr.forEach((list) => {
//             // Add quick links to  the top of the nav
//             if (mobilenavListElsArr.indexOf(list) === 0) {
//               navInner.insertBefore(list, navInner.children[1]);
//             } else {
//               navInner.appendChild(list);
//             }
//           })
//         }

//         nav.addEventListener('transitionend', function animationStatus() {
//           nav.classList.remove('js-opening');
//           navClose.focus();
//           toggleAttribute(navOpen, 'aria-expanded');
//           toggleAttribute(navClose, 'aria-expanded');
//           loopFocusableElements(nav);
//           nav.removeEventListener('transitionend', animationStatus, false);
//         })
//       }
//     }
//   }

//   // Check necessary HTML elements exist
//   if (nav && navOpen && navClose) {
//     // Add click event listener to nav open and close buttons
//     [navOpen, navClose].forEach((element) => {
//       element.addEventListener('click', toggleNav);
//     });

//     document.addEventListener('click', (event) => {
//       // "onBlur" close if visible part is clicked
//       if (nav.classList.contains('is-open') && event.target.matches('.uhb-c-header__nav')) {
//         toggleNav(event);
//       };
//     });
//   };
// };