//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('user').controller('ContactListCtrl', ['$scope', '$timeout', '$mdSidenav', '$mdUtil', '$log', '$reactive', '$rootScope',
    function ($scope, $timeout, $mdSidenav, $mdUtil, $log, $reactive, $rootScope) {
        $reactive(this).attach($scope);

        $('body').on('click', '#sidenav-overlay', function(){
            $rootScope.chatIsOpen = false;
            console.log('clicou fora')
        });

        if (user && user.chat && user.chat.side && user.chat.side == 'left') {
            chatSide = 'left';
        } else {
            chatSide = 'right';
        }

        $rootScope.showNavContactList = function () {
            $('.nav-button-chat-'+chatSide).sideNav('hide');
            $('.nav-button-contact-'+chatSide).sideNav('hide');
            $('.nav-button-contact-'+chatSide).sideNav('show');
        };

        $rootScope.hideNavContactList = function () {
            $('.nav-button-chat-'+chatSide).sideNav('hide');
            $('.nav-button-contact-'+chatSide).sideNav('hide');
        };

        Meteor.subscribe('users');
        Meteor.subscribe('userStatus');
        this.helpers({
            user: function(){
                var user = Meteor.users.findOne(Meteor.userId());
                if (user) {
                    if (user && user.status) {
                        if (user.status.idle) {
                            user.statusColor = ' #FFC107';
                            user.statusName = ' Ausente';
                        } else {
                            user.statusColor = ' #9ACD32';
                            user.statusName = ' Online';
                        }
                    } else {
                        user.statusColor = ' rgba(224, 224, 224, 0.77)';
                        user.statusName = ' Offline';
                    }

                    // Imagem do gravatar.
                    if (user.emails && user.emails[0].address) {
                        user.img = 'http://www.gravatar.com/avatar/'+CryptoJS.MD5(user.emails[0].address).toString()+'?s=40&d=mm';
                    } else {
                        user.img = 'http://www.gravatar.com/avatar/00000000000000000000000000000000?s=40&d=mm&f=y';
                    }

                    user.nameTreated = user.name + ' ' + user.lastName;
                    if (user.nameTreated.length > 16) {
                        user.nameTreated = user.nameTreated.substr(0,13) + '...';
                    }
                }

                return user;
            },
            usersOnline: function () {
                users = Meteor.users.find({
                    $and: [
                        {_id: { $not: Meteor.userId()}},
                        {'status.online': true}
                    ]
                }, { sort: {name: 1, lastName: 1} }).map(function (user) {
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

                        if (user.messagesNotVisualized == 0){
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
                                user.statusName = ' Ausente';
                            } else if(user.status.online == true) {
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
                            user.img = 'http://www.gravatar.com/avatar/'+CryptoJS.MD5(user.emails[0].address).toString()+'?s=40&d=mm';
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
            usersOnlineTotal: function()
            {
                users = Meteor.users.find({
                    $and: [
                        {_id: { $not: Meteor.userId()}},
                        {'status.online': true}
                    ]
                }).fetch();

                return users.length;
            },
            usersOfflineTotal: function()
            {
                users = Meteor.users.find({
                    $and: [
                        {_id: { $not: Meteor.userId()}},
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
                        {_id: { $not: Meteor.userId()}},
                        {
                            $or: [
                                {'status.online': false},
                                {'status.online': ''},
                                {'status.online': null},
                            ]
                        }
                    ]
                }, { sort: {name: 1, lastName: 1} }).map(function (user) {
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

                        if (user.messagesNotVisualized == 0){
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
                            console.log(user.status);
                            //console.log(user.status.lastLogin.date);
                            //moment(user.status.lastLogin.date).format('L LT')
                            //user.status.lastLogin.dateTreated = '';
                            if (user.status.idle == true) {
                                user.statusColor = ' #FFC107';
                                user.statusName = ' Ausente';
                            } else if(user.status.online == true) {
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
                            user.img = 'http://www.gravatar.com/avatar/'+CryptoJS.MD5(user.emails[0].address).toString()+'?s=40&d=mm';
                        } else {
                            user.img = 'http://www.gravatar.com/avatar/00000000000000000000000000000000?s=40&d=mm&f=y';
                        }

                        return user;
                    },
                    {
                        sort: {name: 1, lastName: 1}
                    }
                );
                //console.log(users);
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
            }
        });
    }
]);