//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('scrum').controller('NoteSaveCtrl', [ '$scope', '$timeout', '$mdSidenav', '$mdUtil', '$log', '$meteor', '$rootScope', '$mdDialog', 'id', '$stateParams',
    function ($scope, $timeout, $mdSidenav, $mdUtil, $log, $meteor, $rootScope, $mdDialog, id, $stateParams) {
        $scope.stories = $meteor.collection( function() {
            return Story.find({projectId: $stateParams.id});
        });
        $scope.members = $meteor.collection(Meteor.users, false).subscribe('users');

        if (id) {
            $scope.form = $meteor.object(Note, id, false);
        } else {
            $scope.form = {};
        }
        $scope.form.projectId = $stateParams.id;

        $scope.save = function () {
            if (id) {
                $scope.form.save();
            } else {
                Note.insert($scope.form);
            }
            $scope.form = '';
            $mdDialog.hide();
        }

        $scope.close = function () {
            $mdDialog.hide();
        }
    }
]);