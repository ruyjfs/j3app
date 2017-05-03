angular.module('scrum').controller('SprintCtrl',
    function ($scope, $mdDialog, $mdSidenav, $mdUtil, $log, $reactive, $stateParams) {
        $reactive(this).attach($scope);

        $scope.booLoading = false;
        $('#progressBar').fadeOut('slow');

        this.id = $stateParams.id;
        this.sprintId = $stateParams.sprintId;

        this.perPage = 5;
        this.page = 1;
        this.sort = {
            number: -1
        };

        this.searchText = '';
        this.subscribe('sprint', function(){
                return [
                    this.getReactively('productId'),
                    {},
                    this.getReactively('searchText')
                ]
            }
        );
        // this.total = function() {
        //     return Counts.get('totalSprint');
        // };
        this.pageChanged = function(newPage) {
            this.page = newPage;
        };
        this.sortChange = function(sort) {
            this.sort = {
                number: parseInt(sort)
            };
        };
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
            productId: function(){
                var organizationId = this.getReactively('organizationId');
                var id = 0;
                if (organizationId) {
                    if (organizationId === 'organization') {
                        product = Project.findOne($stateParams.product);
                    } else {
                        product = Project.findOne({$or: [{$and: [{organization: organizationId}, {namespace: $stateParams.product}]}, {_id: $stateParams.product}]});
                    }
                    if (product) {
                        id = $stateParams.id = product._id;
                    } else {
                        id = $stateParams.id;
                    }
                }
                return id;
            },
            sprintId: function() {
                var id = 0;
                var productId = this.getReactively('productId');
                if (productId) {
                    var sprint = Sprint.findOne({$or: [{$and: [{projectId: productId}, {number: parseInt($stateParams.sprint)}]}, {_id: $stateParams.sprint}]});
                    if (sprint) {
                        id = sprint._id;
                    } else {
                        id = $stateParams.sprint;
                    }
                }
                return id;
            },
            sprints: function () {
                return Sprint.find({projectId: this.getReactively('productId')},
                    {
                        limit: parseInt(this.getReactively('perPage')),
                        skip: parseInt((this.getReactively('page') - 1) * this.getReactively('perPage')),
                        sort: this.getReactively('sort')
                    }).map(function(sprint){
                    //sprint.dateStartTreated = moment(sprint.dateStart).format('x');
                    //sprint.dateEndTreated = moment.unix(sprint.dateStart).calendar('L');
                    //sprint.dateStartTreated = moment(new Date(sprint.dateStart)).format('L');
                    //sprint.dateStartTreated = moment(new Date(1454205600000).toISOString()).calendar('L');
                    //sprint.dateStartTreated = moment(new Date(sprint.dateStart)).format('L');
                    //console.log(new Date(1454205600000));
                    //console.log(sprint.dateStart);
                    //sprint.dateStartTreated = moment(new Date(1454205600000)).format('L');
                    //sprint.dateEndTreated = moment(new Date(sprint.dateEnd)).format('L');

                    if (typeof(sprint.dateStart) === 'string') {
                        sprint.dateStartTreated = moment(sprint.dateStart, 'x').format('L');
                    } else {
                        sprint.dateStartTreated = moment(sprint.dateStart).format('L');
                    }
                    if (typeof(sprint.dateEnd) === 'string') {
                        sprint.dateEndTreated = moment(sprint.dateEnd, 'x').format('L');
                    } else {
                        sprint.dateEndTreated = moment(sprint.dateEnd).format('L');
                    }

                    //$log.debug(sprint.dateEnd);
                    //sprint.dateStartTreated = moment(sprint.dateEnd).calendar('L');
                    //sprint.dateEndTreated = moment.unix(sprint.dateEnd).calendar('L');
                    return sprint;
                });
            },
            total: () => {
                let arrSprint = Sprint.find({projectId: this.getReactively('productId')}).fetch();
                if (arrSprint) {
                    return arrSprint.length;
                } else {
                    return 0;
                }
        }
        });

        this.modalSave = function(ev, id){
            $mdDialog.show({
                controller: 'SprintSaveCtrl as ctrl',
                templateUrl: 'module/scrum/client/view/sprint-save.ng.html',
                clickOutsideToClose:true,
                locals: {id: id},
                targetEvent: ev
            });
        };
});