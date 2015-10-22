//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('scrum').controller('TeamSaveCtrl', [ '$scope', '$timeout', '$mdSidenav', '$mdUtil', '$log', '$meteor', '$rootScope', '$mdDialog',
    function ($scope, $timeout, $mdSidenav, $mdUtil, $log, $meteor, $rootScope, $mdDialog) {
        $scope.title = 'Scrum';

        $scope.members = $meteor.collection(Meteor.users, false).subscribe('users');
        $scope.times = [
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9
        ];

console.log($scope.members);
        $scope.teamForm = {};
        $scope.save = function () {
            if($scope.teamForm.name){
                //$scope.teamForm.members = [
                //    {
                //        'userId' : $rootScope.currentUser._id,
                //        'perfil' : 'Admin'
                //    }
                //];
                //teams.push($scope.teamForm);
                Team.insert($scope.teamForm);
                $scope.teamForm = '';
                $mdDialog.hide();
            }
        }

        $scope.close = function () {
            $mdDialog.hide();
        }
    }
]);