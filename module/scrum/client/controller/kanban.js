//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('scrum').controller('KanbanCtrl', [ '$scope', '$mdDialog', '$mdSidenav', '$mdUtil', '$log', '$stateParams', '$reactive',
    //function ($scope, $mdDialog, $mdSidenav, $mdUtil, $log, $meteor, $rootScope, Sortable, id) {
    function ($scope, $mdDialog, $mdSidenav, $mdUtil, $log, $stateParams, $reactive) {
        $reactive(this).attach($scope);

        //$stateParams.id

        Meteor.subscribe('note');
        $scope.backLogNotes = [];

        Meteor.subscribe('status');
        $scope.states = [];
        $scope.stories = [];

        this.teste1 = function(id){
            return 'Hahahaa 1' + id;
        };

        this.notes = function(storyId) {
            console.log(storyId);
            if (storyId) {
                notes = Note.find({storyId:storyId});
            } else {
                notes = Note.find();
            }
            console.log(notes);
            //Meteor.subscribe('story');
            notes.forEach(function(note, noteKey){
                note.story = Story.findOne(note.story);
                note.owner = Meteor.users.findOne(note.owner);
                //teste = note.owner.name.split(' ');
                //console.log(teste);
                //note.owner.firstName = note.owner.name.substring(0, note.owner.name.trim().search(' '));
                $scope.backLogNotes[noteKey] = note;
            });
            return notes;
        };

        this.teste2 = 'Hahahaa 2';
        $scope.teste3 = 'Hahahaa 3';
        this.helpers({
            //teste1: function(id){
            //  return 'Hahahaa 1' + id;
            //},
            //notes: function() {
            //    notes = Note.find({});
            //    Meteor.subscribe('story');
            //    notes.forEach(function(note, noteKey){
            //        note.story = Story.findOne(note.story);
            //        note.owner = Meteor.users.findOne(note.owner);
            //        //teste = note.owner.name.split(' ');
            //        //console.log(teste);
            //        //note.owner.firstName = note.owner.name.substring(0, note.owner.name.trim().search(' '));
            //        $scope.backLogNotes[noteKey] = note;
            //    });
            //    return notes;
            //},
            states: function() {
                result = Status.find({});
                //$meteor.subscribe('story');
                result.forEach(function(value, key){
                    //    note.story = Story.findOne(note.story);
                    //    note.owner = Meteor.users.findOne(note.owner);
                    //    //teste = note.owner.name.split(' ');
                    //    //console.log(teste);
                    //    //note.owner.firstName = note.owner.name.substring(0, note.owner.name.trim().search(' '));
                    $scope.states[key] = value;
                });
                return result;
            },
            stories: function() {
                stories = Story.find({$or: [{projectId: $stateParams.id}, {projectId: null}]});
                //$meteor.subscribe('story');
                stories.forEach(function(value, key){
                    //    note.story = Story.findOne(note.story);
                    //    note.owner = Meteor.users.findOne(note.owner);
                    //    //teste = note.owner.name.split(' ');
                    //    //console.log(teste);
                    //    //note.owner.firstName = note.owner.name.substring(0, note.owner.name.trim().search(' '));
                    $scope.stories[key] = value;
                });
                return stories;
            }
        });


        //console.log(Story.find({}));


        $scope.modalSave = function(ev, id){
            $mdDialog.show({
                controller: 'NoteSaveCtrl',
                templateUrl: 'module/scrum/client/view/note-save.ng.html',
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




        //$scope.items = ['item 1', 'item 2'];
        //$scope.foo = ['foo 1', '..'];
        //$scope.bar = ['bar 1', '..'];
        //$scope.barConfig = {
        //    group: 'foobar',
        //    animation: 150,
        //    onSort: function (/** ngSortEvent */evt){
        //        // @see https://github.com/RubaXa/Sortable/blob/master/ng-sortable.js#L18-L24
        //    }
        //};


        //$meteor.subscribe('team');
        //$scope.team = $meteor.collection( function() {
        //    return Teams.find(
        //        {
        //            //$or: [
        //            //    {
        //            //        'userId' : $rootScope.currentUser._id,
        //            //        'friendId' : friendId
        //            //    }
        //            //    ,
        //            //    {
        //            //        'userId' : friendId,
        //            //        'friendId' : $rootScope.currentUser._id
        //            //    }
        //            //]
        //        }
        //    );
        //});
        //$scope.modalSave = function(ev){
        //    console.log('asd');
        //
        //    //$mdDialog.alert()
        //    //    .parent(angular.element(document.querySelector('#popupContainer')))
        //    //    .clickOutsideToClose(true)
        //    //    .title('This is an alert title')
        //    //    .content('You can specify some description text in here.')
        //    //    .ariaLabel('Alert Dialog Demo')
        //    //    .ok('Got it!')
        //    //    .targetEvent(ev)
        //
        //    $mdDialog.show({
        //        controller: 'TeamSaveCtrl',
        //        templateUrl: 'client/module/scrum/view/team-save.ng.html',
        //        clickOutsideToClose:true,
        //        resolve: {
        //            //parties: function () {
        //            //    return $scope.parties;
        //            //}
        //        },
        //        targetEvent: ev
        //    }).then(function(answer) {
        //        $scope.status = 'You said the information was "' + answer + '".';
        //    }, function() {
        //        $scope.status = 'You cancelled the dialog.';
        //    });
        //};
}]);