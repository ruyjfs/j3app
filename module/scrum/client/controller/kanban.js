//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('scrum').controller('KanbanCtrl', [ '$scope', '$mdDialog', '$mdSidenav', '$mdUtil', '$log', '$stateParams', '$reactive', '$mdToast',
    function ($scope, $mdDialog, $mdSidenav, $mdUtil, $log, $stateParams, $reactive, $mdToast) {
        $reactive(this).attach($scope);

        this.organization = $stateParams.organization;
        this.product = $stateParams.product;
        this.sprint = $stateParams.sprint;
        //this.call('statusFindByProject', {productId: $stateParams.id}, function(error, result){
        //    this.states = result;
        //});
        //Meteor.call('storyFindByProject', {productId: $stateParams.id}, function(error, result){
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
        //this.call('storyFindByProject', {productId: $stateParams.id}, function(error, result){
        //    console.log('asd');
        //    this.stories = result
        //});

        //Meteor.subscribe('project');
        this.subscribe('users');
        this.subscribe('organization');
        this.subscribe('project');
        this.subscribe('team', function(){return [$stateParams.organization]});
        this.subscribe('burndown', function(){return [$stateParams.product]});
        this.subscribe('status', function(){return [$stateParams.product]});
        this.subscribe('note', function(){return [$stateParams.product, {}, this.getReactively('searchText')]});
        this.subscribe('story', function(){return [$stateParams.product]});
        this.subscribe('sprint', function(){return [$stateParams.product]});
        //this.subscribe('users', function(){
        //    console.log(this.getReactively('searchText'));
        //    return [this.getReactively('searchText')];
        //});

//        var searchText = this.getReactively('searchText');
//        selector = {story: story._id, sprintId: sprintId};
//        if (typeof searchString === 'string' && searchString.length) {
//            selector.name = {
//                $regex:  `.*${searchString}.*`,
//            $options : 'i'
//        };
//    }
//var notes = Note.find(selector).fetch();
        this.helpers({
            members: function () {
                var productId = this.getReactively('productId');
                project = Project.findOne(productId);
                usersId = [];
                if (project && project.teams) {
                    teams = Team.find({_id: {$in: project.teams}}, {sort: {name: 1}}).fetch().map(function(team){
                        if (team.members) {
                            team.members.map(function(userId){
                                usersId.push(userId);
                            });
                        }
                        return team.members;
                    });
                }
                if ($scope.form && $scope.form.owner){
                    usersId.push($scope.form.owner);
                }
                users = Meteor.users.find({_id: {$in: usersId}}, {sort: {name: 1, lastName: 1}});
                return users;
            },
            organizationId: function(){
                var id = 'organization';
                if ($stateParams.organization !== 'organization') {
                    var organization = Organization.findOne({$or: [{_id: $stateParams.organization}, {namespace: $stateParams.organization}]});
                    if (organization) {
                        id = organization._id;
                    } else {
                        id = $stateParams.organization;
                    }
                }
                return id;
            },
            productId: function(){
                var organizationId = this.getReactively('organizationId');
                var id = 0;
                if (organizationId) {
                    if (organizationId === 'organization') {
                        product = Project.findOne($stateParams.product);
                    } else {
                        product = Project.findOne({$or: [{$and: [{organization: organizationId}, {namespace: $stateParams.product}]}, {_id: $stateParams.product}]});
                    }
                    if (product) {
                        id = $stateParams.id = product._id;
                    } else {
                        id = $stateParams.id;
                    }
                }
                return id;
            },
            sprintId: function() {
                var id = 0;
                var productId = this.getReactively('productId');
                if (productId) {
                    var sprint = Sprint.findOne({$or: [{$and: [{projectId: productId}, {number: parseInt($stateParams.sprint)}]}, {_id: $stateParams.sprint}]});
                    if (sprint) {
                        id = sprint._id;
                    } else {
                        id = $stateParams.sprint;
                    }
                }
                return id;
            },
            showLoading: function() {
                return Session.get('showLoading');
            },
            stories: function() {
                var productId = this.getReactively('productId');
                var sprintId = this.getReactively('sprintId');
                var member = this.getReactively('member');
                var stories = Story.find({$or: [{projectId: productId}, {projectId: null}]}, {sort: {order: 1, name: 1}}).map(function(story){
                    var states = Status.find({projectId: productId, $or: [{trash: false}, {trash: null}]}, {sort: {order: 1, name: 1}}).fetch();
                    states.unshift({name: 'To-do', _id: null});
                    states.push({name: 'Done', _id: '1'});
                    story.states = states.map(function(status) {
                        var notes = [];
                        if (status && status._id) {
                            selector = {story: story._id, statusId: status._id, sprintId: sprintId};
                            if (member && member.length > 0) {
                                selector.owner ={$in: member};
                            }
                            notes = Note.find(selector).map(function(note) {
                                note.owner = Meteor.users.findOne(note.owner);
                                if (note.owner && note.owner.status) {
                                    if (note.owner.status.lastLogin) {

                                        if (moment(new Date).diff(moment(note.owner.status.lastLogin.date), 'days') > 2) {
                                            note.owner.statusLastLoginDate = moment(note.owner.status.lastLogin.date).format('L H[h]m');
                                        } else {
                                            note.owner.statusLastLoginDate = moment(note.owner.status.lastLogin.date).fromNow(); // in 40 minutes
                                        }
                                    }
                                    //console.log(note.owner.status.lastLogin.date);
                                    //moment(note.owner.status.lastLogin.date).format('L LT')
                                    //note.owner.status.lastLogin.dateTreated = '';
                                    if (note.owner.status.idle == true) {
                                        note.owner.statusColor = ' #FFC107';
                                        note.owner.statusName = ' Away';
                                    } else if (note.owner.status.online == true) {
                                        note.owner.statusColor = ' #9ACD32';
                                        note.owner.statusName = ' Online';
                                    } else {
                                        note.owner.statusColor = ' rgba(224, 224, 224, 0.77)';
                                        note.owner.statusName = ' Offline';
                                    }
                                } else {
                                    if (!note.owner) {
                                        note.owner = {};
                                    }
                                    note.owner.statusColor = ' rgba(224, 224, 224, 0.77)';
                                    note.owner.statusName = ' Offline';
                                }
                                // Imagem do gravatar.
                                if (note.owner.emails && note.owner.emails[0].address) {
                                    note.owner.img = 'http://www.gravatar.com/avatar/' + CryptoJS.MD5(note.owner.emails[0].address).toString() + '?s=60&d=mm';
                                } else {
                                    note.owner.img = 'http://www.gravatar.com/avatar/00000000000000000000000000000000?s=60&d=mm&f=y';
                                }

                                note.owner.nameTreated = note.owner.name + ' ' + note.owner.lastName;
                                if (note.owner.nameTreated.length > 14) {
                                    note.owner.nameTreated = note.owner.nameTreated.substr(0,13) + '...';
                                }
                                return note;
                            });
                        } else {
                            selector = {story:story._id, sprintId: sprintId, $or: [{statusId: status._id}, {statusId: ''}]};
                            if (member && member.length > 0) {
                                selector.owner = {$in: member};
                            }
                            notes = Note.find(selector).map(function(note) {
                                note.owner = Meteor.users.findOne(note.owner);
                                if (note.owner && note.owner.status) {

                                    if (note.owner.status && note.owner.status.lastLogin) {

                                        if (moment(new Date).diff(moment(note.owner.status.lastLogin.date), 'days') > 2) {
                                            note.owner.statusLastLoginDate = moment(note.owner.status.lastLogin.date).format('L H[h]m');
                                        } else {
                                            note.owner.statusLastLoginDate = moment(note.owner.status.lastLogin.date).fromNow(); // in 40 minutes
                                        }
                                    }
                                    //console.log(note.owner.status.lastLogin.date);
                                    //moment(note.owner.status.lastLogin.date).format('L LT')
                                    //note.owner.status.lastLogin.dateTreated = '';
                                    if (note.owner.status.idle == true) {
                                        note.owner.statusColor = ' #FFC107';
                                        note.owner.statusName = ' Away';
                                    } else if (note.owner.status.online == true) {
                                        note.owner.statusColor = ' #9ACD32';
                                        note.owner.statusName = ' Online';
                                    } else {
                                        note.owner.statusColor = ' rgba(224, 224, 224, 0.77)';
                                        note.owner.statusName = ' Offline';
                                    }
                                } else {
                                    if (!note.owner) {
                                        note.owner = {};
                                    }

                                    note.owner.statusColor = ' rgba(224, 224, 224, 0.77)';
                                    note.owner.statusName = ' Offline';
                                }
                                // Imagem do gravatar.
                                if (note.owner.emails && note.owner.emails[0].address) {
                                    note.owner.img = 'http://www.gravatar.com/avatar/' + CryptoJS.MD5(note.owner.emails[0].address).toString() + '?s=60&d=mm';
                                } else {
                                    note.owner.img = 'http://www.gravatar.com/avatar/00000000000000000000000000000000?s=60&d=mm&f=y';
                                }

                                note.owner.nameTreated = note.owner.name + ' ' + note.owner.lastName;
                                if (note.owner.nameTreated.length > 14) {
                                    note.owner.nameTreated = note.owner.nameTreated.substr(0,13) + '...';
                                }
                                return note;
                            });
                        }
                        status.notes = notes;
                       return status;
                    });

                    return story;
                }).filter(function(story){
                    if (member && member.length > 0) {
                        var notes = Note.find({story:story._id, sprintId: sprintId, owner: {$in: member}}).fetch();
                    } else {
                        var notes = Note.find({story:story._id, sprintId: sprintId}).fetch();
                    }
                    return (notes.length > 0);
                });

                setTimeout(function(){
                    sortableKanban();
                }, 300);

                return stories;
            },
            states: function(){
                var states = Status.find({projectId: this.getReactively('productId'), $or: [{trash: false}, {trash: null}]}, {sort: {order: 1, name: 1}}).fetch();
                states.unshift({name: 'To-do', _id: null});
                states.push({name: 'Done', _id: 1});
                return states;
            }
        });
        $scope.modalStorySave = function (ev, id) {
            $mdDialog.show({
                controller: 'StorySaveCtrl',
                templateUrl: 'module/scrum/client/view/story-save.ng.html',
                clickOutsideToClose: true,
                locals: {id: id},
                targetEvent: ev
            });
        };
        $scope.modalNoteSave = function (ev, id, storyId) {
            $mdDialog.show({
                controller: 'NoteSaveCtrl',
                templateUrl: 'module/scrum/client/view/note-save.ng.html',
                clickOutsideToClose: true,
                targetEvent: ev,
                locals: {
                    id: id,
                    storyId: storyId,
                    sprint: ''
                }
            }).then(function (answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function () {
                $scope.status = 'You cancelled the dialog.';
            });
        };

        $scope.modalNoteView = function (ev, id, storyId) {
            $mdDialog.show({
                controller: 'NoteViewCtrl',
                templateUrl: 'module/scrum/client/view/note-view.ng.html',
                clickOutsideToClose: true,
                targetEvent: ev,
                locals: {
                    id: id,
                    storyId: storyId
                }
            }).then(function (answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function () {
                $scope.status = 'You cancelled the dialog.';
            });
        };

        this.noteTrash = function($id){
            Meteor.call('noteTrash', {id: $id, trash: true}, function (error) {
                if (error) {
                    Materialize.toast('Erro: ' + error, 4000);
                } else {
                    Materialize.toast('Deleted successfully!', 4000);
                }
            });
        };


        this.modalStatusSave = function (ev, id) {
            $mdDialog.show({
                controller: 'StatusSaveCtrl',
                templateUrl: 'module/scrum/client/view/status-save.ng.html',
                clickOutsideToClose: true,
                locals: {'id': id},
                targetEvent: ev
            }).then(function (answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function () {
                $scope.status = 'You cancelled the dialog.';
            });
        };
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