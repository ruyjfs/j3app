//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('scrum').controller('StoryCtrl', [ '$scope', '$reactive', '$stateParams',
    function ($scope, $reactive, $stateParams) {
        $reactive(this).attach($scope);


        this.id = $stateParams.id;
        this.sprintId = $stateParams.sprintId;

        this.perPage = 5;
        this.page = 1;
        this.sort = {
            name: 1
        };

        this.searchText = '';
        this.subscribe('story', function(){
                return [
                    $stateParams.id,
                    {},
                    this.getReactively('searchText')
                ]
            }
        );
        this.total = function() {
            return Counts.get('totalStory');
        };
        this.pageChanged = function(newPage) {
            this.page = newPage;
        };
        this.sortChange = function(sort) {
            this.sort = {
                name: parseInt(sort)
            };
        };
        this.helpers({
            stories: function () {
                return Story.find({},
                    {
                        limit: parseInt(this.getReactively('perPage')),
                        skip: parseInt((this.getReactively('page') - 1) * this.getReactively('perPage')),
                        sort: this.getReactively('sort')
                    }
                );
            }
        });
}]);