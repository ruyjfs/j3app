//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('admin').controller('MenuCtrl', [ '$scope', '$timeout', '$mdSidenav', '$mdUtil', '$log', '$location',
    function ($scope, $timeout, $mdSidenav, $mdUtil, $log, $location) {

    //$scope.users = $meteor.collection(Meteor.users, false).subscribe('users');
    //$scope.teste = 'teste 1';
    //$log.debug($scope.users[0]);
    //$log.debug($scope.teste);

    //$scope.root = $root;
    //$scope.toggleChat = buildToggler('chat');


    //$mdSidenav('menu')
    //    .then(function () {
    //        //$scope.teste = 'AEEEEEEEEEEEE';
    //        //$scope.messages = $meteor.collection(Messages, false).subscribe('message');
    //        $log.debug('hahahaah');
    //    });
    //$scope.nameModule = 'Brotherhood';


    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    //function buildToggler(navID) {
    //    var debounceFn = $mdUtil.debounce(function () {
    //        $mdSidenav(navID)
    //            .toggle()
    //            .then(function () {
    //                $log.debug("toggle " + navID + " is done");
    //                //$scope.messages = [];
    //                //console.info('ENTROU MANO')
    //            });
    //    }, 200);
    //    return debounceFn;
    //}
}]);


//.controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
//    $scope.close = function () {
//        $mdSidenav('left').close()
//            .then(function () {
//                $log.debug("close LEFT is done");
//            });
//    };
//})
//.controller('RightCtrl', function ($scope, $timeout, $mdSidenav, $log, $meteor) {
//    $scope.close = function () {
//        $mdSidenav('right').close()
//            .then(function () {
//                $log.debug("close RIGHT is done");
//            });
//    };
//
//    //$scope.users = $meteor.collection(Meteor.users, false).subscribe('users');
//    //$log.debug($scope.users[0]);
//    //$scope.teste = 'teste 2';
//    //$log.debug($scope.teste);
//    //this.ae = ' asdasd';
//})