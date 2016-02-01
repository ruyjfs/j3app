//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('scrum').controller('KanbanCtrl', [ '$scope', '$mdDialog', '$mdSidenav', '$mdUtil', '$log', '$stateParams', '$reactive',
    //function ($scope, $mdDialog, $mdSidenav, $mdUtil, $log, $meteor, $rootScope, Sortable, id) {
    function ($scope, $mdDialog, $mdSidenav, $mdUtil, $log, $stateParams, $reactive) {
        $reactive(this).attach($scope);

        //$stateParams.id

        Meteor.subscribe('note');
        //$scope.backLogNotes = [];

        Meteor.subscribe('status');

        $scope.teste3 = 'Hahahaa 3';
        //$scope.t = function($text) {
        //    return '$text';
        //};

        //$scope.t = function($text) {
        //    return $text;
        //}

        //$scope.helpers({
        //    t: function($text) {
        //        return $text;
        //    }
        //});

        //this.teste1 = function(id){
        //    return 'Hahahaa 1' + id;
        //};

        //this.notesBackLog = function(storyId) {
        //    console.log(storyId);
        //    if (storyId) {
        //        notes = Note.find({storyId:storyId});
        //    } else {
        //        notes = Note.find();
        //    }
        //    console.log(notes);
        //    //Meteor.subscribe('story');
        //    notes.forEach(function(note, noteKey){
        //        note.story = Story.findOne(note.story);
        //        note.owner = Meteor.users.findOne(note.owner);
        //        //teste = note.owner.name.split(' ');
        //        //console.log(teste);
        //        //note.owner.firstName = note.owner.name.substring(0, note.owner.name.trim().search(' '));
        //        $scope.backLogNotes[noteKey] = note;
        //    });
        //    return notes;
        //};

        //
        //result = Status.find({}).map(function(a){
        //    console.log(a);
        //    value.teste = 'Hahaha';
        //    return value;
        //});

        //Meteor.subscribe('story');
        //titles=Posts.find().map(function(a) {return a.title});
        //teste = Story.find({$or: [{projectId: $stateParams.id}, {projectId: null}]}).map( function (a){ return a;});
        //teste = Story.find({$or: [{projectId: $stateParams.id}, {projectId: null}]});

        //this.teste2 = teste.map(function(a){ return a});
        //console.log(teste2);

        this.teste2 = 'Hahahaa 2';
        //$scope.teste3 = 'Hahahaa 3';

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
                var states = Status.find({projectId: $stateParams.id}).fetch();
                states.unshift({name: 'BackLog', _id: null});
                return states;
            },

            stories: function() {
                var stories = Story.find({$or: [{projectId: $stateParams.id}, {projectId: null}]}).map(function(story){
                    var states = Status.find({projectId: $stateParams.id}).fetch();
                    states.unshift({name: 'BackLog', _id: null});
                    story.states = states.map(function(status) {
                        var notes = Note.find({story:story._id, statusId: status._id}).map(function(note) {
                            note.owner = Meteor.users.findOne(note.owner);
                            return note;
                        });
                        status.notes = notes;
                       return status;
                    });
                    return story;
                });

                setTimeout(function(){
                    console.log('teste 123');
                    testando();
                }, 300);

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