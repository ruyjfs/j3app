//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('admin').controller('HeaderCtrl',
    [
        '$scope', '$timeout', '$mdSidenav', '$mdUtil', '$log', '$location', '$reactive', '$mdDialog', '$mdBottomSheet', '$rootScope', '$mdToast',
        '$stateParams', '$state',
    function ($scope, $timeout, $mdSidenav, $mdUtil, $log, $location, $reactive, $mdDialog, $mdBottomSheet, $rootScope, $mdToast, $stateParams, $state) {
        $reactive(this).attach($scope);
        //$('.nav-button-left').sideNav({
        //    closeOnClick: false,
        //    edge: 'left'
        //});
        //$('.nav-button-right').sideNav({
        //    closeOnClick: false,
        //    edge: 'right',
        //});
        //$('.nav-button-close-left').sideNav({
        //    closeOnClick: true,
        //    edge: 'left'
        //});
        //$('.nav-button-close-right').sideNav({
        //    closeOnClick: true,
        //    edge: 'right',
        //});

        this.subscribe('users');
        this.subscribe('message');
        this.title = 'Brotherhood';
        this.redirect = function (route) {
            arrTitle = route.split('/');
            $scope.title = arrTitle[1];
            $mdSidenav('menu').close();
            $location.path(route);
        };

        this.showModulesGrid = function ($event) {
            //console.log($mdBottomSheet);
            $scope.alert = '';
            $mdBottomSheet.show({
                module: 'user',
                controller: 'ModulesGridCtrl',
                templateUrl: 'module/user/client/views/modules-grid.ng.html',
                clickOutsideToClose: true,
                targetEvent: $event
            }).then(function (clickedItem) {
                //$mdToast.show(
                //    $mdToast.simple()
                //        .textContent(clickedItem['name'] + ' clicked!')
                //        .position('top right')
                //        .hideDelay(1500)
                //);
            });
        };

        this.modalLogin = function (ev, id) {
            $mdDialog.show({
                module: 'user',
                controller: 'LoginModalCtrl',
                templateUrl: 'module/user/client/views/login-modal.ng.html',
                clickOutsideToClose: true,
                locals: {
                    id: id
                },
                targetEvent: ev
            }).then(function (answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function () {
                $scope.status = 'You cancelled the dialog.';
            });
        };
    }
]);