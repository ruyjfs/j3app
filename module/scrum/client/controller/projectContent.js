//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('scrum').controller('ProjectContentCtrl', ['$scope', '$mdDialog', '$stateParams', '$reactive', '$state', '$timeout', '$rootScope',
    function ($scope, $mdDialog, $stateParams, $reactive, $state, $timeout, $rootScope) {
        $reactive(this).attach($scope);

        //$scope.title = 'Scrum';

        if (!$stateParams.id) {
            $state.go('scrum');
        }

        moment.locale('pt-BR');

        isInt = function(n) { return parseInt(n) === n };

        $scope.helpers({
            project: function () {
                this.subscribe('project');
                return Project.findOne($stateParams.id);
            },
            sprint: function() {
                this.subscribe('sprint');
                dateNow = moment().format('x');

                if ($stateParams.sprintId == '1' || $stateParams.sprintId == '') {

                    Meteor.call('sprintCreate', $stateParams.id, function (error, result) {
                        if (error) {
                            console.log(error);
                        } else {
                            //console.log('Saved!');
                            //$scope.form = '';
                            //$mdDialog.hide();
                        }
                        //$rootScope.titleMiddle = result.dateStart + ' - ' + result.dateEnd + ' (' + result.number + ')';
                        $rootScope.titleMiddle = moment(result.dateStart, 'x').format('L') + ' - ' + moment(result.dateEnd, 'x').format('L');

                        if ($stateParams.sprintId == 1 || $stateParams.sprintId == '') {
                            $state.go('scrum/content', {id:$stateParams.id, sprintId:result._id})
                        }
                    });
                    sprint = Sprint.findOne(
                        {
                            $and: [
                                {projectId: $stateParams.id},
                                {dateStart: {$lte: dateNow}, dateEnd: {$gte: dateNow}}
                            ]
                        }
                    );
                } else {
                    sprint = Sprint.findOne($stateParams.sprintId);
                }

                if (sprint) {
                    project = Project.findOne($stateParams.id);

                    sprint.dateStartTreated = moment(sprint.dateStart, 'x').format('L');
                    sprint.dateEndTreated = moment(sprint.dateEnd, 'x').format('L');
                    sprint.days = moment(sprint.dateEnd, 'x').diff(moment(sprint.dateStart, 'x'), 'days');

                    if (project.skipWeekend) {
                        sprint.daysBusiness = moment(sprint.dateEnd, 'x').businessDiff(moment(sprint.dateStart, 'x'), 'days');
                        sprint.days = sprint.daysBusiness;
                    }

                    teams = Team.find({_id: {$in: project.teams}}).fetch().map(function(team){
                        team.members = Meteor.users.find({_id: {$in: team.members}}).fetch();
                        team.membersTotal = team.members.length;
                        team.timeTotal = team.membersTotal*team.time;
                        return team;
                    });

                    if (teams) {
                        timeTotal = 0;
                        teams.forEach(function(value){
                            if (isInt(parseInt(value.timeTotal))) {
                                timeTotal = parseInt(value.timeTotal) + timeTotal;
                            }
                        });

                        sprint.timeTotal = timeTotal * sprint.days;
                    } else {
                        sprint.timeTotal = 0;
                    }

                    notes = Note.find({$and: [{sprintId: $stateParams.sprintId}], $or: [{projectId: $stateParams.id}, {projectId: null}]}).fetch();
                    notes.map(function(note){
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
                        notes.forEach(function(value){
                            //console.log(value);
                            if (isInt(parseInt(value.time))) {
                                timeTotal = parseInt(value.time) + timeTotal;
                            }
                        });
                        sprint.timeTotalNotes = timeTotal;
                    } else {
                        sprint.timeTotalNotes = 0;
                    }


                    notesDone = Note.find({$and: [{sprintId: $stateParams.sprintId}, {statusId: '1'}], $or: [{projectId: $stateParams.id}, {projectId: null}]}).fetch();
                    //console.log(notesDone);
                    if (notesDone) {
                        timeTotal = 0;
                        notesDone.forEach(function(value){
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

                    sprint.progressDone = sprint.timeTotalNotesDone*100/sprint.timeTotal;
                    sprint.progress = sprint.timeTotalNotes*100/sprint.timeTotal;

                    //console.log(sprint.progress);
                    $rootScope.titleMiddle = moment(sprint.dateStart, 'x').format('L')  + ' - ' + moment(sprint.dateEnd, 'x').format('L');
                    //sprint.hoursMember = project.ti;
                }

                $rootScope.sprint = sprint;
                return sprint;
            },
            sprintNext: function() {
                this.subscribe('notes');
                this.subscribe('project');
                this.subscribe('sprint');
                sprint = Sprint.findOne({_id: $stateParams.sprintId});
                sprintNext = {};
                if (sprint) {
                    sprintNextNumber = sprint.number + 1;
                    sprintNext = Sprint.findOne({projectId: $stateParams.id, number: sprintNextNumber});
                    if (sprintNext) {
                        sprintNext.dateStartTreated = moment(sprintNext.dateStart, 'x').format('L');
                        sprintNext.dateEndTreated = moment(sprintNext.dateEnd, 'x').format('L');
                        sprintNext.days = moment(sprint.dateEnd, 'x').diff(moment(sprintNext.dateStart, 'x'), 'days');
                        $rootScope.sprintNext = sprintNext;
                    }
                }

                if (!sprintNext) {
                    $rootScope.sprintNext = {};
                    Meteor.call('sprintFindNext', {projectId: $stateParams.id, sprintId: $stateParams.sprintId}, function(error, result){
                        $rootScope.sprintNext = result;
                    });
                }

                if ($rootScope.sprintNext) {
                    $rootScope.sprintNext.days = moment($rootScope.sprintNext.dateEnd, 'x').diff(moment($rootScope.sprintNext.dateStart, 'x'), 'days');
                    project = Project.findOne($stateParams.id);
                    if (project.skipWeekend) {
                        $rootScope.sprintNext.daysBusiness = moment(sprint.dateEnd, 'x').businessDiff(moment(sprint.dateStart, 'x'), 'days');
                        $rootScope.sprintNext.days = $rootScope.sprintNext.daysBusiness;
                    }
                    if (project) {
                        teams = Team.find({_id: {$in: project.teams}}).fetch().map(function(team){
                            team.members = Meteor.users.find({_id: {$in: team.members}}).fetch();
                            team.membersTotal = team.members.length;
                            team.timeTotal = team.membersTotal*team.time;
                            return team;
                        });
                    }

                    if (teams) {
                        timeTotal = 0;
                        teams.forEach(function(value){
                            if (isInt(parseInt(value.timeTotal))) {
                                timeTotal = parseInt(value.timeTotal) + timeTotal;
                            }
                        });

                        $rootScope.sprintNext.timeTotal = timeTotal * $rootScope.sprintNext.days;
                    } else {
                        $rootScope.sprintNext.timeTotal = 0;
                    }

                    notes = Note.find({$and: [{sprintId: $rootScope.sprintNext._id}], $or: [{projectId: $stateParams.id}, {projectId: null}]}).fetch();
                    if (notes) {
                        timeTotal = 0;
                        notes.forEach(function(value){
                            if (isInt(parseInt(value.time))) {
                                timeTotal = parseInt(value.time) + timeTotal;
                            }
                        });
                        $rootScope.sprintNext.timeTotalNotes = timeTotal;
                    } else {
                        $rootScope.sprintNext.timeTotalNotes = 0;
                    }

                    notesDone = Note.find({$and: [{sprintId: $rootScope.sprintNext._id}, {statusId: '1'}], $or: [{projectId: $stateParams.id}, {projectId: null}]}).fetch();
                    if (notesDone) {
                        timeTotal = 0;
                        notesDone.forEach(function(value){
                            if (isInt(parseInt(value.time))) {
                                //timeTotal = parseInt(value.time) + timeTotal;
                            }
                        });
                        $rootScope.sprintNext.timeTotalNotesDone = timeTotal;
                    } else {
                        $rootScope.sprintNext.timeTotalNotesDone = 0;
                    }

                    $rootScope.sprintNext.progressDone = sprint.timeTotalNotesDone*100/sprint.timeTotal;
                    $rootScope.sprintNext.progress = sprint.timeTotalNotes*100/sprint.timeTotal;
                }

                return $rootScope.sprintNext;
            },
            sprintPrevious: function() {
                this.subscribe('notes');
                this.subscribe('project');
                this.subscribe('sprint');
                sprint = Sprint.findOne({_id: $stateParams.sprintId});
                sprintPrevious = {};
                if (sprint) {
                    sprint = Sprint.findOne({_id: $stateParams.sprintId});
                    sprintPrevious = {};
                    if (sprint) {
                        sprintPreviousNumber = sprint.number - 1;
                        sprintPrevious = Sprint.findOne({projectId: $stateParams.id, number: sprintPreviousNumber});
                        if (sprintPrevious) {
                            sprintPrevious.dateStartTreated = moment(sprintPrevious.dateStart, 'x').format('L');
                            sprintPrevious.dateEndTreated = moment(sprintPrevious.dateEnd, 'x').format('L');
                        }
                    }
                    $rootScope.sprintPrevious = sprintPrevious;
                }


                if ($rootScope.sprintPrevious) {
                    $rootScope.sprintPrevious.days = moment($rootScope.sprintPrevious.dateEnd, 'x').diff(moment($rootScope.sprintPrevious.dateStart, 'x'), 'days');
                    project = Project.findOne($stateParams.id);

                    if (project.skipWeekend) {
                        $rootScope.sprintPrevious.daysBusiness = moment(sprint.dateEnd, 'x').businessDiff(moment(sprint.dateStart, 'x'), 'days');
                        $rootScope.sprintPrevious.days = $rootScope.sprintPrevious.daysBusiness;
                    }

                    if (project) {
                        teams = Team.find({_id: {$in: project.teams}}).fetch().map(function(team){
                            team.members = Meteor.users.find({_id: {$in: team.members}}).fetch();
                            team.membersTotal = team.members.length;
                            team.timeTotal = team.membersTotal*team.time;
                            return team;
                        });
                    }

                    if (teams) {
                        timeTotal = 0;
                        teams.forEach(function(value){
                            if (isInt(parseInt(value.timeTotal))) {
                                timeTotal = parseInt(value.timeTotal) + timeTotal;
                            }
                        });

                        $rootScope.sprintPrevious.timeTotal = timeTotal * $rootScope.sprintPrevious.days;
                    } else {
                        $rootScope.sprintPrevious.timeTotal = 0;
                    }

                    notes = Note.find({$and: [{sprintId: $rootScope.sprintPrevious._id}], $or: [{projectId: $stateParams.id}, {projectId: null}]}).fetch();
                    if (notes) {
                        timeTotal = 0;
                        notes.forEach(function(value){
                            if (isInt(parseInt(value.time))) {
                                timeTotal = parseInt(value.time) + timeTotal;
                            }
                        });
                        $rootScope.sprintPrevious.timeTotalNotes = timeTotal;
                    } else {
                        $rootScope.sprintPrevious.timeTotalNotes = 0;
                    }

                    notesDone = Note.find({$and: [{sprintId: $rootScope.sprintPrevious._id}, {statusId: '1'}], $or: [{projectId: $stateParams.id}, {projectId: null}]}).fetch();
                    if (notesDone) {
                        timeTotal = 0;
                        notesDone.forEach(function(value){
                            if (isInt(parseInt(value.time))) {
                                //timeTotal = parseInt(value.time) + timeTotal;
                            }
                        });
                        $rootScope.sprintPrevious.timeTotalNotesDone = timeTotal;
                    } else {
                        $rootScope.sprintPrevious.timeTotalNotesDone = 0;
                    }

                    $rootScope.sprintPrevious.progressDone = sprint.timeTotalNotesDone*100/sprint.timeTotal;
                    $rootScope.sprintPrevious.progress = sprint.timeTotalNotes*100/sprint.timeTotal;
                }

                return $rootScope.sprintPrevious;
            }
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

        //var self = this;
        //self.hidden = false;
        //self.isOpen = false;
        //self.hover = false;
        // On opening, add a delayed property which shows tooltips after the speed dial has opened
        // so that they have the proper position; if closing, immediately hide the tooltips
        //$scope.$watch('vm.isOpen', function(isOpen) {
        //
        //    console.log('hidden:' + self.hidden);
        //    console.log('isOpen:' + self.isOpen);
        //    console.log('hover:' + self.hover);
        //    console.log('________');
        //    if (isOpen) {
        //        $timeout(function() {
        //            this.tooltipVisible = self.isOpen;
        //        }, 600);
        //    } else {
        //        this.tooltipVisible = self.isOpen;
        //    }
        //});
    }]);