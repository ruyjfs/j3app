//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('user').controller('LoginModalCtrl', [ '$scope', '$timeout', '$mdSidenav', '$mdUtil', '$log', '$rootScope', '$mdDialog', '$state', '$reactive',
    function ($scope, $timeout, $mdSidenav, $mdUtil, $log, $rootScope, $mdDialog, $state, $reactive) {
        $reactive(this).attach($scope);

        $scope.dataForm = {
            name: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: ''
        };

        $scope.error = '';

        $scope.login = function () {
            Meteor.loginWithPassword(this.dataForm.email, this.dataForm.password, function(err) {
                if (err) {
                    this.error = err;
                } else {
                    $mdDialog.hide();
                    $state.go('scrum/project');
                }
            });
        };

        $scope.reset = function () {
            Meteor.forgotPassword($scope.dataForm.email).then(
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
                Meteor.createUser($scope.dataForm).then(
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