//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('scrum').controller('SprintCtrl', [ '$scope', '$mdDialog', '$mdSidenav', '$mdUtil', '$log', '$reactive', '$stateParams',
    function ($scope, $mdDialog, $mdSidenav, $mdUtil, $log, $reactive, $stateParams) {
        $reactive(this).attach($scope);

        this.subscribe('sprint');
        $scope.helpers({
            sprints: function () {
                return Sprint.find({$or: [{projectId: $stateParams.id}, {projectId: null}]});
            }
        });

        $scope.modalSave = function(ev, id){
            $mdDialog.show({
                controller: 'SprintSaveCtrl',
                templateUrl: 'module/scrum/client/view/sprint-save.ng.html',
                clickOutsideToClose:true,
                locals: {id: id},
                targetEvent: ev
            });
        };
}]);