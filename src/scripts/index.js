'use strict';

if (module.hot) {
  module.hot.accept();
}

import 'babel-polyfill';
import '../styles/index.scss';
import menu from './mobile-menu';
import steps from './steps.js';
import angular from 'angular';
import dropdown from 'angular-ui-bootstrap/src/dropdown/index-nocss.js';
import modal from 'angular-ui-bootstrap/src/modal/index-nocss.js';

menu.initMobileMenu();
steps.initSteps();

var app = angular.module('buroka', [
  dropdown,
  modal
]);

// Exchange form controller
(function(){
  app.controller('exchangeFormCtrl', ['$scope', 'exchangeFactory', function($scope, exchangeFactory){
    $scope.currency = exchangeFactory.getCurrencies();
    $scope.input = {
      sell: 0,
      get: 0
    };

    $scope.changeSellCurrency = function(currency) {
      $scope.currency.sell.selected = currency;
    };

    $scope.changeGetCurrency = function(currency) {
      $scope.currency.get.selected = currency;
    };

    $scope.$watch('input.sell', function(val){
      $scope.input.get = exchangeFactory.calculateCurrency(val);
    });
  }]);
}());

// Exchange form factory
(function(){
  app.factory('exchangeFactory', ['$http', function($http){
    return {
      getCurrencies: getCurrencies,
      calculateCurrency: calculateCurrency
    };

    function calculateCurrency(amount, from, to){
      return amount * 1.77;
    }

    function getCurrencies(){
      return {
        sell: {
          selected: {
            'shortName': 'BTN', 
            'name': 'Bitcoin',
          }
        },
        get: {
          selected: {
            'shortName': 'USD', 
            'name': 'US Dollar',
          }
        },
        all: [
          {'shortName': 'BTN', 'name': 'Bitcoin', 'imageClass': 'BTC'},
          {'shortName': 'USD', 'name': 'US Dollar', 'imageClass': 'BTC'},
          {'shortName': 'ETH', 'name': 'Ethereum', 'imageClass': 'ETH'},
        ]
      };
    }
    
  }]);
}());

