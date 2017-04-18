//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('admin').controller('UserToolbarCtrl', ['$scope', '$mdDialog', '$stateParams', '$reactive', '$state', '$timeout', '$rootScope', '$location',
    function ($scope, $mdDialog, $stateParams, $reactive, $state, $timeout, $rootScope, $location) {
        $reactive(this).attach($scope);
        $scope.$location = $location;


        this.menus = [
            {name: 'Home',     link: '/admin', icon: 'home',   class: ''},
            {name: 'Users',     link: '/admin/users', icon: 'people',   class: ''},
            //{name: 'Burndown',  link: '/scrum/burndown/'+this.id+'/'+this.sprintId, icon: 'show_chart',       class: ''},
            //{name: 'Product',   link: '/scrum/product', icon: 'business_center'}
        ];
        if ($location.path()) {
            arrUrl = $location.path().split('/');
            urlModule = arrUrl[2];
        }
        this.menus.map(function(menu){
            links = menu.link.split('/');
            if (arrUrl[2] == links[2] && arrUrl[3] == links[3] && arrUrl[4] == links[4] ) {
                menu.class = 'active active-margin'
            }
            return menu;
        });

        $(document).ready(function () {
            $('.showMenu').on('click', function () {
                var elm = $(this),
                    elmMenu = elm.closest('.menu'),
                    elmMenu2 = $('.menu2'),
                    elmContent = $('.dynamic .content-main');
                if (elmMenu.hasClass('extended')) {
                    elmMenu.removeClass('extended');
                    elmMenu2.removeClass('extended');
                    elmContent.removeClass('extended');
                    elmMenu.find('.material-icon').removeClass('arrow').addClass('hamburger');
                } else {
                    elmMenu.addClass('extended');
                    elmMenu2.addClass('extended');
                    elmContent.addClass('extended');
                    elmMenu.find('.material-icon').removeClass('hamburger').addClass('arrow');
                }
            });
        });
    }]);