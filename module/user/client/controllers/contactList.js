//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('user').controller('ContactCtrl', [ '$scope', '$timeout', '$mdSidenav', '$mdUtil', '$log', '$meteor',
    function ($scope, $timeout, $mdSidenav, $mdUtil, $log, $meteor) {

    $scope.users = $meteor.collection(Meteor.users, false).subscribe('users');
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