//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('scrum').controller('StoryCtrl', [ '$scope', '$mdDialog', '$mdSidenav', '$mdUtil', '$log', '$reactive',
    function ($scope, $mdDialog, $mdSidenav, $mdUtil, $log, $reactive) {
        $reactive(this).attach($scope);

        this.subscribe('story');
        $scope.helpers({
            stories: function () {
                return Story.find({});
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