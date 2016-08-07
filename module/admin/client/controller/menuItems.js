//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('admin').controller('MenuItemsCtrl', [ '$scope', '$timeout', '$mdSidenav', '$mdUtil', '$log',
    function ($scope, $timeout, $mdSidenav, $mdUtil, $log) {
        //$scope.menuItems = [
        //    {
        //        name: 'Admin',
        //        link: '/admin',
        //        icon: '',
        //    },
        //    {
        //        name: 'Brotherhood',
        //        link: '/brotherhood',
        //    },
        //    {
        //        name: 'Drive',
        //        link: '/drive',
        //    },
        //    {
        //        name: 'game',
        //        link: '/game',
        //    },
        //    {
        //        name: 'Scrum',
        //        link: '/scrum',
        //    },
        //    {
        //        name: 'Usuário',
        //        link: '/user',
        //    },
        //    {
        //        name: 'Eventos',
        //        link: '/parties',
        //    },
        //];
        $scope.menuItems = [
            {
                name: 'Project',
                link: '/scrum/product',
                icon: 'business_center',
            },
            {
                name: 'Team',
                link: '/scrum/team',
                icon: 'group_work',
            },
            {
                name: 'Chat',
                link: 'ng-click="toggleContactList()"',
                icon: 'chat',
            },
            {
                name: 'Language',
                //link: '/drive',
                icon: 'language',
            },
            {
                name: 'Configuration',
                link: '/user',
                icon: 'settings',
            },
            {
                name: 'Exit',
                link: '/user/logout',
                icon: 'power_settings_new',
            },
            //{
            //    name: 'Usuário',
            //    link: '/user',
            //},
            //{
            //    name: 'Eventos',
            //    link: '/parties',
            //},
        ];
    }
]);