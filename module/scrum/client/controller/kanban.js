//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('scrum').controller('KanbanCtrl', [ '$scope', '$mdDialog', '$mdSidenav', '$mdUtil', '$log', '$stateParams', '$reactive',
    function ($scope, $mdDialog, $mdSidenav, $mdUtil, $log, $stateParams, $reactive) {
        $reactive(this).attach($scope);

        //this.call('statusFindByProject', {projectId: $stateParams.id}, function(error, result){
        //    this.states = result;
        //});
        //Meteor.call('storyFindByProject', {projectId: $stateParams.id}, function(error, result){
        //    Session.set('stories', result);
        //    //this.stories = result;
        //    console.log('story');
        //    console.log(result);
        //    setTimeout(function(){
        //        testando();
        //    }, 300);
        //});

        //this.helpers({
        //    stories: function() {
        //        return Session.get('stories');
        //    }
        //});

        //Meteor.subscribe('note');
        //Meteor.subscribe('users');
        this.helpers({
            stories: function() {
                var stories = Story.find({$or: [{projectId: $stateParams.id}, {projectId: null}]}).map(function(story){
                    var states = Status.find({projectId: $stateParams.id}).fetch();
                    states.unshift({name: 'BackLog', _id: null});
                    states.push({name: 'Done', _id: '1'});
                    story.states = states.map(function(status) {
                        if (status._id) {
                            var notes = Note.find({story: story._id, statusId: status._id, sprintId: $stateParams.sprintId}).map(function(note) {
                                note.owner = Meteor.users.findOne(note.owner);
                                return note;
                            });
                        } else {
                            var notes = Note.find({story:story._id, sprintId: $stateParams.sprintId, $or: [{statusId: status._id}, {statusId: ''}]}).map(function(note) {
                                note.owner = Meteor.users.findOne(note.owner);
                                return note;
                            });
                        }
                        status.notes = notes;
                       return status;
                    });

                    return story;
                }).filter(function(story){
                    var notes = Note.find({story:story._id, sprintId: $stateParams.sprintId}).fetch();
                    return (notes.length > 0);
                });

                setTimeout(function(){
                    sortableKanban();
                }, 300);

                return stories;
            },
            states: function(){
                var states = Status.find({projectId: $stateParams.id}).fetch();
                states.unshift({name: 'BackLog', _id: null});
                states.push({name: 'Done', _id: 1});
                return states;
            }
        });

        //$scope.modalSave = function(ev, id){
        //    console.log('teste');
        //    $mdDialog.show({
        //        controller: 'NoteSaveCtrl',
        //        templateUrl: 'module/scrum/client/view/note-save.ng.html',
        //        clickOutsideToClose: true,
        //        targetEvent: ev,
        //        locals:
        //        {
        //            id: id
        //        }
        //    }).then(function(answer) {
        //        $scope.status = 'You said the information was "' + answer + '".';
        //    }, function() {
        //        $scope.status = 'You cancelled the dialog.';
        //    });
        //};




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
        //            //        'contactId' : contactId
        //            //    }
        //            //    ,
        //            //    {
        //            //        'userId' : contactId,
        //            //        'contactId' : $rootScope.currentUser._id
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