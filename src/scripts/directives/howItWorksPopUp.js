const howItWorksPopUpTpl = require('raw-loader!../views/howItWorksPopUpTpl.html');

directiveCtrl.$inject = ['$scope', '$rootScope'];
function directiveCtrl ($scope, $rootScope) {
    var body = document.getElementsByTagName('body')[0];
    var popUp = document.getElementsByClassName('pop-up-how--body')[0];
    var popUpWrapper = document.querySelector('.pop-up-how');
    var img = document.querySelector('.pop-up-how--body img');

    function calculateHeight(){
      var windowHeight = window.innerHeight;
      var windowWidth = window.innerWidth;
    
      popUp.style.height = windowHeight / 1.5 + 'px';
      img.style.height = windowHeight / 1.5 + 'px';
      img.style.width = 'auto';
      setTimeout(function(){
        var imgWidth = img.offsetWidth;
        var leftPopUp = (windowWidth - imgWidth)/2;
        popUpWrapper.style.left = leftPopUp + 'px';
      }, 200);
    }

    function scrollAndBlock(){
      window.scrollTo( 0, 0 );
      body.style.overflow = 'hidden'; 
    }

    function unblockBody(){
      document.getElementsByTagName('body')[0].style.overflow = 'auto'; 
    }

    $rootScope.$on('open:howItWorks', function(){
      calculateHeight();
      $scope.howopened = true;
      scrollAndBlock();
    });

    $scope.close = function(){
      $scope.howopened = !$scope.howopened;
      unblockBody();
    };

};

function howItWorksPopUp() {
    return {
        scope: {
            howopened: "@"
          },
        restric: "AE",
        template: howItWorksPopUpTpl,
        controller: directiveCtrl
    };
};

export default howItWorksPopUp;