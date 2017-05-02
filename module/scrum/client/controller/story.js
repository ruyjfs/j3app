angular.module('scrum').controller('StoryCtrl',
    function ($scope, $reactive, $stateParams, $mdDialog) {
        $reactive(this).attach($scope);

        $scope.booLoading = false;
        $('#progressBar').fadeOut('slow');

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
                    this.getReactively('searchText'),
                    false
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

        this.modalStorySave = function (ev, id) {
            $mdDialog.show({
                controller: 'StorySaveCtrl',
                templateUrl: 'module/scrum/client/view/story-save.ng.html',
                clickOutsideToClose: true,
                locals: {id: id},
                targetEvent: ev
            });
        };

        this.trash = function($id){
            Meteor.call('storyTrash', {id: $id, trash: true}, function (error) {
                if (error) {
                    Materialize.toast('Erro: ' + error, 4000);
                } else {
                    Materialize.toast('Deleted successfully!', 4000);
                }
            });
        };
});