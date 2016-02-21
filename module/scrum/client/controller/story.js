//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('scrum').controller('StoryCtrl', [ '$scope', '$reactive', '$stateParams',
    function ($scope, $reactive, $stateParams) {
        $reactive(this).attach($scope);

        Meteor.subscribe('story');
        this.helpers({
            stories: function () {
                return Story.find({$or: [{projectId: $stateParams.id}, {projectId: null}]});
            }
        });
}]);