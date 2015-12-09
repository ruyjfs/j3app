//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('scrum').controller('ProjectContentCtrl', [ '$scope', '$mdDialog', '$mdSidenav', '$mdUtil', '$log', '$meteor', '$rootScope',
    function ($scope, $mdDialog, $mdSidenav, $mdUtil, $log, $meteor, $rootScope) {
        //$scope.title = 'Scrum';

        $meteor.subscribe('project');
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
//console.log($rootScope.currentUser._id);
//console.log($rootScope.currentUser);


        $scope.remove = function(id) {
            $scope.projects.remove(id);
        }

        $scope.modalNoteSave = function(ev, id){
            $mdDialog.show({
                controller: 'NoteSaveCtrl',
                templateUrl: 'client/module/scrum/view/note-save.ng.html',
                clickOutsideToClose: true,
                targetEvent: ev,
                locals:
                {
                    id: id
                }
            }).then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });
        };

        $scope.modalStorySave = function(ev, id){
            $mdDialog.show({
                controller: 'StorySaveCtrl',
                templateUrl: 'client/module/scrum/view/story-save.ng.html',
                clickOutsideToClose:true,
                locals: {id: id},
                targetEvent: ev
            });
        };

        $scope.modalStatusSave = function(ev, id){
            $mdDialog.show({
                controller: 'StatusSaveCtrl',
                templateUrl: 'client/module/scrum/view/status-save.ng.html',
                clickOutsideToClose:true,
                locals: {'id': id},
                targetEvent: ev
            }).then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });
        };
}]);