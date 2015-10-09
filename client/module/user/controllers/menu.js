//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('user').controller('MenuCtrl', [ '$scope', '$timeout', '$mdSidenav', '$mdUtil', '$log', '$meteor',
    function ($scope, $timeout, $mdSidenav, $mdUtil, $log, $meteor) {

    //$scope.users = $meteor.collection(Meteor.users, false).subscribe('users');
    //$scope.teste = 'teste 1';
    //$log.debug($scope.users[0]);
    //$log.debug($scope.teste);

    //$scope.root = $root;
    $scope.toggleMenu = buildToggler('menu');
    $scope.toggleContactList = buildToggler('contact-list');
    $scope.toggleChat = buildToggler('chat');
    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildToggler(navID) {
        var debounceFn = $mdUtil.debounce(function () {
            $mdSidenav(navID)
                .toggle()
                .then(function () {
                    $log.debug("toggle " + navID + " is done");
                });

            if (navID == 'chat') {
                $mdSidenav('contact-list').close()
                    .then(function () {
                        //$scope.teste = 'AEEEEEEEEEEEE';
                        //$log.debug('asdsd');
                    });
            }


        }, 200);
        return debounceFn;
    }


}]).controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
        $mdSidenav('left').close()
            .then(function () {
                $log.debug("close LEFT is done");
            });
    };
}).controller('RightCtrl', function ($scope, $timeout, $mdSidenav, $log, $meteor) {
    $scope.close = function () {
        $mdSidenav('right').close()
            .then(function () {
                $log.debug("close RIGHT is done");
            });
    };

    //$scope.users = $meteor.collection(Meteor.users, false).subscribe('users');
    //$log.debug($scope.users[0]);
    //$scope.teste = 'teste 2';
    //$log.debug($scope.teste);
    //this.ae = ' asdasd';
});