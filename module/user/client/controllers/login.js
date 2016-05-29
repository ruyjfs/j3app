angular.module("user").controller("LoginCtrl", ['$state',
    function ($state) {
        var vm = this;

        vm.credentials = {
            email: '',
            password: ''
        };

        vm.error = '';

        vm.login = function () {
            $meteor.loginWithPassword(vm.credentials.email, vm.credentials.password).then(
                function () {
                    $state.go('scrum/product');
                },
                function (err) {
                    vm.error = 'Login error - ' + err;
                }
            );
        };
    }
]);