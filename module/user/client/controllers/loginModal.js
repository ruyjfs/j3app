//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('user').controller('LoginModalCtrl', [ '$scope', '$timeout', '$mdSidenav', '$mdUtil', '$log', '$meteor', '$rootScope', '$mdDialog', '$state',
    function ($scope, $timeout, $mdSidenav, $mdUtil, $log, $meteor, $rootScope, $mdDialog, $state) {
        //var vm = this;

        $scope.dataForm = {
            name: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: ''
        };

        $scope.error = '';

        $scope.login = function () {
            $meteor.loginWithPassword($scope.dataForm.email, $scope.dataForm.password).then(
                function () {
                    $mdDialog.hide();
                    $state.go('scrum/project');
                },
                function (err) {
                    $scope.error = 'Login error - ' + err;
                }
            );
        };

        $scope.reset = function () {
            $meteor.forgotPassword($scope.dataForm.email).then(
                function () {
                    $mdDialog.hide();
                    $state.go('scrum/project');
                },
                function (err) {
                    $scope.error = 'Error sending forgot password email - ' + err;
                }
            );
        };

        $scope.register = function () {

            if (!$scope.dataForm.name || !$scope.dataForm.lastName) {
                $scope.error = 'Registration error - Inform you name';
            } else if ($scope.dataForm.password == $scope.dataForm.confirmPassword) {
                $meteor.createUser($scope.dataForm).then(
                    function () {
                        //$scope.teamForm = $meteor.object(Team, id, false);
                        $mdDialog.hide();
                        $state.go('scrum/project');
                    },
                    function (err) {
                        $scope.error = 'Registration error - ' + err;
                    }
                );
            } else {
                $scope.error = 'Registration error - Confirm password!';
            }
        };

        //vm.title = 'Scrum';

        $scope.close = function () {
            $mdDialog.hide();
        }
    }
]);