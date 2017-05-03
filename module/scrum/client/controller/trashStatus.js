angular.module('scrum').controller('TrashStatusCtrl',
    function ($scope, $mdDialog, $reactive, $stateParams, $translate) {
        $reactive(this).attach($scope);
        $translate.use(Session.get('lang'));

        // if (!$stateParams.id) {
        //     $state.go('scrum');
        // }

        this.id = $stateParams.product;
        this.sprintId = $stateParams.sprintId;


        this.perPage = 5;
        this.page = 1;
        this.sort = {
            name: 1
        };

        this.searchText = '';
        this.subscribe('status', function(){
                return [
                    $stateParams.id,
                    {},
                    this.getReactively('searchText'),
                    true
                ]
            }
        );
        this.total = function() {
            return Counts.get('totalStatus');
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
            states: function () {
                return Status.find({trash: true},
                    {
                        limit: parseInt(this.getReactively('perPage')),
                        skip: parseInt((this.getReactively('page') - 1) * this.getReactively('perPage')),
                        sort: this.getReactively('sort')
                    }
                );
            }
        });

        this.trash = function($id){
            Meteor.call('statusTrash', {id: $id, trash: false}, function (error) {
                if (error) {
                    Materialize.toast('Erro: ' + error, 4000);
                } else {
                    Materialize.toast($translate.instant('Status sent to trash') + '!', 4000, 'rounded green accent-1 green-text text-darken-4');
                }
            });
        };
    }
);