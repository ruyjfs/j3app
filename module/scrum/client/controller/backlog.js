angular.module('scrum').controller('BacklogCtrl', [ '$scope', '$mdDialog', '$mdSidenav', '$mdUtil', '$log', '$reactive', '$stateParams', '$rootScope',
    function ($scope, $mdDialog, $mdSidenav, $mdUtil, $log, $reactive, $stateParams, $rootScope) {
        $reactive(this).attach($scope);

        Meteor.subscribe('note');
        Meteor.subscribe('sprint');
        this.helpers({
            notesBackLog: function () {
                notes = Note.find({$and: [{sprintId: null}], $or: [{projectId: $stateParams.id}, {projectId: null}]}).fetch();
                notes.map(function(note){
                    note.story = Story.findOne(note.story);
                    note.owner = Meteor.users.findOne(note.owner);
                    return note;
                });
                return notes;
            },
            notesSprintPrevious: function () {
                sprint = Sprint.findOne({_id: $stateParams.sprintId});
                notes = [];
                if (sprint) {
                    sprintPreviousNumber = sprint.number - 1;
                    sprintPrevious = Sprint.findOne({projectId: $stateParams.id, number: sprintPreviousNumber});
                    if (sprintPrevious) {
                        sprintPrevious.dateStartTreated = moment(sprintPrevious.dateStart, 'x').format('L');
                        sprintPrevious.dateEndTreated = moment(sprintPrevious.dateEnd, 'x').format('L');
                        notes = Note.find({$and: [{sprintId: sprintPrevious._id}], $or: [{projectId: $stateParams.id}, {projectId: null}]}).fetch();
                        notes.map(function(note){
                            note.story = Story.findOne(note.story);
                            note.owner = Meteor.users.findOne(note.owner);
                            return note;
                        });
                    }
                }
                return notes;
            },
            notesSprintCurrent: function () {
                notes = Note.find({$and: [{sprintId: $stateParams.sprintId}], $or: [{projectId: $stateParams.id}, {projectId: null}]}).fetch();
                notes.map(function(note){
                    note.story = Story.findOne(note.story);
                    note.owner = Meteor.users.findOne(note.owner);
                    return note;
                });
                return notes;
            },
            notesSprintNext: function () {
                sprint = Sprint.findOne({_id: $stateParams.sprintId});
                notes = [];
                if (sprint) {
                    sprintNextNumber = sprint.number + 1;
                    sprintNext = Sprint.findOne({projectId: $stateParams.id, number: sprintNextNumber});
                    console.log(sprintNext);
                    if (sprintNext) {
                        sprintNext.dateStartTreated = moment(sprintNext.dateStart, 'x').format('L');
                        sprintNext.dateEndTreated = moment(sprintNext.dateEnd, 'x').format('L');
                        notes = Note.find({$and: [{sprintId: sprintNext._id}], $or: [{projectId: $stateParams.id}, {projectId: null}]}).fetch();
                        notes.map(function(note){
                            note.story = Story.findOne(note.story);
                            note.owner = Meteor.users.findOne(note.owner);
                            return note;
                        });
                    }
                }
                console.log(notes);
                return notes;
            },
            sprintPrevious: function() {
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
                $scope.sprintPrevious = sprintPrevious;
                return sprintPrevious;
            },
            sprintCurrent: function() {
                sprint = Sprint.findOne({_id: $stateParams.sprintId});
                if (sprint) {
                    sprint.dateStartTreated = moment(sprint.dateStart, 'x').format('L');
                    sprint.dateEndTreated = moment(sprint.dateEnd, 'x').format('L');
                }
                $scope.sprintCurrent = sprint;
                return sprint;
            },
            sprintNext: function() {
                sprint = Sprint.findOne({_id: $stateParams.sprintId});
                sprintNext = {};
                if (sprint) {
                    sprintNextNumber = sprint.number + 1;
                    sprintNext = Sprint.findOne({projectId: $stateParams.id, number: sprintNextNumber});
                    if (sprintNext) {
                        sprintNext.dateStartTreated = moment(sprintNext.dateStart, 'x').format('L');
                        sprintNext.dateEndTreated = moment(sprintNext.dateEnd, 'x').format('L');
                    }
                }
                $scope.sprintNext = sprintNext;
                return sprintNext;
            },
        });
}]);
