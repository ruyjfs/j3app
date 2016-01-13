angular.module('user').controller('ChatCtrl', [ '$scope', '$timeout', '$mdSidenav', '$mdUtil', '$log', '$reactive', '$anchorScroll', '$location', '$rootScope',
    function ($scope, $timeout, $mdSidenav, $mdUtil, $log, $reactive, $anchorScroll, $location, $rootScope) {
        $reactive(this).attach($scope);

        this.newMessage = {};
        this.addNewMessage = function () {

            if(this.newMessage.text && $rootScope.friendId){
                this.newMessage.userId = Meteor.user()._id;
                this.newMessage.friendId = $rootScope.friendId;
                this.newMessage.date = new Date();
                this.newMessage.userEnabled = true;
                this.newMessage.friendEnabled = true;
                Messages.insert(this.newMessage);
                //$scope.newMessage.owner = $scope.friendId;
                //$scope.newMessage.friendId = $rootScope.currentUser._id;
                //Messages.insert($scope.newMessage);
                this.newMessage = [];

                // set the location.hash to the id of
                // the element you wish to scroll to.
                $location.hash('buttonSend');
                // call $anchorScroll()
                $anchorScroll();

                //messages.save($scope.newMessage, false);
        //        $log.debug($scope.newMessage.text);
            }
        }

        this.typing = function($event){
            //if ($scope.newMessage.text.length > 0) {
            //    console.log($scope.newMessage.text);
            //}
        }

        Meteor.subscribe('messages');
        //this.helpers({
        //    messages: function() {
        //        return $rootScope.messages;
        //    }
        //});

        this.messages = $rootScope.messages;

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

        this.getOwnerMessage = function(message){
            if (message.userId == Meteor.user()._id) {
                return 'You';
            } else {
                user = Meteor.users.findOne(message.userId);

                return user.name;
            }
        }

        this.getMessageStyle = function(message){
            if (message.userId == Meteor.user()._id) {
                var style = "margin-top: 15px; padding: 0.1px 15px 0.1px 15px; text-align: right; background-color: #FFECB3;";
                return style;
            } else {
                var style = "margin-top: 15px; padding: 0.1px 15px 0.1px 15px; text-align: left; background-color: #FFF8E1;";
                return style;
            }
        }

        //$log.debug($scope.parties);

        //$mdSidenav('chat')
        //    .then(function () {
        //        //$scope.teste = 'AEEEEEEEEEEEE';
        //        $scope.messages = $meteor.collection(Messages, false).subscribe('messages');
        //        $log.debug('hahahaah');
        //    });

        this.close = function(){
            $mdSidenav('chat').close()
                .then(function(){
                    $scope.messages = [];
                });
            $mdSidenav('contact-list').toggle();
        }

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