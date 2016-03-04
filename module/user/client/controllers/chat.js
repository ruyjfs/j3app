angular.module('user').controller('ChatCtrl', [ '$scope', '$timeout', '$mdSidenav', '$mdUtil', '$log', '$reactive', '$anchorScroll', '$location', '$rootScope',
    function ($scope, $timeout, $mdSidenav, $mdUtil, $log, $reactive, $anchorScroll, $location, $rootScope) {
        $reactive(this).attach($scope);

        $scope.messages = [];
        $rootScope.showNavChat = function(contactId){
            this.subscribe('users');
            user = Meteor.users.findOne(Meteor.userId());
            if (user && user.chat && user.chat.side && user.chat.side == 'left') {
                chatSide = 'left';
            } else {
                chatSide = 'right';
            }
            $('.nav-button-contact-'+chatSide).sideNav('hide');
            $('.nav-button-chat-'+chatSide).sideNav('show');
            $rootScope.contactId = contactId;
            $rootScope.chatIsOpen = true;

            this.subscribe('users');
            this.subscribe('message');
            $scope.helpers({
                user: function(){
                    var user = Meteor.users.findOne(Meteor.userId());

                    if (user) {
                        if (user.status) {
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
                    }

                    return user;
                },
                userContact: function(){
                    var user = Meteor.users.findOne($rootScope.contactId);
                    if (user){
                        if (user.status) {
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
                    }

                    return user;
                },
                messages: function () {
                    messages = Message.find(
                        {
                            $or: [
                                {
                                    'userId' : Meteor.user()._id,
                                    'contactId' : $rootScope.contactId
                                }
                                ,
                                {
                                    'userId' : $rootScope.contactId,
                                    'contactId' : Meteor.user()._id
                                }
                            ]
                        }
                    ).map(function(message){
                            if (message.userId == Meteor.user()._id) {
                                message.owner = 'You';
                                message.side = 'right';
                            } else {
                                user = Meteor.users.findOne(message.userId);
                                message.owner = user.name;
                                message.side = 'left';
                            }

                            if (message.userId == Meteor.user()._id) {
                                message.style = "margin-top: 0px; padding: 0px 5px 0px 5px; text-align: right; background-color: #FFECB3;";
                            } else {
                                message.style = "margin-top: 0px; padding: 0px 5px 0px 5px; text-align: left; background-color: #FFF8E1;";
                            }

                            //message.dateTrated = message.date;
                            message.dateTrated = moment(message.date).format('L LT');

                            if (moment(new Date).diff(moment(message.date), 'days') > 2) {
                                message.dateTrated = moment(message.date).format('L LT');
                            } else {
                                if (moment(new Date).diff(moment(message.date), 'days') >= 1) {
                                    message.dateTrated = moment(message.date).endOf('day').fromNow(); // in 40 minutes
                                } else {
                                    message.dateTrated = moment(message.date).endOf('hour').fromNow(); // in 40 minutes
                                }
                            }

                            return message;
                        });

                    // Marcando como visualizado
                    messagesNotVisualized = Message.find(
                        {
                            $and: [
                                {
                                    'userId': contactId,
                                    'contactId': Meteor.userId(),
                                    $or: [
                                        {visualized: ''},
                                        {visualized: null}
                                    ]
                                }
                            ]
                        }
                    ).map(function(message){
                            if($rootScope.chatIsOpen) {
                                Meteor.call('changeMessageVisualized', {messageId: message._id}, function (error) {
                                });
                            }
                        return message;
                    });

                    //if (!message.visualized) {
                    //    console.log(message.visualized);
                    //}

                    //messagesAlert = Message.filter(function(message){
                    //    return (!message.alert);
                    //});
                    //
                    //console.log(messagesAlert);

                    // set the location.hash to the id of
                    // the element you wish to scroll to.
                    $location.hash('buttonSend');
                    // call $anchorScroll()
                    $anchorScroll();
                    $('#chatText').focus();
                    setTimeout(function() {
                        $('#chatText').focus();
                    },300);

                    return messages;
                }
            });
        };

        $scope.newMessage = {};
        $scope.addNewMessage = function () {
            if($scope.newMessage.text && $rootScope.contactId){
                $scope.newMessage.userId = Meteor.user()._id;
                $scope.newMessage.contactId = $rootScope.contactId;
                $scope.newMessage.date = new Date();
                $scope.newMessage.userEnabled = true;
                $scope.newMessage.friendEnabled = true;
                Message.insert(this.newMessage);
                //$scope.newMessage.owner = $scope.contactId;
                //$scope.newMessage.contactId = $rootScope.currentUser._id;
                //Message.insert($scope.newMessage);
                $scope.newMessage = [];

                // set the location.hash to the id of
                // the element you wish to scroll to.
                // call $anchorScroll()
                $location.hash('buttonSend');
                $anchorScroll();

                $('#chatText').focus();
                setTimeout(function() {
                    $('#chatText').focus();
                },300);


                //Message.save($scope.newMessage, false);
        //        $log.debug($scope.newMessage.text);
            }
        };

        $scope.typing = function($event){
            //if ($scope.newMessage.text.length > 0) {
            //    console.log($scope.newMessage.text);
            //}
        }

        //console.log($rootScope.messages);

        //$scope.messages = $rootScope.messages;

        //this.helpers({
        //    messages: function() {
        //        return $rootScope.messages;
        //    }
        //});
//
//        $scope.messages = [];
//        Meteor.subscribe('users');
//        Meteor.subscribe('message');
//        $scope.helpers({
//            messages: function() {
//                messages = Message.find(
//                    {
//                        $or: [
//                            {
//                                'userId' : Meteor.user()._id,
//                                'contactId' : $rootScope.contactId
//                            }
//                            ,
//                            {
//                                'userId' : $rootScope.contactId,
//                                'contactId' : Meteor.user()._id
//                            }
//                        ]
//                    }
//                ).fetch();
//
//                //Message.map(function(message){
//                //    if (message.userId == Meteor.user()._id) {
//                //        message.owner.name = 'You';
//                //    } else {
//                //        user = Meteor.users.findOne(message.userId);
//                //        message.owner.name = user.name;
//                //    }
//                //
//                //    if (message.userId == Meteor.user()._id) {
//                //        message.style = "margin-top: 15px; padding: 0.1px 15px 0.1px 15px; text-align: right; background-color: #FFECB3;";
//                //    } else {
//                //        message.style = "margin-top: 15px; padding: 0.1px 15px 0.1px 15px; text-align: left; background-color: #FFF8E1;";
//                //    }
//                //
//                //    return message;
//                //});
//
//console.log(messages);
//
//                $scope.messages = messages;
//                return messages;
//            }
//        });

        //console.log('aeee');


        //console.log(this.messages);

            //$scope.messages = $meteor.collection(Messages).subscribe('message', contactId);


        //$mdSidenav().when('chat').then(function(){
        //    console.info('asdasd');
        //});
        //$scope.$watch(function(){
        //    chatIsOpen = $mdSidenav('chat').isOpen();
        //    console.info(chatIsOpen);

        //    if (!) {
        //        $scope.messages = '';
        //    }
        //    return $mdComponentRegistry.get('rightNav') ? $mdSidenav('rightNav').isOpen() : false;
        //}, function(newVal){
        //    $scope.isNavIconOpened = newVal;
        //});

        //$scope.isClose = function() {
        //    console.log('FECHOU MANO');
        //    $scope.messages = [{}];
        //};

        //$scope.getOwnerMessage = function(message){
        //    if (message.userId == Meteor.user()._id) {
        //        return 'You';
        //    } else {
        //        user = Meteor.users.findOne(message.userId);
        //
        //        return user.name;
        //    }
        //}

        //$log.debug($scope.parties);

        //$mdSidenav('chat')
        //    .then(function () {
        //        //$scope.teste = 'AEEEEEEEEEEEE';
        //        $scope.messages = $meteor.collection(Messages, false).subscribe('message');
        //        $log.debug('hahahaah');
        //    });

        //$scope.close = function(){
        //    $mdSidenav('chat').close()
        //        .then(function(){
        //            //$scope.messages = [];
        //        });
        //    $mdSidenav('contact-list').toggle();
        //};

        //$scope.messages = $meteor.collection(Messages, false).subscribe('message');
        //$scope.messages = $scope.parties;
    ////$scope.parties = $meteor.collection(Parties, false).subscribe('parties');
    //$scope.users = $meteor.collection(Meteor.users, false).subscribe('users');
    //var Friends = new Mongo.Collection("friends");
    ////$scope.friends = $meteor.collection(Friends, false);
    //$scope.friends = Friends.find({});
    //$log.debug('message');
    //$log.debug($scope.messages);
    //$log.debug($scope.users);
    //$log.debug($scope.friends);

    //$scope.close = function () {
    //    $mdSidenav('contact-list').close()
    //        .then(function () {
    //            //$log.debug("close CONTACT is done");
    //        });
    //};

}]);