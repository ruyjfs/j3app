//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('scrum').controller('StoryCtrl', [ '$scope', '$mdDialog', '$mdSidenav', '$mdUtil', '$log', '$reactive', '$stateParams',
    function ($scope, $mdDialog, $mdSidenav, $mdUtil, $log, $reactive, $stateParams) {
        $reactive(this).attach($scope);

        this.subscribe('story');
        $scope.helpers({
            stories: function () {
                return Story.find({$or: [{projectId: $stateParams.id}, {projectId: null}]});
            }
        });

        $scope.modalSave = function(ev, id){
            $mdDialog.show({
                controller: 'StorySaveCtrl',
                templateUrl: 'module/scrum/client/view/story-save.ng.html',
                clickOutsideToClose:true,
                locals: {id: id},
                targetEvent: ev
            });
        };
}]);