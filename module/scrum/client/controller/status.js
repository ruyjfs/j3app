//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('scrum').controller('StatusCtrl', [ '$scope', '$mdDialog', '$mdSidenav', '$mdUtil', '$log', '$reactive', '$stateParams',
    function ($scope, $mdDialog, $mdSidenav, $mdUtil, $log, $reactive, $stateParams) {
        reactiveContext = $reactive(this).attach($scope);
        //$scope.title = 'Scrum';

        if (!$stateParams.id) {
            $state.go('scrum');
        }

        this.subscribe('status');
        $scope.helpers({
            states: function () {
                return Status.find({$or: [{projectId: $stateParams.id}, {projectId: null}]});
            }
        });

        $scope.modalSave = function(ev, id){
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