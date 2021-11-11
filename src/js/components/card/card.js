/**
 * Manages the clickable card click event
 */
export default () => {
  // Add event listener to the document
  document.addEventListener('click', (event) => {
    // Check if the event target has the class uhb-c-card--clickable
    if (event.target.closest('.uhb-c-card--clickable')) {
      // Assign card HTMl element
      const card = event.target.closest('.uhb-c-card--clickable');

      // Check if the card has a child with the class uhb-c-card__link
      if (card.querySelector('.uhb-c-card__link') !== null) {
        // Click the link
        card.querySelector('.uhb-c-card__link').click();
      }
    }
  })
};
