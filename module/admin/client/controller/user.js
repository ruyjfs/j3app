//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams'',
//    function($scope, $stateParams){
    angular.module("admin").controller("UserCtrl", ['$scope', '$state', '$mdDialog', '$reactive', '$rootScope', '$stateParams',
    function ($scope, $state, $mdDialog, $reactive, $rootScope, $stateParams) {
        $reactive(this).attach($scope);

        $scope.teste = '1';
        this.teste2 = '2';

        //console.log(Meteor.user()._id);

        this.subscribe('users');
        this.subscribe('userStatus');
        this.subscribe('project');
        this.subscribe('team', function(){return [$stateParams.organization]});
        this.helpers({
            users: function () {
                users = Meteor.users.find({});
                console.log(users);
                //teams = Team.find(
                //    {
                //        //$or: [{userId: Meteor.user()._id}, {members : Meteor.user()._id}]
                //        $or: [
                //            {
                //                'userId' : Meteor.user()._id,
                //            }
                //            ,
                //            {
                //                'members' : Meteor.user()._id,
                //                //'userId' : contactId,
                //                //'contactId' : $rootScope.currentUser._id
                //            }
                //        ]
                //    });
                return users;
            },
            usersOnline: function () {
                users = Meteor.users.find({
                    $and: [
                        {_id: {$not: Meteor.userId()}},
                        {'status.online': true}
                    ]
                }, {sort: {name: 1, lastName: 1}}).map(function (user) {
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

                        if (user.messagesNotVisualized > 99) {
                            user.messagesNotVisualized = '99+'
                        }

                        if (user.messagesNotVisualized == 0) {
                            user.messagesNotVisualized = '';
                        } else {
                            //if ($rootScope.chat) {
                            var s = new buzz.sound('/sound/message-msn.mp3');
                            s.play();
                            //}
                        }

                        if (user && user.status) {
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
                            user.img = 'http://www.gravatar.com/avatar/' + CryptoJS.MD5(user.emails[0].address).toString() + '?s=40&d=mm';
                        } else {
                            user.img = 'http://www.gravatar.com/avatar/00000000000000000000000000000000?s=40&d=mm&f=y';
                        }

                        return user;
                    },
                    {
                        sort: {name: 1, lastName: 1}
                    }
                );
                //var users = Meteor.users.find(
                //    {
                //        //$or: [
                //        //    {
                //        //        'userId' : $rootScope.currentUser._id,
                //        //        'contactId' : contactId
                //        //    }
                //        //    ,
                //        //    {
                //        //        'userId' : contactId,
                //        //        'contactId' : $rootScope.currentUser._id
                //        //    }
                //        //]
                //    },
                //    {
                //        sort: {name: 1, lastName: 1, email: 1}
                //        //[
                //        //    name, 'asc'
                //        //    //[name, 'asc'],
                //        //    //[email, 'asc'],
                //        //]
                //    }
                //).fetch();
                //console.log(users);
                return users;
            },
            usersOnlineTotal: function () {
                users = Meteor.users.find({
                    $and: [
                        {_id: {$not: Meteor.userId()}},
                        {'status.online': true}
                    ]
                }).fetch();

                return users.length;
            },
            usersOfflineTotal: function () {
                users = Meteor.users.find({
                    $and: [
                        {_id: {$not: Meteor.userId()}},
                        {
                            $or: [
                                {'status.online': false},
                                {'status.online': ''},
                                {'status.online': null},
                            ]
                        }
                    ]
                }).fetch();

                return users.length;
            },
            usersOffline: function () {
                users = Meteor.users.find({
                    $and: [
                        {_id: {$not: Meteor.userId()}},
                        {
                            $or: [
                                {'status.online': false},
                                {'status.online': ''},
                                {'status.online': null},
                            ]
                        }
                    ]
                }, {sort: {name: 1, lastName: 1}}).map(function (user) {
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


                        if (user.messagesNotVisualized > 99) {
                            user.messagesNotVisualized = '99+'
                        }

                        if (user.messagesNotVisualized == 0) {
                            user.messagesNotVisualized = '';
                        } else {
                            //if ($rootScope.chat) {
                            var s = new buzz.sound('/sound/message-msn.mp3');
                            s.play();
                            //}
                        }

                        if (user && user.status) {

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
                            user.img = 'http://www.gravatar.com/avatar/' + CryptoJS.MD5(user.emails[0].address).toString() + '?s=40&d=mm';
                        } else {
                            user.img = 'http://www.gravatar.com/avatar/00000000000000000000000000000000?s=40&d=mm&f=y';
                        }

                        return user;
                    },
                    {
                        sort: {name: 1, lastName: 1}
                    }
                );
                return users;
                //return [];
            }
        });

        //this.projects = Project.find(
        //                {
        //                    //$or: [
        //                    //    {
        //                    //        'userId' : $rootScope.currentUser._id,
        //                    //        'contactId' : contactId
        //                    //    }
        //                    //    ,
        //                    //    {
        //                    //        'userId' : contactId,
        //                    //        'contactId' : $rootScope.currentUser._id
        //                    //    }
        //                    //]
        //                }
        //            );
        //
        //console.log(this.projects);

        //this.projects = $meteor.collection( function() {
        //    return Project.find(
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

        //$scope.projects = [];
//console.log($rootScope.currentUser._id);
//console.log($rootScope.currentUser);

        this.items = [
            { name: "Project", icon: "business_center", direction: "left", color: 'red' },
            { name: "Team", icon: "group_work", direction: "top", color: 'blue' }
        ];

        this.isOwner = function(userId) {
            if (userId) {
                return (Meteor.user()._id == userId);
            } else {
                return true;
            }
        }

        this.remove = function (id) {
            this.projects.remove(id);
        }

        this.modalUserSave = function (ev, id) {
            $mdDialog.show({
                controller: 'UserSaveModalCtrl',
                templateUrl: 'module/admin/client/view/user-save-modal.ng.html',
                clickOutsideToClose: true,
                locals: {
                    id: id
                },
                targetEvent: ev
            }).then(function (answer) {
                this.status = 'You said the information was "' + answer + '".';
            }, function () {
                this.status = 'You cancelled the dialog.';
            });
        };
    }]);