angular.module('scrum').controller('ProjectTeamCtrl',
    function ($scope, $mdDialog, $mdSidenav, $mdUtil, $log, $reactive, $stateParams) {
        $reactive(this).attach($scope);
        $scope.booLoading = false;
        $('#progressBar').fadeOut('slow');

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
        // this.subscribe('users');
        // this.subscribe('project');
        // this.subscribe('team', function(){return [$stateParams.organization]});
        // this.subscribe('status', function(){return [$stateParams.id]});
        // this.subscribe('note', function(){return [$stateParams.id]});
        // this.subscribe('story', function(){return [$stateParams.id]});
        // this.subscribe('sprint', function(){return [$stateParams.id]});

        $scope.progressBar = {};
        $scope.progressBar.users = Meteor.subscribe('users').ready();
        this.subscribe('users', () => {}, {onReady: () => {$scope.progressBar.users = true;}});
        $scope.progressBar.organization = Meteor.subscribe('organization').ready();
        this.subscribe('organization', () => {}, {onReady: () => {$scope.progressBar.organization = true;}});
        $scope.progressBar.project = Meteor.subscribe('project').ready();
        this.subscribe('project', () => {}, {onReady: () => {$scope.progressBar.project = true;}});
        $scope.progressBar.team = Meteor.subscribe('team', $stateParams.organization).ready();
        this.subscribe('team', () => {return [$stateParams.organization]}, {onReady: () => {$scope.progressBar.team = true;}});
        $scope.progressBar.sprint = Meteor.subscribe('team', $stateParams.organization).ready();
        this.subscribe('sprint', () => {return [$stateParams.organization]}, {onReady: () => {$scope.progressBar.sprint = true;}});
        $scope.progressBar.burndown = Meteor.subscribe('burndown', $stateParams.organization).ready();
        this.subscribe('burndown', function(){return [$stateParams.product]}, {onReady: () => {$scope.progressBar.burndown = true;}});
        $scope.progressBar.status = Meteor.subscribe('status', $stateParams.product).ready();
        this.subscribe('status', function(){return [$stateParams.product]}, {onReady: () => {$scope.progressBar.status = true;}});
        $scope.progressBar.note = Meteor.subscribe('note', $stateParams.product).ready();
        this.subscribe('note', function(){return [$stateParams.product, {}, this.getReactively('searchText')]}, {onReady: () => {$scope.progressBar.note = true;}});
        $scope.progressBar.story = Meteor.subscribe('story', $stateParams.product).ready();
        this.subscribe('story', function(){return [$stateParams.product]}, {onReady: () => {$scope.progressBar.story = true;}});
        $scope.progressBar.sprint = Meteor.subscribe('sprint', $stateParams.product).ready();
        this.subscribe('sprint', function(){return [$stateParams.product]}, {onReady: () => {$scope.progressBar.sprint = true;}});
        $scope.booLoading = true;
        $scope.$watchCollection('progressBar', function() {
            if (
                $scope.progressBar.users,
                    $scope.progressBar.organization,
                    $scope.progressBar.project,
                    $scope.progressBar.team,
                    $scope.progressBar.burndown,
                    $scope.progressBar.status,
                    $scope.progressBar.note,
                    $scope.progressBar.story,
                    $scope.progressBar.sprint
            ) {
                // let organisations = Organization.find({}, {sort: {name: 1}}).map((organization) => {return organization});
                // if (organisations.length == 0) {
                //     if (Session.get('booMsgOrganization') != true) {
                //         Materialize.toast(
                //             $translate.instant('Hi, my name is Ryu, i will help you with whatever it takes.')
                //             , 120000);
                //         Materialize.toast(
                //             $translate.instant('You have no organization, click the red button to create an organization, or contact the owner of an organization to add you to their organization.')
                //             , 120000);
                //         Materialize.toast(
                //             $translate.instant('You can create products without organization, just enter the card without organization. For more information, click on the question mark icon in the top menu.')
                //             , 120000);
                //         Materialize.toast(
                //             $translate.instant('If you have any questions or suggestions, please contact us at contact@j3scrum.com.')
                //             , 120000);
                //         Materialize.toast(
                //             $translate.instant('To close these messages, drag to the side.')
                //             , 120000);
                //         Materialize.toast(
                //             $translate.instant("I'm so glad you joined j3scrum, many things are still to come, best regards!!!")
                //             , 120000);
                //         Session.set('booMsgOrganization', true);
                //     }
                //     $document.ready(() => {
                //         $('.md-fab').addClass('pulse');
                //         console.log($('.md-fab'));
                //     });
                // }
                $scope.booLoading = false;
                $('#progressBar').fadeOut('slow');
            }
        });

        this.helpers({
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
            teams: function() {
                $stateParams.sprintId = this.getReactively('sprintId');

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
                controller: 'NoteUserSprintCtrl as ctrl',
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
    }
);