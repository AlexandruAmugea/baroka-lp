'use strict';

if (module.hot) {
  module.hot.accept();
}

import 'babel-polyfill';
import '../styles/index.scss';
import menu from './helpers/mobile-menu';
import steps from './helpers/steps.js';
import angular from 'angular';
import dropdown from 'angular-ui-bootstrap/src/dropdown/index-nocss.js';
import faqTabMenu from './helpers/faqTabMenu.js';

// Controllers
import headerCtrl from './controllers/headerCtrl';
import footerCtrl from './controllers/footerCtrl';
import exchangeFormCtrl from './controllers/exchangeFormCtrl';
import contactFormCtrl from './controllers/contactFormCtrl';

// Factories
import exchangeFactory from './factory/exchangeFactory';

// Directives
import registerPopup from './directives/registerPopup';
import howItWorksPopUp from './directives/howItWorksPopUp';

menu.initMobileMenu();
steps.initSteps();
faqTabMenu.initTabMenuFaq();

var app = angular.module('buroka', [
  dropdown
]);

app.controller('headerCtrl', headerCtrl);
app.controller('contactFormCtrl', contactFormCtrl);
app.controller('footerCtrl', footerCtrl);
app.controller('exchangeFormCtrl', exchangeFormCtrl);

app.factory('exchangeFactory', exchangeFactory);

app.directive('registerPopup', registerPopup);
app.directive('howItWorksPopUp', howItWorksPopUp);


