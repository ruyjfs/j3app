//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('scrum').controller('ProjectSaveCtrl', [ '$scope', '$timeout', '$mdSidenav', '$mdUtil', '$log', '$meteor', '$rootScope', '$mdDialog',
    function ($scope, $timeout, $mdSidenav, $mdUtil, $log, $meteor, $rootScope, $mdDialog) {
        $scope.title = 'Project';


        //$scope.teams = $meteor.collection(Meteor.team, false).subscribe('team');
        $scope.teams = $meteor.collection( function() {
            return Team.find(
                {
                    //$or: [
                    //    {
                    //        'userId' : $rootScope.currentUser._id,
                    //        'friendId' : friendId
                    //    }
                    //    ,
                    //    {
                    //        'userId' : friendId,
                    //        'friendId' : $rootScope.currentUser._id
                    //    }
                    //]
                }
            );
        });
        $scope.weeks = [
            1,
            2,
            3,
            4
        ];

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
                Project.insert($scope.form);
                $scope.form = '';
                $mdDialog.hide();
            }
        }

        $scope.close = function () {
            $mdDialog.hide();
        }
    }
]);