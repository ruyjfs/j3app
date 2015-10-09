//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('user').controller('ChatCtrl', [ '$scope', '$timeout', '$mdSidenav', '$mdUtil', '$log', '$meteor', '$rootScope',
    function ($scope, $timeout, $mdSidenav, $mdUtil, $log, $meteor, $rootScope) {

        $scope.newMessage = {};
        $scope.addNewMessage = function () {
            if($scope.newMessage.text){
                $scope.newMessage.owner = $rootScope.currentUser._id;
                Messages.insert($scope.newMessage);
        //        messages.save($scope.newMessage, false);
                $log.debug($scope.newMessage.text);
                $scope.newMessage = '';
            }
        }

        //$scope.messages = $meteor.collection(function() {
        //    return Messages.find({});
        //});
        $scope.messages = $meteor.collection(Messages, false).subscribe('messages');
        $log.debug('parties 2');
        $log.debug($scope.messages);
        //$log.debug($scope.messages[0]);

        $scope.parties = $meteor.collection(function() {
            return Parties.find({});
        });
        $log.debug($scope.parties);


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



    $scope.close = function () {
        $mdSidenav('contact-list').close()
            .then(function () {
                $log.debug("close CONTACT is done");
            });
    };
    //$scope.root = $root;
    //$scope.toggleLeft = buildToggler('left');
    //$scope.toggleRight = buildToggler('chat');

}]);