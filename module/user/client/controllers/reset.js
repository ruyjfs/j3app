angular.module("user").controller("ResetCtrl", ['$scope', '$reactive', '$state',
    function ($scope, $reactive, $state) {
        $reactive(this).attach($scope);

        $scope.credentials = {
            email: ''
        };

        $scope.error = '';

        $scope.reset = function () {
            Accounts.forgotPassword($scope.credentials, function(err){
                if (err) {
                    $scope.error = 'Error sending forgot password email - ' + err;
                } else {
                    $state.go('scrum/product');
                }
            });
        };
    }
]);