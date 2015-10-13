//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('admin').controller('MenuItemsCtrl', [ '$scope', '$timeout', '$mdSidenav', '$mdUtil', '$log', '$meteor', '$rootScope',
    function ($scope, $timeout, $mdSidenav, $mdUtil, $log, $meteor, $rootScope) {
        $scope.menuItems = [
            {
                name: 'Admin',
                link: '/admin',
            },
            {
                name: 'Brotherhood',
                link: '/brotherhood',
            },
            {
                name: 'Driver',
                link: '/driver',
            },
            {
                name: 'Gamer',
                link: '/gamer',
            },
            {
                name: 'Scrum',
                link: '/scrum',
            },
            {
                name: 'Usuário',
                link: '/user',
            },
            {
                name: 'Eventos',
                link: '/parties',
            },
        ];
    }
]);