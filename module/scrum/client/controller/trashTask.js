//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('scrum').controller('TrashTaskCtrl', [ '$scope', '$reactive', '$stateParams', '$mdDialog',
    function ($scope, $reactive, $stateParams, $mdDialog) {
        $reactive(this).attach($scope);


        this.id = $stateParams.id;
        this.sprintId = $stateParams.sprintId;

        this.perPage = 5;
        this.page = 1;
        this.sort = {
            name: 1
        };

        this.searchText = '';
        this.subscribe('note', function(){
                return [
                    $stateParams.id,
                    {},
                    this.getReactively('searchText'),
                    true
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
            notes: function () {
                return Note.find({trash: true},
                    {
                        limit: parseInt(this.getReactively('perPage')),
                        skip: parseInt((this.getReactively('page') - 1) * this.getReactively('perPage')),
                        sort: this.getReactively('sort')
                    }
                );
            }
        });

        this.trash = function($id){
            Meteor.call('noteTrash', {id: $id, trash: false}, function (error) {
                if (error) {
                    Materialize.toast('Erro: ' + error, 4000);
                } else {
                    Materialize.toast('Restored successfully!', 4000);
                }
            });
        };
}]);