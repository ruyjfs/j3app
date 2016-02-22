angular.module('user').controller('ChatCtrl', [ '$scope', '$timeout', '$mdSidenav', '$mdUtil', '$log', '$reactive', '$anchorScroll', '$location', '$rootScope',
    function ($scope, $timeout, $mdSidenav, $mdUtil, $log, $reactive, $anchorScroll, $location, $rootScope) {
        $reactive(this).attach($scope);

        $scope.newMessage = {};
        $scope.addNewMessage = function () {
            if($scope.newMessage.text && $rootScope.friendId){
                $scope.newMessage.userId = Meteor.user()._id;
                $scope.newMessage.friendId = $rootScope.friendId;
                $scope.newMessage.date = new Date();
                $scope.newMessage.userEnabled = true;
                $scope.newMessage.friendEnabled = true;
                Messages.insert(this.newMessage);
                //$scope.newMessage.owner = $scope.friendId;
                //$scope.newMessage.friendId = $rootScope.currentUser._id;
                //Messages.insert($scope.newMessage);
                $scope.newMessage = [];

                // set the location.hash to the id of
                // the element you wish to scroll to.
                $location.hash('buttonSend');
                // call $anchorScroll()
                $anchorScroll();

                //messages.save($scope.newMessage, false);
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
//        Meteor.subscribe('messages');
//        $scope.helpers({
//            messages: function() {
//                messages = Messages.find(
//                    {
//                        $or: [
//                            {
//                                'userId' : Meteor.user()._id,
//                                'friendId' : $rootScope.friendId
//                            }
//                            ,
//                            {
//                                'userId' : $rootScope.friendId,
//                                'friendId' : Meteor.user()._id
//                            }
//                        ]
//                    }
//                ).fetch();
//
//                //messages.map(function(message){
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

            //$scope.messages = $meteor.collection(Messages).subscribe('messages', friendId);


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
        //        $scope.messages = $meteor.collection(Messages, false).subscribe('messages');
        //        $log.debug('hahahaah');
        //    });

        $scope.close = function(){
            $mdSidenav('chat').close()
                .then(function(){
                    //$scope.messages = [];
                });
            $mdSidenav('contact-list').toggle();
        };

        //$scope.messages = $meteor.collection(Messages, false).subscribe('messages');
        //$scope.messages = $scope.parties;
    ////$scope.parties = $meteor.collection(Parties, false).subscribe('parties');
    //$scope.users = $meteor.collection(Meteor.users, false).subscribe('users');
    //var Friends = new Mongo.Collection("friends");
    ////$scope.friends = $meteor.collection(Friends, false);
    //$scope.friends = Friends.find({});
    //$log.debug('Messages');
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