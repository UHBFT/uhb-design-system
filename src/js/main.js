
import Accordion from './components/accordion/accordion';
import Card from './components/card/card';
import Header from './components/header/header';
import SideNav from './components/side-nav/side-nav';
import Table from './components/table/table';
import Video from './components/video/video';

import './general/polyfills';
import './general/focus-visible';

// Initialise components
document.addEventListener('DOMContentLoaded', () => {
  Accordion();
  Card();
  Header();
  SideNav();
  Table();
  Video();
});
