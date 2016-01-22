//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('scrum').controller('ProjectContentCtrl', ['$scope', '$mdDialog', '$stateParams', '$reactive', '$state', '$timeout',
    function ($scope, $mdDialog, $stateParams, $reactive, $state, $timeout) {
        $reactive(this).attach($scope);

        //$scope.title = 'Scrum';

        if (!$stateParams.id) {
            $state.go('scrum');
        }

        $scope.helpers({
            project: function () {
                this.subscribe('project');
                return Project.findOne($stateParams.id);
            },
            sprint: function(){
                var project = this.project;
                this.subscribe('sprint');

                sprint = Sprint.findOne({$or: [{projectId: $stateParams.id}, {projectId: null}]});

                if (!sprint) {
                    Meteor.call('sprintCreate', $stateParams.id, function (error) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Saved!');
                            $scope.form = '';
                            $mdDialog.hide();
                        }
                    });
                    console.log(project);

                } else {
                    return sprint;
                }
            }
        });

        $scope.modalNoteSave = function (ev, id) {
            $mdDialog.show({
                controller: 'NoteSaveCtrl',
                templateUrl: 'module/scrum/client/view/note-save.ng.html',
                clickOutsideToClose: true,
                targetEvent: ev,
                locals: {
                    id: id
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