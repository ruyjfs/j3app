angular.module('scrum').controller('StatusCtrl', [ '$scope', '$mdDialog', '$reactive', '$stateParams',
    function ($scope, $mdDialog, $reactive, $stateParams) {
        $reactive(this).attach($scope);
        if (!$stateParams.id) {
            $state.go('scrum');
        }

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
                    this.getReactively('searchText')
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
                return Status.find({},
                    {
                        limit: parseInt(this.getReactively('perPage')),
                        skip: parseInt((this.getReactively('page') - 1) * this.getReactively('perPage')),
                        sort: this.getReactively('sort')
                    }
                );
            }
        });
    }
]);