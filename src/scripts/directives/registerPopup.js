const registerPopUpTpl = require('raw-loader!../views/registerPopUpTpl.html');

directiveCtrl.$inject = ['$scope', '$rootScope'];
function directiveCtrl ($scope, $rootScope) {
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

};

function registerPopup() {
    return {
        scope: {},
        restrict: "AE",
        template: registerPopUpTpl,
        controller: directiveCtrl
    };
};

export default registerPopup;