//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('scrum').controller('BacklogCtrl', [ '$scope', '$mdDialog', '$mdSidenav', '$mdUtil', '$log', '$reactive', '$stateParams',
    function ($scope, $mdDialog, $mdSidenav, $mdUtil, $log, $reactive, $stateParams) {
        $reactive(this).attach($scope);

        Meteor.subscribe('note');
        $scope.backLogNotes = [];

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
            }
        });
}]);