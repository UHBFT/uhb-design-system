import {slideInit} from '../../general/helpers';
import {slideEl} from '../../general/helpers';
import {toggleAttribute} from '../../general/helpers';

/**
 * Automate accessibility attributes of a video and manage transcript toggling
 */
export default () => {
  // Nodelist of all video elements
  const videos = document.querySelectorAll('.uhb-c-video');

  /**
   * Adds necessary attrubutes to a video element
   * @param {HTMLElement} element video element to initialise
   * @param {number} index number to be appended to dynamic IDs
   */
  const initialiseVideo = (element, index) => {
    // Assign video HTML elements
    const heading =    element.querySelector('.uhb-c-video__heading').innerText;
    const toggle =     element.querySelector('.uhb-c-video__toggle');
    const transcript = element.querySelector('.uhb-c-video__transcript');
    const openText =   `Open transcript for ${heading}`;
    const closeText =  `Close transcript for ${heading}`;

    // Set an id attribute on the toggle element if it does not have one
    if (!toggle.id) toggle.setAttribute('id', `uhb-c-video__toggle-${index}`);
    
    // Set an id attribute on the transcript element if it does not have one
    if (!transcript.id) transcript.setAttribute('id', `uhb-c-video__transcript-${index}`);
  
    // Set aria attributes on the toggle element
    if (!toggle.getAttribute('aria-controls')) toggle.setAttribute('aria-controls', transcript.id);
    if (!toggle.getAttribute('aria-expanded')) toggle.setAttribute('aria-expanded', false);
    if (!toggle.getAttribute('aria-label')) toggle.setAttribute('aria-label', openText);

    // Initialise slide animation styles
    slideInit(transcript, transcript.firstElementChild);

    /**
     * Toggles the visibility of the transcript container
     */
    const toggleTranscript = () => {
      // Animate the transcript
      slideEl(transcript, transcript.firstElementChild);

      // Toggle attributes and classes
      toggleAttribute(toggle, 'aria-expanded');
      toggle.classList.toggle('is-active');
      transcript.classList.toggle('is-open');

      // Set aria-label attribute and text of toggle to reflect state
      if (toggle.getAttribute('aria-expanded') === 'true') {
        toggle.setAttribute('aria-label', closeText)
        toggle.innerText = 'Close transcript';
      } else {
        toggle.setAttribute('aria-label', openText);
        toggle.innerText = 'Open transcript';
      }
    }

    toggle.addEventListener('click', toggleTranscript);
  }

  // Loop through each video on a page
  if (videos.length) {
    videos.forEach((video, index) => {
      initialiseVideo(video, index);
    });
  }
};