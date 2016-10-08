angular.module('scrum').controller('StatusCtrl', [ '$scope', '$mdDialog', '$reactive', '$stateParams',
    function ($scope, $mdDialog, $reactive, $stateParams) {
        $reactive(this).attach($scope);
        if (!$stateParams.product) {
            $state.go('scrum');
        }

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
                    false
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
        $scope.modalStatusSave = function (ev, id) {
            $mdDialog.show({
                controller: 'StatusSaveCtrl',
                templateUrl: 'module/scrum/client/view/status-save.ng.html',
                clickOutsideToClose: true,
                locals: {'id': id},
                targetEvent: ev
            }).then(function (answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function () {
                $scope.status = 'You cancelled the dialog.';
            });
        };

        this.trash = function($id){
            Meteor.call('statusTrash', {id: $id, trash: true}, function (error) {
                if (error) {
                    Materialize.toast('Erro: ' + error, 4000);
                } else {
                    Materialize.toast('Deleted successfully!', 4000);
                }
            });
        };
    }
]);