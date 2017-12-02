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
import faqTabMenu from './faqTabMenu.js';

menu.initMobileMenu();
steps.initSteps();
faqTabMenu.initTabMenuFaq();

var app = angular.module('buroka', [
  dropdown,
  modal
]);

//Header controller 

(function(){
  app.controller('headerController', ['$scope', '$rootScope', function($scope, $rootScope){

    $scope.howItWorks = function(){
      $rootScope.$emit('open:howItWorks');
    };

  }]);
}());

//Footer controller 

(function(){
  app.controller('footerController', ['$scope', '$rootScope', function($scope, $rootScope){

    $scope.howItWorks = function(){
      $rootScope.$emit('open:howItWorks');
    };

  }]);
}());




// Exchange form controller
(function(){
  app.controller('exchangeFormCtrl', ['$scope', '$rootScope', 'exchangeFactory', function($scope, $rootScope, exchangeFactory){
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

    $scope.openRegisterPopup = false;

    $scope.submit = function(){
      $rootScope.$emit('open:registerPopup');
    };

    $scope.switchAmmounts = function(){
      $scope.input.sell = $scope.input.get;
    };

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

(function(){
  app.directive('registerPopup', function(){
    return {
      scope: {
        opened: "@"
      },
      restric: "AE",
      template: '<div class="register-poup--wrapper" ng-class="{ active : opened === true}" ng-click="close()"></div>'
       + '<div class="register-poup--body text-center" ng-class="{ active : opened === true}">'
       + '<span class="register-poup--close-btn" ng-click="close()">x</span>'
       + '<h1>Hello!</h1>'
       + '<button type="button" class="btn btn-form-submit" ng-click="register()">I\'m a new user</button></br>'
       + '<button type="button" class="btn btn-step-callout" ng-click="signIng">I already have an account</button>'
       + '</div>',
      controller: ['$scope', '$rootScope', function($scope, $rootScope) {
        var body = document.getElementsByTagName('body')[0];
        body.addEventListener('keyup', (e) =>{
          if(e.keyCode === 27 && $scope.opened) {
            $scope.$apply(function(){
              $scope.opened = !$scope.opened;
            });
            unblockBody();
          }
        });
        function scrollAndBlock(){
          window.scrollTo( 0, 0 );
          body.style.overflow = 'hidden'; 
          
        }

        function unblockBody(){
          document.getElementsByTagName('body')[0].style.overflow = 'auto'; 
        }

        $rootScope.$on('open:registerPopup', function(){
          $scope.opened = true;
          scrollAndBlock();
        });

        $scope.signIn = function(){
          
        };

        $scope.register = function(){

        };

        $scope.close = function(){
          $scope.opened = !$scope.opened;
          unblockBody();
        };
      }]
    };
  });
}());


(function(){
  app.directive('howItWorksPopUp', function(){
    return {
      scope: {
        howopened: "@"
      },
      restric: "AE",
      template: '<div class="pop-up-how-wrapper" ng-class="{ active : howopened === true}" ng-click="close()"></div>'
       + '<div class="pop-up-how" ng-class="{ active : howopened === true}" ng-click="close()">'
       + '<div class="pop-up-how--body text-center" ng-class="{ active : howopened === true}">'
       + '<span class="register-poup--close-btn" ng-click="close()">x</span>'
       + '<img src="images/how-it-works.jpg" class="img-responsive" />'
       + '</div></div>',
      controller: ['$scope', '$rootScope', function($scope, $rootScope) {
        var body = document.getElementsByTagName('body')[0];

        function scrollAndBlock(){
          window.scrollTo( 0, 0 );
          body.style.overflow = 'hidden'; 
        }

        function unblockBody(){
          document.getElementsByTagName('body')[0].style.overflow = 'auto'; 
        }

        $rootScope.$on('open:howItWorks', function(){
          $scope.howopened = true;
          scrollAndBlock();
        });

        $scope.close = function(){
          $scope.howopened = !$scope.howopened;
          unblockBody();
        };
      }]
    };
  });
}());

