//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('scrum').controller('StatusSaveCtrl', [ '$scope', '$timeout', '$mdSidenav', '$mdUtil', '$log', '$meteor', '$rootScope', '$mdDialog',
    function ($scope, $timeout, $mdSidenav, $mdUtil, $log, $meteor, $rootScope, $mdDialog) {
        //$scope.teams = $meteor.collection(Meteor.team, false).subscribe('team');
        $scope.projects = $meteor.collection( function() {
            return Project.find(
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
                Status.insert($scope.form);
                $scope.form = '';
                $mdDialog.hide();
            }
        }

        $scope.close = function () {
            $mdDialog.hide();
        }
    }
]);