//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('scrum').controller('SprintCtrl', [ '$scope', '$mdDialog', '$mdSidenav', '$mdUtil', '$log', '$meteor', '$rootScope',
    function ($scope, $mdDialog, $mdSidenav, $mdUtil, $log, $meteor, $rootScope) {
        //$scope.title = 'Scrum';

        $meteor.subscribe('note');
        $scope.backLogNotes = [];
        $meteor.collection( function() {
            notes = Note.find({});
            notes.forEach(function(note, noteKey){
                note.story = Story.findOne(note.story);
                note.owner = Meteor.users.findOne(note.owner);
                $scope.backLogNotes[noteKey] = note;
            });
            return notes;
        });

        //console.log(Story.find({}));


        $scope.modalSave = function(ev, id){
            $mdDialog.show({
                controller: 'NoteSaveCtrl',
                templateUrl: 'client/module/scrum/view/note-save.ng.html',
                clickOutsideToClose: true,
                targetEvent: ev,
                locals:
                {
                    id: id
                }
            }).then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });
        };
}]);