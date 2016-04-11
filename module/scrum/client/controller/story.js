//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('scrum').controller('StoryCtrl', [ '$scope', '$reactive', '$stateParams',
    function ($scope, $reactive, $stateParams) {
        $reactive(this).attach($scope);

        this.subscribe('story', function(){return [$stateParams.id]});
        this.helpers({
            stories: function () {
                return Story.find({});
            }
        });
}]);