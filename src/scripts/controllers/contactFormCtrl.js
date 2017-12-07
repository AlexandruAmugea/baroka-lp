contactFormCtrl.$inject = ['$scope', '$http'];
function contactFormCtrl ($scope, $http) {
    $scope.formSent = false;
    $scope.loading = false;
    $scope.contact = {};

    $scope.submitContact = function(){
        $scope.loading = true;
        $http.post("/contact-form", $scope.contact).then(function(r){
            if(r.status === 200) {
                $scope.formSent = true;
                $scope.loading = false;
            } else {
                $scope.formSent = false;
                $scope.loading = false;
            }
        }, function(er){
            $scope.formSent = false;
            $scope.loading = false;
        });
    };

};

export default contactFormCtrl;
  