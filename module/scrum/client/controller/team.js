angular.module('scrum').controller('TeamCtrl', [ '$scope', '$mdDialog', '$mdUtil', '$log', '$reactive', '$stateParams',
    function ($scope, $mdDialog, $mdUtil, $log, $reactive, $stateParams) {
        $reactive(this).attach($scope);

        this.perPage = 5;
        this.page = 1;
        this.sort = {
            name: 1
        };

        this.teamSearchText = '';
        this.subscribe('organization');
        this.subscribe('team');
        this.helpers({
            organizationId: function(){
                var id = 'organization';
                if ($stateParams.organization !== 'organization') {
                    var organization = Organization.findOne({$or: [{_id: $stateParams.organization}, {namespace: $stateParams.organization}]});
                    if (organization) {
                        id = organization._id;
                    } else {
                        id = $stateParams.organization;
                    }
                }
                return id;
            },
            teams: function() {
                var organizationId = this.getReactively('organizationId');
                if (organizationId) {
                    where = {organization: organizationId};
                } else {
                    where = {$or: [{organization: null}, {organization: ''}]};
                }
                strSearch = this.getReactively('teamSearchText');
                selector = {};
                if (typeof strSearch === 'string' && strSearch.length) {
                    selector = {
                        $and: [
                            where,
                            {
                                $or: [
                                    {name: {$regex:  `.*${strSearch}.*`, $options : 'i' }},
                                ]
                            }
                        ]
                    }
                } else {
                    selector = where;
                }

                return Team.find(selector, {
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
