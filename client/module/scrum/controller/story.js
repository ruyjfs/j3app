//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('scrum').controller('StoryCtrl', [ '$scope', '$mdDialog', '$mdSidenav', '$mdUtil', '$log', '$meteor', '$rootScope',
    function ($scope, $mdDialog, $mdSidenav, $mdUtil, $log, $meteor, $rootScope) {

        $meteor.subscribe('story');
        $scope.stories = $meteor.collection( function() {
            return Story.find({});
        });

        $scope.modalSave = function(ev, id){
            $mdDialog.show({
                controller: 'StorySaveCtrl',
                templateUrl: 'client/module/scrum/view/story-save.ng.html',
                clickOutsideToClose:true,
                locals: {id: id},
                targetEvent: ev
            });
        };
}]);