//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('scrum').controller('ProjectTeamCtrl', [ '$scope', '$mdDialog', '$mdSidenav', '$mdUtil', '$log', '$reactive', '$stateParams',
    function ($scope, $mdDialog, $mdSidenav, $mdUtil, $log, $reactive, $stateParams) {
        $reactive(this).attach($scope);

        //this.id = $stateParams.id;
        //this.sprintId = $stateParams.sprintId;

        //this.searchText = '';
        //this.subscribe('team', function(){
        //        return [
        //            {},
        //            this.getReactively('searchText')
        //        ]
        //    }
        //);
        this.subscribe('users');
        this.subscribe('project');
        this.subscribe('team');
        this.subscribe('status', function(){return [$stateParams.id]});
        this.subscribe('note', function(){return [$stateParams.id]});
        this.subscribe('story', function(){return [$stateParams.id]});
        this.subscribe('sprint', function(){return [$stateParams.id]});
        this.helpers({
            teams: function() {
                console.info($stateParams.id)
                $stateParams.sprintId = Sprint.findOne({projectId: $stateParams.id, number: parseInt($stateParams.sprint)})._id;

                project = Project.findOne($stateParams.id);
                if (Meteor.user()){
                    userId = Meteor.userId();
                } else {
                    userId = '';
                }

                //if (project.teams) {
                //    teams = project.teams.map(function(team){
                //        team = Team.findOne(team);
                //        return team;
                //    });
                //}

                if (project && project.teams) {
                    teams = Team.find({_id: {$in: project.teams}}).fetch().map(function(team){
                        if (team.members) {
                            team.members = Meteor.users.find({_id: {$in: team.members}}).map(function(user){
                                if (user.status) {
                                    if (user.status.lastLogin) {
                                        if (moment(new Date).diff(moment(user.status.lastLogin.date), 'days') > 2) {
                                            user.statusLastLoginDate = moment(user.status.lastLogin.date).format('L H[h]m');
                                        } else {
                                            user.statusLastLoginDate = moment(user.status.lastLogin.date).fromNow(); // in 40 minutes
                                        }
                                    }
                                    //console.log(user.status.lastLogin.date);
                                    //moment(user.status.lastLogin.date).format('L LT')
                                    //user.status.lastLogin.dateTreated = '';
                                    if (user.status.idle == true) {
                                        user.statusColor = ' #FFC107';
                                        user.statusName = ' Away';
                                    } else if (user.status.online == true) {
                                        user.statusColor = ' #9ACD32';
                                        user.statusName = ' Online';
                                    } else {
                                        user.statusColor = ' rgba(224, 224, 224, 0.77)';
                                        user.statusName = ' Offline';
                                    }
                                } else {
                                    user.statusColor = ' rgba(224, 224, 224, 0.77)';
                                    user.statusName = ' Offline';
                                }
                                // Imagem do gravatar.
                                if (user.emails && user.emails[0].address) {
                                    user.img = 'http://www.gravatar.com/avatar/' + CryptoJS.MD5(user.emails[0].address).toString() + '?s=60&d=mm';
                                } else {
                                    user.img = 'http://www.gravatar.com/avatar/00000000000000000000000000000000?s=60&d=mm&f=y';
                                }
                                user.nameTreated = user.name + ' ' + user.lastName;
                                if (user.nameTreated.length > 14) {
                                    user.nameTreated = user.nameTreated.substr(0,13) + '...';
                                }

                                sprint = Sprint.findOne({_id: $stateParams.sprintId});

                                if (sprint) {
                                    sprintPreviousNumber = sprint.number - 1;
                                    sprintNextNumber = sprint.number + 1;
                                    sprintPrevious = Sprint.findOne({projectId: $stateParams.id, number: sprintPreviousNumber});
                                    sprintNext = Sprint.findOne({projectId: $stateParams.id, number: sprintNextNumber});

                                    if (sprintPrevious) {
                                        notesPrevious = Note.find({sprintId: sprintPrevious._id, owner: user._id}).fetch();
                                    } else {
                                        notesPrevious = [];
                                    }
                                    notesCurrent = Note.find({sprintId: sprint._id, owner: user._id}).fetch();
                                    notesNext = Note.find({sprintId: sprintNext._id, owner: user._id}).fetch();
                                    if (sprintPrevious) {
                                        notesDonePrevious = Note.find({sprintId: sprintPrevious._id, owner: user._id, statusId: '1'}).fetch();
                                    } else {
                                        notesDonePrevious = [];
                                    }
                                    notesDoneCurrent = Note.find({sprintId: sprint._id, owner: user._id, statusId: '1'}).fetch();
                                    notesDoneNext = Note.find({sprintId: sprintNext._id, owner: user._id, statusId: '1'}).fetch();
                                } else {
                                    sprintPreviousNumber = 0;
                                    sprintPrevious = {};
                                    sprintNextNumber = 2;
                                    sprintNext = Sprint.findOne({projectId: $stateParams.id, number: sprintNextNumber});
                                    notesDonePrevious = [];
                                    notesDoneCurrent = [];
                                    notesDoneNext = [];
                                    notesPrevious = [];
                                    notesCurrent = [];
                                    notesNext = [];
                                }

                                user.sprintIdPrevious = (sprintPrevious)? sprintPrevious._id : '';
                                user.sprintIdCurrent = (sprint) ? sprint._id: '';
                                user.sprintIdNext = (sprintNext) ? sprintNext._id : '';

                                user.sprintPrevious = {taskRemaining: notesDonePrevious.length, taskTotal: notesPrevious.length};
                                user.sprintCurrent = {taskRemaining: notesDoneCurrent.length, taskTotal: notesCurrent.length};
                                user.sprintNext = {taskRemaining: notesDoneNext.length, taskTotal: notesNext.length};

                                return user;
                            });

                        }
                        return team;
                    });
                } else {
                    teams = {}
                }

                //teams = Team.find(
                //    {
                //        //$or: [{userId: Meteor.user()._id}, {members : Meteor.user()._id}]
                //        $or: [
                //            {
                //                'userId' : userId,
                //            }
                //            ,
                //            {
                //                'members' : userId,
                //                //'userId' : contactId,
                //                //'contactId' : $rootScope.currentUser._id
                //            }
                //        ]
                //    }).map(function(team){
                //
                //        return team;
                //    });
                return teams;
            }
        });

        this.modalNoteUserSprint = function (ev, sprintId) {
            $mdDialog.show({
                controller: 'NoteUserSprintCtrl',
                templateUrl: 'module/scrum/client/view/note-user-sprint.ng.html',
                clickOutsideToClose: true,
                targetEvent: ev,
                locals: {
                    sprintId: sprintId
                }
            }).then(function (answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function () {
                $scope.status = 'You cancelled the dialog.';
            });
        };
}]);