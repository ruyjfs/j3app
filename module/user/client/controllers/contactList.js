//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('user').controller('ContactListCtrl', ['$scope', '$timeout', '$mdSidenav', '$mdUtil', '$log', '$reactive', '$rootScope',
    function ($scope, $timeout, $mdSidenav, $mdUtil, $log, $reactive, $rootScope) {
        $reactive(this).attach($scope);

        $scope.users = [];
        Meteor.subscribe('users');
        $scope.helpers({
            users: function () {
                var users =  Meteor.users.find(
                    {
                        //$or: [
                        //    {
                        //        'userId' : $rootScope.currentUser._id,
                        //        'friendId' : friendId
                        //    }
                        //    ,
                        //    {
                        //        'userId' : friendId,
                        //        'friendId' : $rootScope.currentUser._id
                        //    }
                        //]
                    }
                ).fetch();
                $scope.users = users;
                return users;
            },
            users2: function () {
                var users =  '1234'

                return users;
            }
        });

        $scope.toggleChat = function (friendId) {
            $mdSidenav('contact-list').close();
            $rootScope.friendId = friendId;

            //this.currentUser.userId = Meteor.user()._id;

            $rootScope.messages = [];
            Meteor.subscribe('users');
            Meteor.subscribe('messages');
            $scope.helpers({
                messagess: function() {
                    messages = Messages.find(
                        {
                            $or: [
                                {
                                    'userId' : Meteor.user()._id,
                                    'friendId' : $rootScope.friendId
                                }
                                ,
                                {
                                    'userId' : $rootScope.friendId,
                                    'friendId' : Meteor.user()._id
                                }
                            ]
                        }
                    ).map(function(message){
                        if (message.userId == Meteor.user()._id) {
                            message.owner = 'You';
                        } else {
                            user = Meteor.users.findOne(message.userId);
                            message.owner = user.name;
                        }

                        if (message.userId == Meteor.user()._id) {
                            message.style = "margin-top: 15px; padding: 0.1px 15px 0.1px 15px; text-align: right; background-color: #FFECB3;";
                        } else {
                            message.style = "margin-top: 15px; padding: 0.1px 15px 0.1px 15px; text-align: left; background-color: #FFF8E1;";
                        }

                        return message;
                    });

                    $rootScope.messages = messages;
                    return messages;
                }
            });

            $rootScope.messages = this.messages;

            $scope.helpers({
                messages: function () {
                    return Messages.find(
                        {
                            //$or: [
                            //    {
                            //        'userId' : $rootScope.currentUser._id,
                            //        'friendId' : friendId
                            //    }
                            //    ,
                            //    {
                            //        'userId' : friendId,
                            //        'friendId' : $rootScope.currentUser._id
                            //    }
                            //]
                        }
                    );
                }
            });

            $mdSidenav('chat').toggle();
            //$scope.messages = $meteor.collection(Messages).subscribe('messages', friendId);
        };

        //$scope.users = $meteor.collection(Meteor.users, false).subscribe('users');
        //$scope.teste = 'teste 1';
        //$log.debug($scope.users[0]);
        //$log.debug($scope.teste);


        $scope.close = function () {
            $mdSidenav('contact-list').close()
                .then(function () {
                    $log.debug("close CONTACTss is done");
                });
        };

    }]);