angular.module('scrum').controller('ProductsFabCtrl', function ($scope, $mdDialog, $stateParams, $reactive, $state, $timeout, $rootScope) {
        $reactive(this).attach($scope);
        this.modalProjectSave = function (ev, id) {
            $mdDialog.show({
                controller: 'ProjectSaveCtrl as ctrl',
                templateUrl: 'module/scrum/client/view/project-save.ng.html',
                clickOutsideToClose: true,
                locals: {
                    id: id
                },
                targetEvent: ev
            });
        };


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


        this.modalTeamSave = function (ev, id) {
            //$mdDialog.alert()
            //    .parent(angular.element(document.querySelector('#popupContainer')))
            //    .clickOutsideToClose(true)
            //    .title('This is an alert title')
            //    .content('You can specify some description text in here.')
            //    .ariaLabel('Alert Dialog Demo')
            //    .ok('Got it!')
            //    .targetEvent(ev)

            $mdDialog.show({
                controller: 'TeamSaveCtrl as ctrl',
                templateUrl: 'module/scrum/client/view/team-save.ng.html',
                clickOutsideToClose: true,
                locals: {
                    id: id
                },
                targetEvent: ev
            }).then(function (answer) {
                this.status = 'You said the information was "' + answer + '".';
            }, function () {
                this.status = 'You cancelled the dialog.';
            });
        };

        this.modalOrganizationMemberSave = function (ev, id) {
            //$mdDialog.alert()
            //    .parent(angular.element(document.querySelector('#popupContainer')))
            //    .clickOutsideToClose(true)
            //    .title('This is an alert title')
            //    .content('You can specify some description text in here.')
            //    .ariaLabel('Alert Dialog Demo')
            //    .ok('Got it!')
            //    .targetEvent(ev)

            $mdDialog.show({
                controller: 'OrganizationMemberSaveCtrl as ctrl',
                templateUrl: 'module/scrum/client/view/organization-member-save.ng.html',
                clickOutsideToClose: true,
                locals: {
                    id: id
                },
                targetEvent: ev
            }).then(function (answer) {
                this.status = 'You said the information was "' + answer + '".';
            }, function () {
                this.status = 'You cancelled the dialog.';
            });
        };
    }
);