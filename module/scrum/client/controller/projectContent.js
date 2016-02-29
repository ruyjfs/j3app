//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('scrum').controller('ProjectContentCtrl', ['$scope', '$mdDialog', '$stateParams', '$reactive', '$state', '$timeout', '$rootScope',
    function ($scope, $mdDialog, $stateParams, $reactive, $state, $timeout, $rootScope) {
        $reactive(this).attach($scope);

        //$scope.title = 'Scrum';

        if (!$stateParams.id) {
            $state.go('scrum');
        }

        moment.locale('pt-BR');
        $scope.helpers({
            project: function () {
                this.subscribe('project');
                return Project.findOne($stateParams.id);
            },
            sprint: function() {
                this.subscribe('sprint');
                dateNow = moment().format('x');

                if ($stateParams.sprintId == '1' || $stateParams.sprintId == '') {

                    Meteor.call('sprintCreate', $stateParams.id, function (error, result) {
                        if (error) {
                            console.log(error);
                        } else {
                            //console.log('Saved!');
                            //$scope.form = '';
                            //$mdDialog.hide();
                        }
                        //$rootScope.titleMiddle = result.dateStart + ' - ' + result.dateEnd + ' (' + result.number + ')';
                        $rootScope.titleMiddle = moment(result.dateStart, 'x').format('L') + ' - ' + moment(result.dateEnd, 'x').format('L');

                        if ($stateParams.sprintId == 1 || $stateParams.sprintId == '') {
                            $state.go('scrum/content', {id:$stateParams.id, sprintId:result._id})
                        }
                    });
                    sprint = Sprint.findOne(
                        {
                            $and: [
                                {projectId: $stateParams.id},
                                {dateStart: {$lte: dateNow}, dateEnd: {$gte: dateNow}}
                            ]
                        }
                    );
                } else {
                    sprint = Sprint.findOne($stateParams.sprintId);
                }

                if (sprint) {
                    $rootScope.titleMiddle = moment(sprint.dateStart, 'x').format('L')  + ' - ' + moment(sprint.dateEnd, 'x').format('L');
                }
                $rootScope.sprint = sprint;
                return sprint;
            }
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

        //var self = this;
        //self.hidden = false;
        //self.isOpen = false;
        //self.hover = false;
        // On opening, add a delayed property which shows tooltips after the speed dial has opened
        // so that they have the proper position; if closing, immediately hide the tooltips
        //$scope.$watch('vm.isOpen', function(isOpen) {
        //
        //    console.log('hidden:' + self.hidden);
        //    console.log('isOpen:' + self.isOpen);
        //    console.log('hover:' + self.hover);
        //    console.log('________');
        //    if (isOpen) {
        //        $timeout(function() {
        //            this.tooltipVisible = self.isOpen;
        //        }, 600);
        //    } else {
        //        this.tooltipVisible = self.isOpen;
        //    }
        //});
    }]);