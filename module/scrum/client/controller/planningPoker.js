//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('scrum').controller('PlanningPokerCtrl', [ '$scope', '$mdDialog', '$mdSidenav', '$mdUtil', '$log', '$stateParams', '$reactive', '$mdToast',
    function ($scope, $mdDialog, $mdSidenav, $mdUtil, $log, $stateParams, $reactive, $mdToast) {
        $reactive(this).attach($scope);

        this.id = $stateParams.id;
        this.sprintId = $stateParams.sprintId;
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
        //this.call('storyFindByProject', {projectId: $stateParams.id}, function(error, result){
        //    console.log('asd');
        //    this.stories = result
        //});

        //Meteor.subscribe('project');
        this.subscribe('users');
        this.subscribe('project');
        this.subscribe('team', function(){return [$stateParams.organization]});
        this.subscribe('status', function(){return [$stateParams.id]});
        this.subscribe('note', function(){return [$stateParams.id]});
        this.subscribe('story', function(){return [$stateParams.id]});
        this.subscribe('sprint', function(){return [$stateParams.id]});
        //this.helpers({
        //    stories: function() {
        //        var stories = Story.find({$or: [{projectId: $stateParams.id}, {projectId: null}]}).map(function(story){
        //            var states = Status.find({projectId: $stateParams.id}, {sort: {order: 1, name: 1}}).fetch();
        //            states.unshift({name: 'To do', _id: null});
        //            states.push({name: 'Done', _id: '1'});
        //            story.states = states.map(function(status) {
        //                if (status._id) {
        //                    var notes = Note.find({story: story._id, statusId: status._id, sprintId: $stateParams.sprintId}).map(function(note) {
        //                        note.owner = Meteor.users.findOne(note.owner);
        //                        if (note.owner.status) {
        //                            if (note.owner.status.lastLogin) {
        //
        //                                if (moment(new Date).diff(moment(note.owner.status.lastLogin.date), 'days') > 2) {
        //                                    note.owner.statusLastLoginDate = moment(note.owner.status.lastLogin.date).format('L H[h]m');
        //                                } else {
        //                                    note.owner.statusLastLoginDate = moment(note.owner.status.lastLogin.date).fromNow(); // in 40 minutes
        //                                }
        //                            }
        //                            //console.log(note.owner.status.lastLogin.date);
        //                            //moment(note.owner.status.lastLogin.date).format('L LT')
        //                            //note.owner.status.lastLogin.dateTreated = '';
        //                            if (note.owner.status.idle == true) {
        //                                note.owner.statusColor = ' #FFC107';
        //                                note.owner.statusName = ' Away';
        //                            } else if (note.owner.status.online == true) {
        //                                note.owner.statusColor = ' #9ACD32';
        //                                note.owner.statusName = ' Online';
        //                            } else {
        //                                note.owner.statusColor = ' rgba(224, 224, 224, 0.77)';
        //                                note.owner.statusName = ' Offline';
        //                            }
        //                        } else {
        //                            note.owner.statusColor = ' rgba(224, 224, 224, 0.77)';
        //                            note.owner.statusName = ' Offline';
        //                        }
        //                        // Imagem do gravatar.
        //                        if (note.owner.emails && note.owner.emails[0].address) {
        //                            note.owner.img = 'http://www.gravatar.com/avatar/' + CryptoJS.MD5(note.owner.emails[0].address).toString() + '?s=60&d=mm';
        //                        } else {
        //                            note.owner.img = 'http://www.gravatar.com/avatar/00000000000000000000000000000000?s=60&d=mm&f=y';
        //                        }
        //
        //                        note.owner.nameTreated = note.owner.name + ' ' + note.owner.lastName;
        //                        if (note.owner.nameTreated.length > 14) {
        //                            note.owner.nameTreated = note.owner.nameTreated.substr(0,13) + '...';
        //                        }
        //                        return note;
        //                    });
        //                } else {
        //                    var notes = Note.find({story:story._id, sprintId: $stateParams.sprintId, $or: [{statusId: status._id}, {statusId: ''}]}).map(function(note) {
        //                        note.owner = Meteor.users.findOne(note.owner);
        //                        if (note.owner && note.owner.status) {
        //
        //                            if (note.owner.status.lastLogin) {
        //
        //                                if (moment(new Date).diff(moment(note.owner.status.lastLogin.date), 'days') > 2) {
        //                                    note.owner.statusLastLoginDate = moment(note.owner.status.lastLogin.date).format('L H[h]m');
        //                                } else {
        //                                    note.owner.statusLastLoginDate = moment(note.owner.status.lastLogin.date).fromNow(); // in 40 minutes
        //                                }
        //                            }
        //                            //console.log(note.owner.status.lastLogin.date);
        //                            //moment(note.owner.status.lastLogin.date).format('L LT')
        //                            //note.owner.status.lastLogin.dateTreated = '';
        //                            if (note.owner.status.idle == true) {
        //                                note.owner.statusColor = ' #FFC107';
        //                                note.owner.statusName = ' Away';
        //                            } else if (note.owner.status.online == true) {
        //                                note.owner.statusColor = ' #9ACD32';
        //                                note.owner.statusName = ' Online';
        //                            } else {
        //                                note.owner.statusColor = ' rgba(224, 224, 224, 0.77)';
        //                                note.owner.statusName = ' Offline';
        //                            }
        //                        } else {
        //                            if (!note.owner) {
        //                                note.owner = {};
        //                            }
        //                            note.owner.statusColor = ' rgba(224, 224, 224, 0.77)';
        //                            note.owner.statusName = ' Offline';
        //                        }
        //                        // Imagem do gravatar.
        //                        if (note.owner.emails && note.owner.emails[0].address) {
        //                            note.owner.img = 'http://www.gravatar.com/avatar/' + CryptoJS.MD5(note.owner.emails[0].address).toString() + '?s=60&d=mm';
        //                        } else {
        //                            note.owner.img = 'http://www.gravatar.com/avatar/00000000000000000000000000000000?s=60&d=mm&f=y';
        //                        }
        //
        //                        note.owner.nameTreated = note.owner.name + ' ' + note.owner.lastName;
        //                        if (note.owner.nameTreated.length > 14) {
        //                            note.owner.nameTreated = note.owner.nameTreated.substr(0,13) + '...';
        //                        }
        //                        return note;
        //                    });
        //                }
        //                status.notes = notes;
        //               return status;
        //            });
        //
        //            return story;
        //        }).filter(function(story){
        //            var notes = Note.find({story:story._id, sprintId: $stateParams.sprintId}).fetch();
        //            return (notes.length > 0);
        //        });
        //
        //        setTimeout(function(){
        //            sortableKanban();
        //        }, 300);
        //
        //        return stories;
        //    },
        //    states: function(){
        //        var states = Status.find({projectId: $stateParams.id}).fetch();
        //        states.unshift({name: 'To do', _id: null});
        //        states.push({name: 'Done', _id: 1});
        //        return states;
        //    }
        //});
        //$scope.modalStorySave = function (ev, id) {
        //    $mdDialog.show({
        //        controller: 'StorySaveCtrl',
        //        templateUrl: 'module/scrum/client/view/story-save.ng.html',
        //        clickOutsideToClose: true,
        //        locals: {id: id},
        //        targetEvent: ev
        //    });
        //};
        //$scope.modalNoteSave = function (ev, id, storyId) {
        //    $mdDialog.show({
        //        controller: 'NoteSaveCtrl',
        //        templateUrl: 'module/scrum/client/view/note-save.ng.html',
        //        clickOutsideToClose: true,
        //        targetEvent: ev,
        //        locals: {
        //            id: id,
        //            storyId: storyId
        //        }
        //    }).then(function (answer) {
        //        $scope.status = 'You said the information was "' + answer + '".';
        //    }, function () {
        //        $scope.status = 'You cancelled the dialog.';
        //    });
        //};
        //
        //$scope.modalNoteView = function (ev, id, storyId) {
        //    $mdDialog.show({
        //        controller: 'NoteViewCtrl',
        //        templateUrl: 'module/scrum/client/view/note-view.ng.html',
        //        clickOutsideToClose: true,
        //        targetEvent: ev,
        //        locals: {
        //            id: id,
        //            storyId: storyId
        //        }
        //    }).then(function (answer) {
        //        $scope.status = 'You said the information was "' + answer + '".';
        //    }, function () {
        //        $scope.status = 'You cancelled the dialog.';
        //    });
        //};
        //
        //this.noteTrash = function($id){
        //    Meteor.call('noteTrash', {id: $id, trash: true}, function (error) {
        //        if (error) {
        //            Materialize.toast('Erro: ' + error, 4000);
        //        } else {
        //            Materialize.toast('Deleted successfully!', 4000);
        //        }
        //    });
        //};
        //$scope.showCustomToast = function() {
        //    $mdToast.show({
        //        hideDelay   : 300000,
        //        //position    : 'right',
        //        module: 'user',
        //        controller  : 'ToastUserCtrl',
        //        templateUrl: 'module/user/client/views/toast-user.ng.html',
        //        locals: {
        //            id: 123
        //        },
        //    });
            //var toast = $mdToast.simple()
            //    .textContent('Marked as read')
            //    .action('UNDO')
            ////    //.highlightAction(true)
            ////    //.highlightClass('md-accent')// Accent is used by default, this just demonstrates the usage.
            //    .position('top');
            //$mdToast.show(toast).then(function(response) {
            //    if ( response == 'ok' ) {
            //        alert('You clicked the \'UNDO\' action.');
            //    }
            //});

            //$mdToast.show($mdToast.simple().textContent('Hello!'));
            //console.log('asd');
        //};

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