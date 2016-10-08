//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('scrum').controller('HeaderToolbarCtrl', ['$scope', '$mdDialog', '$stateParams', '$reactive', '$state', '$timeout', '$rootScope', '$location',
    function ($scope, $mdDialog, $stateParams, $reactive, $state, $timeout, $rootScope, $location) {
        $reactive(this).attach($scope);


        var organization = $stateParams.organization;
        //var organization = Organization.findOne({namespace: organizationNamespace});
        //var organizationId = organization._id;

        this.menus = [
            //{name: 'Home',         link: '/scrum',              icon: 'home',            class: ''},
            {name: 'Organization',     link: '/scrum/organization', icon: 'location_city',   class: ''},
            {name: 'Product',          link: '/scrum/' + organization,      icon: 'business_center',      class: ''},
            {name: 'Team',             link: '/scrum/' + organization + '/team',         icon: 'group_work', class: ''},
            //{name: 'Product',      link: '/scrum/product',      icon: 'business_center',      class: ''},
        ];
        if ($location.path()) {
            arrUrl = $location.path().split('/');
            urlModule = arrUrl[2];
            urlModule2 = arrUrl[4];
        }
        this.menus.map(function(menu){
            links = menu.link.split('/');
            //console.log(links);
            //console.log(urlModule);
            //console.log(arrUrl);
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
    }]);