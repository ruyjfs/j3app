//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('scrum').controller('TeamSaveCtrl', [ '$scope', '$timeout', '$mdSidenav', '$mdUtil', '$log', '$meteor', '$rootScope', '$mdDialog', 'id',
    function ($scope, $timeout, $mdSidenav, $mdUtil, $log, $meteor, $rootScope, $mdDialog, id) {

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

        if (id) {
            //$scope.teste = $meteor.collection( function() {
            //    return Team.findOne(id);
            //});
            $scope.teamForm = $meteor.object(Team, id, false);
            //$scope.teamForm = {};
            //console.log(id);
            //console.log($scope.teste);
        } else {
            $scope.teamForm = {};
        }

        $scope.save = function (){
            //$meteor.call('teamSave', $scope.teamForm).then(
            //    function(data){
            //        console.log('success inviting', data);
            //    },
            //    function(err){
            //        console.log('failed', err);
            //    }
            //);
            if(
                $scope.teamForm.name,
                $scope.teamForm.time,
                $scope.teamForm.members
            ){

                if (id) {
                    $scope.teamForm.save();
                } else {
                    Team.insert($scope.teamForm);
                }
                $scope.teamForm = '';
                $mdDialog.hide();
            }
        }

        $scope.close = function () {
            $mdDialog.hide();
        }
    }
]);