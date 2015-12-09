//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('scrum').controller('LoginModalCtrl', [ '$scope', '$timeout', '$mdSidenav', '$mdUtil', '$log', '$meteor', '$rootScope', '$mdDialog', 'id',
    function ($scope, $timeout, $mdSidenav, $mdUtil, $log, $meteor, $rootScope, $mdDialog, id) {
        //var vm = this;

        $scope.dataForm = {
            email: '',
            password: ''
        };

        $scope.error = '';

        $scope.login = function () {
            $meteor.loginWithPassword($scope.dataForm.email, $scope.dataForm.password).then(
                function () {
                    $state.go('scrum/project');
                },
                function (err) {
                    $scope.error = 'Login error - ' + err;
                }
            );
        };

        //vm.title = 'Scrum';

        $scope.close = function () {
            $mdDialog.hide();
        }
    }
]);