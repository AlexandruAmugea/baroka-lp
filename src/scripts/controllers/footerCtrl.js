footerCtrl.$inject = ['$scope', '$rootScope'];
function footerCtrl ($scope, $rootScope) {
    $scope.howItWorks = function(){
        $rootScope.$emit('open:howItWorks');
    };
  };
  
  export default footerCtrl;