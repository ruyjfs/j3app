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

                return user;
            },
            users: function () {
                users = Meteor.users.find({_id: { $not: Meteor.userId()}}).map(function (user) {
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
            }
        });
    }
]);