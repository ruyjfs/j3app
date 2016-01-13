//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('scrum').controller('StatusSaveCtrl', [ '$scope', '$timeout', '$mdSidenav', '$mdUtil', '$log', '$meteor', '$rootScope', '$mdDialog', 'id', '$stateParams',
    function ($scope, $timeout, $mdSidenav, $mdUtil, $log, $meteor, $rootScope, $mdDialog, id, $stateParams) {
        $scope.projects = $meteor.collection( function() {
            return Project.find({});
        });

        if (id) {
            $scope.form = Status.findOne(id);
        } else {
            $scope.form = {};
        }
        $scope.form.projectId = $stateParams.id;

        $scope.save = function () {
            Meteor.call('statusSave', $scope.form, function (error) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Saved!');
                    $scope.form = '';
                    $mdDialog.hide();
                }
            });
        }

        $scope.close = function () {
            $mdDialog.hide();
        }
    }
]);