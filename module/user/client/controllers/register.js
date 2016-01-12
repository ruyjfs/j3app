angular.module("socially").controller("RegisterCtrl", ['$scope', '$reactive', '$state',
    function ($scope, $reactive, $state) {
        $reactive(this).attach($scope);

        $scope.credentials = {
            email: '',
            password: ''
        };

        $scope.error = '';

        $scope.register = function () {
            Accounts.createUser($scope.credentials, function(err) {
                if (err) {
                    $scope.error = 'Registration error - ' + err;
                } else {
                    $state.go('scrum');
                }
            });
        }
    }
]);