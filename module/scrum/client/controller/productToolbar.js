//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('scrum').controller('ProductToolbarCtrl', ['$scope', '$mdDialog', '$stateParams', '$reactive', '$state', '$timeout', '$rootScope', '$location',
    function ($scope, $mdDialog, $stateParams, $reactive, $state, $timeout, $rootScope, $location) {
        $reactive(this).attach($scope);

        if (!$stateParams.id) {
            $state.go('scrum');
        }

        this.id = $stateParams.id;
        this.sprintId = $stateParams.sprintId;

        this.subscribe('users');
        this.subscribe('project');
        this.subscribe('team');
        //this.subscribe('status', function(){return [$stateParams.id]});
        //this.subscribe('note', function(){return [$stateParams.id]});
        //this.subscribe('story', function(){return [$stateParams.id]});
        this.subscribe('sprint', function(){return [$stateParams.id]});
        $scope.helpers({
            sprint: function () {
                dateNow = moment().format('x');
                if ($stateParams.sprintId == '1' || $stateParams.sprintId == '') {
                    sprint = Sprint.findOne(
                        {
                            $and: [
                                {projectId: $stateParams.id},
                                {dateStart: {$lte: dateNow}, dateEnd: {$gte: dateNow}}
                            ]
                        }
                    );
                    if (!sprint) {
                        dateNow = moment()._d;
                        sprint = Sprint.findOne(
                            {
                                $and: [
                                    {projectId: $stateParams.id},
                                    {dateStart: {$lte: dateNow}, dateEnd: {$gte: dateNow}}
                                ]
                            }
                        );
                    }
                } else {
                    sprint = Sprint.findOne($stateParams.sprintId);
                }

                if (sprint) {
                    project = Project.findOne($stateParams.id);

                    if (typeof(sprint.dateStart) === 'string') {
                        sprint.dateStartTreated = moment(sprint.dateStart, 'x').format('L');
                        sprint.dateEndTreated = moment(sprint.dateEnd, 'x').format('L');
                        sprint.days = moment(sprint.dateEnd, 'x').diff(moment(sprint.dateStart, 'x'), 'days') + 1;
                    } else {
                        sprint.dateStartTreated = moment(sprint.dateStart).format('L');
                        sprint.dateEndTreated = moment(sprint.dateEnd).format('L');
                        sprint.days = moment(sprint.dateEnd).diff(moment(sprint.dateStart), 'days') + 1;
                    }

                    if (project && project.skipWeekend) {
                        if (typeof(sprint.dateStart) === 'string') {
                            sprint.daysBusiness = moment(sprint.dateEnd, 'x').businessDiff(moment(sprint.dateStart, 'x'), 'days');
                        } else {
                            sprint.daysBusiness = moment(sprint.dateEnd).businessDiff(moment(sprint.dateStart), 'days');
                        }
                        sprint.days = sprint.daysBusiness;
                    }
                    if (project && project.teams) {
                        teams = Team.find({_id: {$in: project.teams}}).fetch().map(function (team) {
                            if (team.members) {
                                team.members = Meteor.users.find({_id: {$in: team.members}}).fetch();
                                team.membersTotal = team.members.length;
                                team.timeTotal = team.membersTotal * team.time;
                            }
                            return team;
                        });
                    } else {
                        teams = [];
                    }

                    if (teams) {
                        timeTotal = 0;
                        teams.forEach(function (value) {
                            if (isInt(parseInt(value.timeTotal))) {
                                timeTotal = parseInt(value.timeTotal) + timeTotal;
                            }
                        });

                        sprint.timeTotal = timeTotal * sprint.days;
                    } else {
                        sprint.timeTotal = 0;
                    }

                    notes = Note.find({
                        $and: [{sprintId: $stateParams.sprintId}],
                        $or: [{projectId: $stateParams.id}, {projectId: null}]
                    }).fetch();
                    notes.map(function (note) {
                        note.story = Story.findOne(note.story);
                        note.owner = Meteor.users.findOne(note.owner);
                        if (note.statusId == '1') {
                            note.color = '#dbdbdb';
                        } else {
                            if (note.story) {
                                note.color = note.story.color;
                            } else {
                                note.story = '#000';
                            }
                        }
                        return note;
                    });

                    if (notes) {
                        timeTotal = 0;
                        notes.forEach(function (value) {
                            //console.log(value);
                            if (isInt(parseInt(value.time))) {
                                timeTotal = parseInt(value.time) + timeTotal;
                            }
                        });
                        sprint.timeTotalNotes = timeTotal;
                    } else {
                        sprint.timeTotalNotes = 0;
                    }

                    notesDone = Note.find({
                        $and: [{sprintId: $stateParams.sprintId}, {statusId: '1'}],
                        $or: [{projectId: $stateParams.id}, {projectId: null}]
                    }).fetch();
                    //console.log(notesDone);
                    if (notesDone) {
                        timeTotal = 0;
                        notesDone.forEach(function (value) {
                            //console.log(value);
                            if (isInt(parseInt(value.time))) {
                                timeTotal = parseInt(value.time) + timeTotal;
                            }
                        });
                        sprint.timeTotalNotesDone = timeTotal;
                    } else {
                        sprint.timeTotalNotesDone = 0;
                    }

                    //console.log('sprint.timeTotalNotesDone');
                    //console.log(sprint.timeTotalNotesDone);
                    //console.log(sprint.timeTotal);
                    //console.log(sprint.timeTotalNotes);

                    //if (sprint && sprint.timeTotalNotesDone && sprint.timeTotalNotes && sprint.timeTotal) {
                    sprint.progressDone = sprint.timeTotalNotesDone * 100 / sprint.timeTotal;
                    sprint.progress = sprint.timeTotalNotes * 100 / sprint.timeTotal;
                    //} else {
                    //    sprint.progressDone = 0;
                    //    sprint.progress = 0;
                    //}
                    //console.log(sprint.dateStart);
                    //console.log(sprint.progress);
                    if (typeof(sprint.dateStart) === 'string') {
                        $rootScope.titleMiddle = ' (' + sprint.number + ') ' + moment(sprint.dateStart, 'x').format('L') + ' - ' + moment(sprint.dateEnd, 'x').format('L');
                    } else {
                        $rootScope.titleMiddle = ' (' + sprint.number + ') ' + moment(sprint.dateStart).format('L') + ' - ' + moment(sprint.dateEnd).format('L');
                    }
                    //sprint.hoursMember = project.ti;
                }

                $rootScope.sprint = sprint;
                return sprint;
            },
        });


        var organization = $stateParams.organization;

        if (typeof organization == 'undefined') {
            organization = 0;
        }

        this.menus = [
            {name: 'Organization', link: '/scrum/organization', icon: 'location_city',   class: ''},
            {name: 'Product',      link: '/scrum/organization/' + organization + '/product',      icon: 'business_center',      class: ''},
            {name: 'Team',         link: '/scrum/organization/' + organization + '/team',         icon: 'group_work', class: ''},
            {name: 'Members',      link: '/scrum/product-team/'+this.id+'/'+this.sprintId,     icon: 'group',   class: ''},
            {name: 'Burndown',  link: '/scrum/burndown/'+this.id+'/'+this.sprintId, icon: 'trending_down',       class: ''},
            {name: 'Planning Poker',   link: '/scrum/planning-poker/'+this.id+'/'+this.sprintId,  icon: 'style', class: ''},
            {name: 'Kanban',    link: '/scrum/kanban/'+this.id+'/'+this.sprintId,   icon: 'view_column',     class: ''},
            {name: 'Backlog',   link: '/scrum/backlog/'+this.id+'/'+this.sprintId,  icon: 'developer_board', class: ''},
            {name: 'Story',     link: '/scrum/story/'+this.id+'/'+this.sprintId,    icon: 'content_paste',   class: ''},
            {name: 'Status',    link: '/scrum/status/'+this.id+'/'+this.sprintId,   icon: 'flag',           class: ''},
            {name: 'Sprint',    link: '/scrum/sprint/'+this.id+'/'+this.sprintId,   icon: 'date_range',      class: ''},
            {name: 'Trash',     link: '/scrum/trash/'+this.id+'/'+this.sprintId,   icon: 'delete',      class: ''},
            //{name: 'Burndown',  link: '/scrum/burndown/'+this.id+'/'+this.sprintId, icon: 'show_chart',       class: ''},
            //{name: 'Product',   link: '/scrum/product', icon: 'business_center'}
        ];
        if ($location.path()) {
            arrUrl = $location.path().split('/');
            urlModule = arrUrl[2];
        }
        this.menus.map(function(menu){
            links = menu.link.split('/');
            if (urlModule == links[2] || (urlModule == 'productkanban' && links[2] == 'kanban')) {
                menu.class = 'active active-margin'
            }
            return menu;
        });

        $scope.modalNoteSave = function (ev, id, storyId) {
            $mdDialog.show({
                controller: 'NoteSaveCtrl',
                templateUrl: 'module/scrum/client/view/note-save.ng.html',
                clickOutsideToClose: true,
                targetEvent: ev,
                locals: {
                    id: id,
                    storyId: storyId
                }
            }).then(function (answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function () {
                $scope.status = 'You cancelled the dialog.';
            });
        };

        $scope.modalStorySave = function (ev, id) {
            $mdDialog.show({
                controller: 'StorySaveCtrl',
                templateUrl: 'module/scrum/client/view/story-save.ng.html',
                clickOutsideToClose: true,
                locals: {id: id},
                targetEvent: ev
            });
        };

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
    }]);