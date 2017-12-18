exchangeFormCtrl.$inject = ['$scope', '$rootScope', 'exchangeFactory'];
function exchangeFormCtrl ($scope, $rootScope, exchangeFactory) {
    $scope.currency = exchangeFactory.getCurrencies();
    $scope.input = {
      sell: 0,
      get: 0
    };
    $scope.loading = false;
    $scope.initFirstTime = true;
    var timeForTypeInSeconds = 1500;
    var numberRegex = new RegExp('^[0-9]$');
    var typingTimer;

    var calculatePrice = function(){
      if($scope.currency.sell.selected.shortName.includes('USD')) {
        console.log('includes usd');
        let pair = $scope.currency.get.selected.shortName + '|' +  $scope.currency.sell.selected.shortName;
        exchangeFactory.calculateCurrencyBuy(pair, $scope.input.sell).then(function(r){
          $scope.input.get = r.data.ClientReceived;
          $scope.loading = false;
        }, function(er){
          $scope.loading = false;
          console.log('Error:');
          console.log(er);
        });
      } else {
        let pair = $scope.currency.sell.selected.shortName + '|' + $scope.currency.get.selected.shortName;
        exchangeFactory.calculateCurrencySell(pair, $scope.input.sell).then(function(r){
          $scope.input.get = r.data.ClientReceived;
          $scope.loading = false;
        }, function(er){
          $scope.loading = false;
          console.log('Error:');
          console.log(er);
        });
      }
    };

    $scope.changeSellCurrency = function(currency) {
      $scope.currency.sell.selected = currency;
      $scope.loading = true;
      calculatePrice();
    };

    $scope.changeGetCurrency = function(currency) {
      $scope.currency.get.selected = currency;
      $scope.loading = true;
      calculatePrice();
    };

    $scope.$watch('input.sell', function(val, param){
      clearTimeout(typingTimer);
      $scope.loading = true;

      if($scope.initFirstTime) {
        $scope.initFirstTime = false;
        $scope.loading = false;
        return; 
      }

      typingTimer = setTimeout(calculatePrice, timeForTypeInSeconds);

    });

    $scope.openRegisterPopup = false;
    $scope.submit = function(){
      $rootScope.$emit('open:registerPopup');
    };

    $scope.changeBuySellPositions = function(){
      if($scope.currency.sell.selected.shortName.includes('USD')) {
        $scope.currency.all = exchangeFactory.getCurrencies().all;
        $scope.currency.exchangeCurrency = exchangeFactory.getCurrencies().exchangeCurrency;
        $scope.currency.sell.selected = $scope.currency.get.selected;
        $scope.currency.get.selected = exchangeFactory.getCurrencies().exchangeCurrency[0];
        calculatePrice();
       } else {
        $scope.currency.all = exchangeFactory.getCurrencies().exchangeCurrency;
        $scope.currency.exchangeCurrency = exchangeFactory.getCurrencies().all;
        $scope.currency.get.selected = $scope.currency.sell.selected;
        $scope.currency.sell.selected = exchangeFactory.getCurrencies().exchangeCurrency[0];
        calculatePrice();
       }
    };

};

export default exchangeFormCtrl;
  