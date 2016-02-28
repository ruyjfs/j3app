//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('user').controller('ContactListCtrl', ['$scope', '$timeout', '$mdSidenav', '$mdUtil', '$log', '$reactive', '$rootScope',
    function ($scope, $timeout, $mdSidenav, $mdUtil, $log, $reactive, $rootScope) {
        $reactive(this).attach($scope);

        $rootScope.showNavContactList = function () {
            $('.nav-button-chat').sideNav('hide');
            $('.nav-button-contact').sideNav('hide');
            $('.nav-button-contact').sideNav('show');
        };

        $rootScope.hideNavContactList = function () {
            $('.nav-button-chat').sideNav('hide');
            $('.nav-button-contact').sideNav('hide');
        };

        Meteor.subscribe('users');
        this.helpers({
            users: function () {
                users = Meteor.users.find().map(function (user) {
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
console.log(user.messagesNotVisualized);
                        if (user.messagesNotVisualized == 0){
                            user.messagesNotVisualized = '';
                        } else {
                            var s = new buzz.sound('/sound/message-msn.mp3');
                            s.play();
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