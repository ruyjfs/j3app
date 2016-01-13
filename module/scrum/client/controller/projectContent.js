//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('scrum').controller('ProjectContentCtrl', [ '$scope', '$mdDialog', '$stateParams', '$reactive', '$state',
    function ($scope, $mdDialog, $stateParams, $reactive, $state) {
        $reactive(this).attach($scope);

        //$scope.title = 'Scrum';

        if (!$stateParams.id) {
            $state.go('scrum');
        }

        //Meteor.subscribe('project');
        //$scope.helpers({
        //    project: function () {
        //        return Project.findOne($stateParams.id);
        //    }
        //});

//console.log($rootScope.currentUser._id);
//console.log($rootScope.currentUser);

        this.modalNoteSave = function(ev, id){
            $mdDialog.show({
                controller: 'NoteSaveCtrl',
                templateUrl: 'module/scrum/client/view/note-save.ng.html',
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

        this.modalStorySave = function(ev, id){
            $mdDialog.show({
                controller: 'StorySaveCtrl',
                templateUrl: 'module/scrum/client/view/story-save.ng.html',
                clickOutsideToClose:true,
                locals: {id: id},
                targetEvent: ev
            });
        };

        this.modalStatusSave = function(ev, id){
            $mdDialog.show({
                controller: 'StatusSaveCtrl',
                templateUrl: 'module/scrum/client/view/status-save.ng.html',
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