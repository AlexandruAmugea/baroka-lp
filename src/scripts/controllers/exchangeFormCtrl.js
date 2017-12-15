exchangeFormCtrl.$inject = ['$scope', '$rootScope', 'exchangeFactory'];
function exchangeFormCtrl ($scope, $rootScope, exchangeFactory) {

    $scope.currency = exchangeFactory.getCurrencies();
    $scope.input = {
      sell: 0,
      get: 0
    };

    $scope.changeSellCurrency = function(currency) {
      $scope.currency.sell.selected = currency;
      let pair = $scope.currency.sell.selected.shortName + '|' + $scope.currency.get.selected.shortName;
      exchangeFactory.calculateCurrency(pair, $scope.input.sell).then(function(r){
        $scope.input.get = r.data.ClientReceived;
      }, function(er){
        console.log(er);
      });
    };

    $scope.changeGetCurrency = function(currency) {
      $scope.currency.sell.selected = currency;
      let pair = $scope.currency.sell.selected.shortName + '|' + $scope.currency.get.selected.shortName;
      exchangeFactory.calculateCurrency(pair, $scope.input.sell).then(function(r){
        $scope.input.get = r.data.ClientReceived;
      }, function(er){
        console.log(er);
      });
    };

    $scope.$watch('input.sell', function(val){
      exchangeFactory.calculateCurrency('BTC|USD', val).then(function(r){
        $scope.input.get = r.data.ClientReceived;
      }, function(er){
        console.log(er);
      });
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
  