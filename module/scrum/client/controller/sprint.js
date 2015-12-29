//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('scrum').controller('SprintCtrl', [ '$scope', '$mdDialog', '$mdSidenav', '$mdUtil', '$log', '$meteor', '$rootScope',
    function ($scope, $mdDialog, $mdSidenav, $mdUtil, $log, $meteor, $rootScope) {
        //$scope.title = 'Scrum';

        Meteor.subscribe('note');
        $scope.backLogNotes = [];
        $meteor.collection( function() {
            notes = Note.find({});
            Meteor.subscribe('story');
            notes.forEach(function(note, noteKey){
                note.story = Story.findOne(note.story);
                note.owner = Meteor.users.findOne(note.owner);
                //note.owner.firstName = note.owner.name.substring(0, note.owner.name.trim().search(' '));
                $scope.backLogNotes[noteKey] = note;
            });
            return notes;
        });
}]);