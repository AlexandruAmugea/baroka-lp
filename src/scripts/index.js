'use strict';

if (module.hot) {
  module.hot.accept();
}

import 'babel-polyfill';
import '../styles/index.scss';
import menu from './mobile-menu';
import steps from './steps.js';
import angular from 'angular';

menu.initMobileMenu();
steps.initSteps();

var app = angular.module('buroka', [
  
]);

// Exchange form controller
(function(){
  app.controller('exchangeFormCtrl', ['$scope', 'exchangeFactory', function($scope, exchangeFactory){
    $scope.currency = {};

    $scope.currency.selected = {
      name: 'something', code: '321'
    };

    $scope.currency.all = [
      {'name': 1, 'code': '1'},
      {'name': 2, 'code': '2'},
      {'name': 3, 'code': '3'}
    ];

    $scope.$watch('currency.sell', function(val){
      $scope.currency.get = exchangeFactory.calculateCurrency($scope.currency.sell);
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
      return [
        { currency: "BTN"}
      ];
    }
    
  }]);
}());

