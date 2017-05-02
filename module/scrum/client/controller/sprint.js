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
                    $stateParams.id,
                    {},
                    this.getReactively('searchText')
                ]
            }
        );
        this.total = function() {
            return Counts.get('totalSprint');
        };
        this.pageChanged = function(newPage) {
            this.page = newPage;
        };
        this.sortChange = function(sort) {
            this.sort = {
                number: parseInt(sort)
            };
        };
        this.helpers({
            sprints: function () {
                return Sprint.find({},
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
            }
        });

        this.modalSave = function(ev, id){
            $mdDialog.show({
                controller: 'SprintSaveCtrl',
                templateUrl: 'module/scrum/client/view/sprint-save.ng.html',
                clickOutsideToClose:true,
                locals: {id: id},
                targetEvent: ev
            });
        };
});