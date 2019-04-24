// CSS
import '../scss/index.scss';

// Site Scripts
import main from './site/main.js';

const Site = new main();

$(document).ready(() => {
  Site.init();
});
