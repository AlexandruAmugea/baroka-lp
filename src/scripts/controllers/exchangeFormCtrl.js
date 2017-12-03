exchangeFormCtrl.$inject = ['$scope', '$rootScope', 'exchangeFactory'];
function exchangeFormCtrl ($scope, $rootScope, exchangeFactory) {

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

};

export default exchangeFormCtrl;
  