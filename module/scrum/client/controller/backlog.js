//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('scrum').controller('BacklogCtrl', [ '$scope', '$mdDialog', '$mdSidenav', '$mdUtil', '$log', '$reactive', '$stateParams', '$rootScope',
    function ($scope, $mdDialog, $mdSidenav, $mdUtil, $log, $reactive, $stateParams, $rootScope) {
        $reactive(this).attach($scope);

        Meteor.subscribe('users');
        Meteor.subscribe('note');
        $scope.backLogNotes = [];
        //$scope.sprintCurrent = {};
        var sprint = Session.get('sprintCurrent');

        this.helpers({
            notes: function () {
                notes = Note.find({$or: [{projectId: $stateParams.id}, {projectId: null}]});
                Meteor.subscribe('story');
                notes.forEach(function(note, noteKey){
                    note.story = Story.findOne(note.story);
                    note.owner = Meteor.users.findOne(note.owner);
                    //note.owner.firstName = note.owner.name.substring(0, note.owner.name.trim().search(' '));
                    $scope.backLogNotes[noteKey] = note;
                });
                return notes;
            },
            //sprintCurrents: function() {
            //    this.subscribe('sprint');
            //    dateNow = moment().format('x');
            //    //sprintCurrent = Sprint.findOne(
            //    //    {
            //    //        $and: [
            //    //            {projectId: $stateParams.id},
            //    //            {dateStart: {$lte: dateNow}, dateEnd: {$gte: dateNow}}
            //    //        ]
            //    //    }
            //    //);
            //    //if (sprintCurrent) {
            //    //    sprintCurrent.dateStartTreated = moment(sprintCurrent.dateStart, 'x').format('L');
            //    //    sprintCurrent.dateEndTreated = moment(sprintCurrent.dateEnd, 'x').format('L');
            //    //}
            //    //return sprintCurrent;
            //}
            sprintPrevious: function() {
                Meteor.subscribe('sprint');
                dateNow = moment().format('x');
                sprint = Sprint.findOne(
                    {
                        $and: [
                            {projectId: $stateParams.id},
                            {dateStart: {$lte: dateNow}, dateEnd: {$gte: dateNow}}
                        ]
                    }
                );
                if (sprint) {
                    sprint.dateStartTreated = moment(sprint.dateStart, 'x').format('L');
                    sprint.dateEndTreated = moment(sprint.dateEnd, 'x').format('L');
                }
                $scope.sprintPrevious = sprint;
                return sprint;
            },
            sprintCurrent: function() {
                Meteor.subscribe('sprint');
                dateNow = moment().format('x');
                if (sprint) {
                    sprint = Sprint.findOne(
                        {
                            $and: [
                                {_id: sprint._id},
                            ]
                        }
                    );
                } else {
                    sprint = Sprint.findOne(
                        {
                            $and: [
                                {projectId: $stateParams.id},
                                {dateStart: {$lte: dateNow}, dateEnd: {$gte: dateNow}}
                            ]
                        }
                    );
                }
                if (sprint) {
                    sprint.dateStartTreated = moment(sprint.dateStart, 'x').format('L');
                    sprint.dateEndTreated = moment(sprint.dateEnd, 'x').format('L');
                }
                $scope.sprintCurrent = sprint;
                return sprint;
            },
            sprintNext: function() {
                console.log('sprint');
                console.log(sprint);
                Meteor.subscribe('sprint');
                dateNow = moment().format('x');
                sprint = Sprint.findOne(
                    {
                        $and: [
                            {projectId: $stateParams.id},
                            {dateStart: {$lte: dateNow}, dateEnd: {$gte: dateNow}}
                            //{number: sprint.number + 1}
                        ]
                    }
                );
                if (sprint) {
                    sprint.dateStartTreated = moment(sprint.dateStart, 'x').format('L');
                    sprint.dateEndTreated = moment(sprint.dateEnd, 'x').format('L');
                }
                $scope.sprintNext = sprint;
                return sprint;
            }
        });
}]);
