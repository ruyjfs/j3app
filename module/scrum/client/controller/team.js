angular.module('scrum').controller('TeamCtrl', [ '$scope', '$mdDialog', '$mdUtil', '$log', '$reactive',
    function ($scope, $mdDialog, $mdUtil, $log, $reactive) {
        $reactive(this).attach($scope);

        this.perPage = 5;
        this.page = 1;
        this.sort = {
            name: 1
        };

        this.searchText = '';
        this.subscribe('team', function(){
                return [{}, this.getReactively('searchText')
                ]
            }
        );
        this.helpers({
            teams: function() {
                return Team.find({}, {

                    limit: parseInt(this.getReactively('perPage')),
                    skip: parseInt((this.getReactively('page') - 1) * this.getReactively('perPage')),
                    sort: this.getReactively('sort')
                });
            }
        });

        this.total = function() {
            return Counts.get('totalTeam');
        };
        this.pageChanged = function(newPage) {
            this.page = newPage;
        };
        this.sortChange = function(sort) {
            this.sort = {
                name: parseInt(sort)
            };
        };

        $scope.remove = function(team) {
            this.teams.remove(team);
        };

        $scope.modalSave = function(ev, id){
            $mdDialog.show({
                controller: 'TeamSaveCtrl',
                templateUrl: 'module/scrum/client/view/team-save.ng.html',
                clickOutsideToClose:true,
                locals : {
                    id: id
                },
                targetEvent: ev
            }).then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });
        };
}]);
