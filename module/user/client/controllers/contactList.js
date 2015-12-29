//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('user').controller('ContactCtrl', ['$scope', '$timeout', '$mdSidenav', '$mdUtil', '$log', '$reactive', '$rootScope',
    function ($scope, $timeout, $mdSidenav, $mdUtil, $log, $reactive, $rootScope) {
        $reactive(this).attach($scope);

        this.subscribe('users');
        this.helpers({
            users: function () {
                return Meteor.users.find(
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

        this.toggleChat = function (friendId) {
            $mdSidenav('contact-list').close();
            $rootScope.friendId = friendId;

            //this.currentUser.userId = Meteor.user()._id;

            this.subscribe('messages');
            this.helpers({
                messages: function() {
                    return Messages.find(
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
                    );
                }
            });

            $rootScope.messages = this.messages;

                this.helpers({
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


        this.close = function () {
            $mdSidenav('contact-list').close()
                .then(function () {
                    $log.debug("close CONTACTss is done");
                });
        };

    }]);