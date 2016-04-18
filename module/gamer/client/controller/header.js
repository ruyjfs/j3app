//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('gamer').controller('HeaderCtrl',
    [
        '$scope', '$timeout', '$mdSidenav', '$mdUtil', '$log', '$location', '$reactive', '$mdDialog', '$mdBottomSheet', '$rootScope', '$mdToast',
        '$stateParams', '$state',
    function ($scope, $timeout, $mdSidenav, $mdUtil, $log, $location, $reactive, $mdDialog, $mdBottomSheet, $rootScope, $mdToast, $stateParams, $state) {
        $reactive(this).attach($scope);

        //this.toggleMenu = buildToggler('menu');
        //this.toggleContactList = buildToggler('contact-list');

        // Submetendo o formulario com enter.
        //$('body').on('keypress', 'input',function(keyEvent, element){
        //    if (keyEvent.keyCode === 13) {
        //        console.log($(keyEvent.target).closest('form').submit());
        //        console.log(keyEvent);
        //        console.log('aeeeeee');
        //        //cordova.plugins.Keyboard.close();
        //    }
        //})
        this.id = $stateParams.id;
        this.sprintId = $stateParams.sprintId;

        //$('.nav-button-left').sideNav({
        //    closeOnClick: true
        //});
        //$('.button-collapse').sideNav({
        //    closeOnClick: true,
        //});
        //$('.nav-button-close-left').sideNav({
        //    closeOnClick: true,
        //    edge: 'left'
        //});
        //$('.nav-button-rigth').sideNav({
        //    closeOnClick: true,
        //});

        isInt = function (n) {
            return parseInt(n) === n
        };

        //this.subscribe('status', function(){return [$stateParams.id]});
        //this.subscribe('story', function(){return [$stateParams.id]});
        //this.subscribe('sprint', function(){return [$stateParams.id]});
        this.subscribe('users');
        this.subscribe('message');
        this.subscribe('project');
        this.subscribe('team');
        this.subscribe('status', function(){return [$stateParams.id]});
        this.subscribe('note', function(){return [$stateParams.id]});
        this.subscribe('story', function(){return [$stateParams.id]});
        this.subscribe('sprint', function(){return [$stateParams.id]});
        $scope.helpers({
            sprint: function () {
                dateNow = moment().format('x');

                if ($stateParams.sprintId == '1' || $stateParams.sprintId == '') {

                    Meteor.call('sprintCreate', $stateParams.id, function (error, result) {
                        if (error) {
                            console.log(error);
                        } else {
                            //console.log('Saved!');
                            //$scope.form = '';
                            //$mdDialog.hide();
                        }
                        //$rootScope.titleMiddle = result.dateStart + ' - ' + result.dateEnd + ' (' + result.number + ')';
                        $rootScope.titleMiddle = ' (' + result.number + ') ' + moment(result.dateStart).format('L') + ' - ' + moment(result.dateEnd).format('L');

                        if ($stateParams.sprintId == 1 || $stateParams.sprintId == '') {
                            $state.go('scrum/productkanban', {id: $stateParams.id, sprintId: result._id})
                        }
                    });
                    sprint = Sprint.findOne(
                        {
                            $and: [
                                {projectId: $stateParams.id},
                                {dateStart: {$lte: dateNow}, dateEnd: {$gte: dateNow}}
                            ]
                        }
                    );
                } else {
                    sprint = Sprint.findOne($stateParams.sprintId);
                }

                if (sprint) {
                    project = Project.findOne($stateParams.id);

                    if (typeof(sprint.dateStart) === 'string') {
                        sprint.dateStartTreated = moment(sprint.dateStart, 'x').format('L');
                        sprint.dateEndTreated = moment(sprint.dateEnd, 'x').format('L');
                        sprint.days = moment(sprint.dateEnd, 'x').diff(moment(sprint.dateStart, 'x'), 'days') + 1;
                    } else {
                        sprint.dateStartTreated = moment(sprint.dateStart).format('L');
                        sprint.dateEndTreated = moment(sprint.dateEnd).format('L');
                        sprint.days = moment(sprint.dateEnd).diff(moment(sprint.dateStart), 'days') + 1;
                    }

                    if (project.skipWeekend) {
                        if (typeof(sprint.dateStart) === 'string') {
                            sprint.daysBusiness = moment(sprint.dateEnd, 'x').businessDiff(moment(sprint.dateStart, 'x'), 'days');
                        } else {
                            sprint.daysBusiness = moment(sprint.dateEnd).businessDiff(moment(sprint.dateStart), 'days');
                        }
                        sprint.days = sprint.daysBusiness;
                    }
                    if (project.teams) {
                        teams = Team.find({_id: {$in: project.teams}}).fetch().map(function (team) {
                            if (team.members) {
                                team.members = Meteor.users.find({_id: {$in: team.members}}).fetch();
                                team.membersTotal = team.members.length;
                                team.timeTotal = team.membersTotal * team.time;
                            }
                            return team;
                        });
                    }

                    if (teams) {
                        timeTotal = 0;
                        teams.forEach(function (value) {
                            if (isInt(parseInt(value.timeTotal))) {
                                timeTotal = parseInt(value.timeTotal) + timeTotal;
                            }
                        });

                        sprint.timeTotal = timeTotal * sprint.days;
                    } else {
                        sprint.timeTotal = 0;
                    }

                    notes = Note.find({
                        $and: [{sprintId: $stateParams.sprintId}],
                        $or: [{projectId: $stateParams.id}, {projectId: null}]
                    }).fetch();
                    notes.map(function (note) {
                        note.story = Story.findOne(note.story);
                        note.owner = Meteor.users.findOne(note.owner);
                        if (note.statusId == '1') {
                            note.color = '#dbdbdb';
                        } else {
                            if (note.story) {
                                note.color = note.story.color;
                            } else {
                                note.story = '#000';
                            }
                        }
                        return note;
                    });

                    if (notes) {
                        timeTotal = 0;
                        notes.forEach(function (value) {
                            //console.log(value);
                            if (isInt(parseInt(value.time))) {
                                timeTotal = parseInt(value.time) + timeTotal;
                            }
                        });
                        sprint.timeTotalNotes = timeTotal;
                    } else {
                        sprint.timeTotalNotes = 0;
                    }

                    notesDone = Note.find({
                        $and: [{sprintId: $stateParams.sprintId}, {statusId: '1'}],
                        $or: [{projectId: $stateParams.id}, {projectId: null}]
                    }).fetch();
                    //console.log(notesDone);
                    if (notesDone) {
                        timeTotal = 0;
                        notesDone.forEach(function (value) {
                            //console.log(value);
                            if (isInt(parseInt(value.time))) {
                                timeTotal = parseInt(value.time) + timeTotal;
                            }
                        });
                        sprint.timeTotalNotesDone = timeTotal;
                    } else {
                        sprint.timeTotalNotesDone = 0;
                    }

                    //console.log('sprint.timeTotalNotesDone');
                    //console.log(sprint.timeTotalNotesDone);
                    //console.log(sprint.timeTotal);
                    //console.log(sprint.timeTotalNotes);

                    //if (sprint && sprint.timeTotalNotesDone && sprint.timeTotalNotes && sprint.timeTotal) {
                    sprint.progressDone = sprint.timeTotalNotesDone * 100 / sprint.timeTotal;
                    sprint.progress = sprint.timeTotalNotes * 100 / sprint.timeTotal;
                    //} else {
                    //    sprint.progressDone = 0;
                    //    sprint.progress = 0;
                    //}
console.log(sprint.dateStart);
                    //console.log(sprint.progress);
                    if (typeof(sprint.dateStart) === 'string') {
                        $rootScope.titleMiddle = ' (' + sprint.number + ') ' + moment(sprint.dateStart, 'x').format('L') + ' - ' + moment(sprint.dateEnd, 'x').format('L');
                    } else {
                        $rootScope.titleMiddle = ' (' + sprint.number + ') ' + moment(sprint.dateStart).format('L') + ' - ' + moment(sprint.dateEnd).format('L');
                    }
                    //sprint.hoursMember = project.ti;
                }

                $rootScope.sprint = sprint;
                return sprint;
            },
        });

        Meteor.users.find({"status.online": true}).observe({
            added: function (user) {
                if (Meteor.userId() && Meteor.userId() !== user._id){
                    //Materialize.toast(user.name + ' ' + user.lastName + ' is online;', 4000);

                    Meteor.subscribe('users');
                    var user = Meteor.users.findOne(user._id);
                    if (user) {
                        if (user.status) {
                            if (user.status.idle == true) {
                                user.statusColor = ' #FFC107';
                                user.statusName = ' Away';
                            } else if (user.status.online == true) {
                                user.statusColor = ' #9ACD32';
                                user.statusName = ' online';
                            } else {
                                user.statusColor = ' rgba(224, 224, 224, 0.77)';
                                user.statusName = ' offline';
                            }
                        } else {
                            user.statusColor = ' rgba(224, 224, 224, 0.77)';
                            user.statusName = ' offline';
                        }

                        // Imagem do gravatar.
                        if (user.emails && user.emails[0].address) {
                            user.img = 'http://www.gravatar.com/avatar/'+CryptoJS.MD5(user.emails[0].address).toString()+'?s=40&d=mm';
                        } else {
                            user.img = 'http://www.gravatar.com/avatar/00000000000000000000000000000000?s=40&d=mm&f=y';
                        }

                        user.nameTreated = user.name + ' ' + user.lastName;
                        if (user.nameTreated.length > 14) {
                            user.nameTreated = user.nameTreated.substr(0,13) + '...';
                        }
                    }
                    setTimeout(function(){
                        $mdToast.show({
                            hideDelay   : 4000,
                            //position    : 'right',
                            module: 'user',
                            controller  : 'ToastUserCtrl',
                            templateUrl: 'module/user/client/views/toast-user.ng.html',
                            locals: {
                                user: user
                            },
                        });
                    }, 300);
                }
                //$mdToast.show(
                //    $mdToast.simple()
                //        .textContent('Simple Toast!')
                //        .position({bottom:true})
                //        .hideDelay(3000)
                //);

                // id just came online
            },
            removed: function (user) {
                //console.log('offline');

                if (Meteor.userId() && Meteor.userId() !== user._id){
                    //Materialize.toast(user.name + ' ' + user.lastName + ' is offline;', 4000);
                    Meteor.subscribe('users');
                    var user = Meteor.users.findOne(user._id);
                    if (user) {
                        if (user.status) {
                            if (user.status.idle == true) {
                                user.statusColor = ' #FFC107';
                                user.statusName = ' Away';
                            } else if (user.status.online == true) {
                                user.statusColor = ' #9ACD32';
                                user.statusName = ' online';
                            } else {
                                user.statusColor = ' rgba(224, 224, 224, 0.77)';
                                user.statusName = ' offline';
                            }
                        } else {
                            user.statusColor = ' rgba(224, 224, 224, 0.77)';
                            user.statusName = ' offline';
                        }

                        // Imagem do gravatar.
                        if (user.emails && user.emails[0].address) {
                            user.img = 'http://www.gravatar.com/avatar/'+CryptoJS.MD5(user.emails[0].address).toString()+'?s=40&d=mm';
                        } else {
                            user.img = 'http://www.gravatar.com/avatar/00000000000000000000000000000000?s=40&d=mm&f=y';
                        }

                        user.nameTreated = user.name + ' ' + user.lastName;
                        if (user.nameTreated.length > 14) {
                            user.nameTreated = user.nameTreated.substr(0,13) + '...';
                        }
                    }
                    setTimeout(function(){
                        $mdToast.show({
                            hideDelay   : 4000,
                            //position    : 'right',
                            module: 'user',
                            controller  : 'ToastUserCtrl',
                            templateUrl: 'module/user/client/views/toast-user.ng.html',
                            locals: {
                                user: user
                            },
                        });
                    }, 300);
                }
                // id just went offline
            }
        });

        this.helpers(
            {
                totalMessagesNotVisualized: function () {
                    user = Meteor.users.find().map(function (user) {
                        user.messagesNotVisualized = Message.find(
                            {
                                $and: [
                                    {
                                        'userId': user._id,
                                        'contactId': Meteor.userId(),
                                        $or: [
                                            {visualized: ''},
                                            {visualized: null}
                                        ]
                                    },
                                ]
                            }
                        ).fetch().length;
                        return user;
                    }).filter(function (user) {
                        return (user.messagesNotVisualized > 0);
                    });

                    if (user.length > 99) {
                        return '99+'
                    } else if (user.length > 0) {
                        return user.length;
                    } else {
                        return '';
                    }
                },
                isGuest: function () {
                    if (Meteor.userId()) {
                        return false;
                    } else {
                        return true;
                    }
                }
            }
        );

        this.title = 'Brotherhood';
        this.redirect = function (route) {
            arrTitle = route.split('/');
            $scope.title = arrTitle[1];
            $mdSidenav('menu').close();
            $location.path(route);
        };

        this.showModulesGrid = function ($event) {
            //console.log($mdBottomSheet);
            $scope.alert = '';
            $mdBottomSheet.show({
                module: 'user',
                controller: 'ModulesGridCtrl',
                templateUrl: 'module/user/client/views/modules-grid.ng.html',
                clickOutsideToClose: true,
                targetEvent: $event
            }).then(function (clickedItem) {
                //$mdToast.show(
                //    $mdToast.simple()
                //        .textContent(clickedItem['name'] + ' clicked!')
                //        .position('top right')
                //        .hideDelay(1500)
                //);
            });
        };

        $scope.modalSprintChange = function (ev) {
            $mdDialog.show({
                controller: 'SprintChangeCtrl',
                templateUrl: 'module/scrum/client/view/sprint-change.ng.html',
                clickOutsideToClose: true,
                targetEvent: ev
            }).then(function (answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function () {
                $scope.status = 'You cancelled the dialog.';
            });
        };

        this.modalLogin = function (ev, id) {
            //$mdDialog.alert()
            //    .parent(angular.element(document.querySelector('#popupContainer')))
            //    .clickOutsideToClose(true)
            //    .title('This is an alert title')
            //    .content('You can specify some description text in here.')
            //    .ariaLabel('Alert Dialog Demo')
            //    .ok('Got it!')
            //    .targetEvent(ev)

            $mdDialog.show({
                module: 'user',
                controller: 'LoginModalCtrl',
                templateUrl: 'module/user/client/views/login-modal.ng.html',
                clickOutsideToClose: true,
                locals: {
                    id: id
                },
                targetEvent: ev
            }).then(function (answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function () {
                $scope.status = 'You cancelled the dialog.';
            });
        };

        /**
         * Build handler to open/close a SideNav; when animation finishes
         * report completion in console
         */
        //function buildToggler(navID) {
        //    var debounceFn = $mdUtil.debounce(function () {
        //        $mdSidenav(navID)
        //            .toggle()
        //            .then(function () {
        //                $log.debug("toggle " + navID + " is done");
        //                //$scope.messages = [];
        //                //console.info('ENTROU MANO')
        //            });
        //    }, 200);
        //    return debounceFn;
        //}
    }
]);