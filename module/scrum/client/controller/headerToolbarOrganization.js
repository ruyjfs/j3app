//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('scrum').controller('HeaderToolbarOrganizationCtrl', ['$scope', '$mdDialog', '$stateParams', '$reactive', '$state', '$timeout', '$rootScope', '$location',
    function ($scope, $mdDialog, $stateParams, $reactive, $state, $timeout, $rootScope, $location) {
        $reactive(this).attach($scope);
        $scope.$state = $state;
        $scope.$location = $location;

        this.redirect = function (route) {
            $location.path(route);
        };
        this.menus = [
            //{name: 'Home',         link: '/scrum',              icon: 'home',            class: ''},
            {name: 'Organization', link: 'scrum/', icon: 'location_city',   class: ''},
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

        $scope.modalNoteSave = function (ev, id, storyId) {
            $mdDialog.show({
                controller: 'NoteSaveCtrl',
                templateUrl: 'module/scrum/client/view/note-save.ng.html',
                clickOutsideToClose: true,
                targetEvent: ev,
                locals: {
                    id: id,
                    storyId: storyId,
                    sprint: ''
                }
            }).then(function (answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function () {
                $scope.status = 'You cancelled the dialog.';
            });
        };

        $scope.modalStorySave = function (ev, id) {
            $mdDialog.show({
                controller: 'StorySaveCtrl',
                templateUrl: 'module/scrum/client/view/story-save.ng.html',
                clickOutsideToClose: true,
                locals: {id: id},
                targetEvent: ev
            });
        };

        $scope.modalStatusSave = function (ev, id) {
            $mdDialog.show({
                controller: 'StatusSaveCtrl',
                templateUrl: 'module/scrum/client/view/status-save.ng.html',
                clickOutsideToClose: true,
                locals: {'id': id},
                targetEvent: ev
            }).then(function (answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function () {
                $scope.status = 'You cancelled the dialog.';
            });
        };


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