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
    var formInput = document.getElementById('form-exchange-sell');
    var numberRegex = new RegExp('^[0-9]$');
    var typingTimer;

    var calculatePrice = function(){
      let pair = $scope.currency.sell.selected.shortName + '|' + $scope.currency.get.selected.shortName;
      exchangeFactory.calculateCurrency(pair, $scope.input.sell).then(function(r){
        $scope.input.get = r.data.ClientReceived;
        $scope.loading = false;
      }, function(er){
        console.log(er);
      });
    };

    $scope.changeSellCurrency = function(currency) {
      $scope.currency.sell.selected = currency;
      calculatePrice();
    };

    $scope.changeGetCurrency = function(currency) {
      $scope.currency.get.selected = currency;
      calculatePrice();
    };

    formInput.addEventListener('keydown', function(e){
      if(numberRegex.test(e.key) || e.key === "Backspace") {
        clearTimeout(typingTimer);
      } else if(e.keyCode !== "ArrowRight" || e.keyCode !== "ArrowLeft") {
        e.preventDefault();
      }
    });

    formInput.addEventListener('keyup', function(e){
      $scope.loading = true;
      if(numberRegex.test(e.key) || e.key === "Backspace") {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(calculatePrice, timeForTypeInSeconds);
      } else if(e.keyCode != "ArrowRight" || e.keyCode != "ArrowLeft"){
        e.preventDefault();
      };
    });

    $scope.$watch('input.sell', function(val){
      if($scope.initFirstTime) {
        $scope.initFirstTime = false;
        return; 
      } else if(val == 0 || val == ''){
        $scope.input.get = 0;
        return;
      } else {
        //calculatePrice();
      }
    });

    $scope.openRegisterPopup = false;
    $scope.submit = function(){
      $rootScope.$emit('open:registerPopup');
    };

    $scope.positons = function(){
      $scope.input.sell = $scope.input.get;
    };

};

export default exchangeFormCtrl;
  