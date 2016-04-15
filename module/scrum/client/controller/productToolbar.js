//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('scrum').controller('ProductToolbarCtrl', ['$scope', '$mdDialog', '$stateParams', '$reactive', '$state', '$timeout', '$rootScope',
    function ($scope, $mdDialog, $stateParams, $reactive, $state, $timeout, $rootScope) {
        $reactive(this).attach($scope);

        if (!$stateParams.id) {
            $state.go('scrum');
        }

        this.id = $stateParams.id;
        this.sprintId = $stateParams.sprintId;
        this.subscribe('sprint');
        sprint = Sprint.findOne($stateParams.sprintId);
        if (sprint) {
            $rootScope.titleMiddle = ' (' + sprint.number + ') ' + moment(sprint.dateStart).format('L') + ' - ' + moment(sprint.dateEnd).format('L');
        }
        console.info(sprint);

        $scope.modalNoteSave = function (ev, id, storyId) {
            $mdDialog.show({
                controller: 'NoteSaveCtrl',
                templateUrl: 'module/scrum/client/view/note-save.ng.html',
                clickOutsideToClose: true,
                targetEvent: ev,
                locals: {
                    id: id,
                    storyId: storyId
                }
            }).then(function (answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function () {
                $scope.status = 'You cancelled the dialog.';
            });
        };

        $scope.modalStorySave = function (ev, id) {
            $mdDialog.show({
                controller: 'StorySaveCtrl',
                templateUrl: 'module/scrum/client/view/story-save.ng.html',
                clickOutsideToClose: true,
                locals: {id: id},
                targetEvent: ev
            });
        };

        $scope.modalStatusSave = function (ev, id) {
            $mdDialog.show({
                controller: 'StatusSaveCtrl',
                templateUrl: 'module/scrum/client/view/status-save.ng.html',
                clickOutsideToClose: true,
                locals: {'id': id},
                targetEvent: ev
            }).then(function (answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function () {
                $scope.status = 'You cancelled the dialog.';
            });
        };
    }]);