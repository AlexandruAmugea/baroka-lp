headerController.$inject = ['$scope', '$rootScope'];
function headerController ($scope, $rootScope) {
    $scope.howItWorks = function(){
        $rootScope.$emit('open:howItWorks');
      };
};

export default headerController;
  