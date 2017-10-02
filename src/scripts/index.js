'use strict';

if (module.hot) {
  module.hot.accept();
}

import 'babel-polyfill';
import '../styles/index.scss';
import menu from './mobile-menu';

menu.initMobileMenu();
