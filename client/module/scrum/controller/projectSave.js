//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('scrum').controller('ProjectSaveCtrl', [ '$scope', '$timeout', '$mdSidenav', '$mdUtil', '$log', '$meteor', '$rootScope', '$mdDialog',
    function ($scope, $timeout, $mdSidenav, $mdUtil, $log, $meteor, $rootScope, $mdDialog) {
        $scope.title = 'Project';

        $scope.form = {};
        $scope.save = function () {
            if($scope.form.name){
                //$scope.teamForm.members = [
                //    {
                //        'userId' : $rootScope.currentUser._id,
                //        'perfil' : 'Admin'
                //    }
                //];
                //teams.push($scope.teamForm);
                Teams.insert($scope.form);
                $scope.form = '';
                $mdDialog.hide();
            }
        }

        $scope.close = function () {
            $mdDialog.hide();
        }
    }
]);