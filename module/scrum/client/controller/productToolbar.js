//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('scrum').controller('ProductToolbarCtrl', ['$scope', '$mdDialog', '$stateParams', '$reactive', '$state', '$timeout', '$rootScope', '$location',
    function ($scope, $mdDialog, $stateParams, $reactive, $state, $timeout, $rootScope, $location) {
        $reactive(this).attach($scope);

        if (!$stateParams.id) {
            $state.go('scrum');
        }

        this.id = $stateParams.id;
        this.sprintId = $stateParams.sprintId;

        this.menus = [
            {name: 'Trash',     link: '/scrum/trash/'+this.id+'/'+this.sprintId,   icon: 'delete',      class: ''},
            {name: 'Sprint',    link: '/scrum/sprint/'+this.id+'/'+this.sprintId,   icon: 'date_range',      class: ''},
            {name: 'Status',    link: '/scrum/status/'+this.id+'/'+this.sprintId,   icon: 'flag',           class: ''},
            {name: 'Story',     link: '/scrum/story/'+this.id+'/'+this.sprintId,    icon: 'content_paste',   class: ''},
            {name: 'Backlog',   link: '/scrum/backlog/'+this.id+'/'+this.sprintId,  icon: 'developer_board', class: ''},
            {name: 'Planning Poker',   link: '/scrum/planning-poker/'+this.id+'/'+this.sprintId,  icon: 'style', class: ''},
            {name: 'Kanban',    link: '/scrum/kanban/'+this.id+'/'+this.sprintId,   icon: 'view_column',     class: ''},
            {name: 'Burndown',  link: '/scrum/burndown/'+this.id+'/'+this.sprintId, icon: 'trending_down',       class: ''},
            //{name: 'Burndown',  link: '/scrum/burndown/'+this.id+'/'+this.sprintId, icon: 'show_chart',       class: ''},
            {name: 'Team',      link: '/scrum/product-team/'+this.id+'/'+this.sprintId,     icon: 'group',   class: ''},
            {name: 'Product',   link: '/scrum/project', icon: 'business_center'}
        ];
        if ($location.path()) {
            arrUrl = $location.path().split('/');
            urlModule = arrUrl[2];
        }
        this.menus.map(function(menu){
            links = menu.link.split('/');
            if (urlModule == links[2] || (urlModule == 'productkanban' && links[2] == 'kanban')) {
                menu.class = 'active'
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
                    storyId: storyId
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