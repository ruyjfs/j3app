//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('scrum').controller('BacklogCtrl', [ '$scope', '$mdDialog', '$mdSidenav', '$mdUtil', '$log', '$reactive', '$stateParams',
    function ($scope, $mdDialog, $mdSidenav, $mdUtil, $log, $reactive, $stateParams) {
        $reactive(this).attach($scope);

        Meteor.subscribe('note');
        $scope.backLogNotes = [];
        //$scope.sprintCurrent = {};
        $scope.sprintCurrent = {};

        $scope.helpers({
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
            //sprintCurrents: function() {
            //    Meteor.subscribe('sprint');
            //    dateNow = moment().format('x');
            //    sprint = Sprint.findOne(
            //        {
            //            $and: [
            //                {projectId: $stateParams.id},
            //                {dateStart: {$lte: dateNow}, dateEnd: {$gte: dateNow}}
            //            ]
            //        }
            //    );
            //    sprint.dateStartTreated = moment(sprint.dateStart, 'x').format('L');
            //    sprint.dateEndTreated = moment(sprint.dateEnd, 'x').format('L');
            //    $scope.sprintCurrent = sprint;
            //    return sprint;
            //}
        });
}]);