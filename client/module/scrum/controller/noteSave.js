//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('scrum').controller('NoteSaveCtrl', [ '$scope', '$timeout', '$mdSidenav', '$mdUtil', '$log', '$meteor', '$rootScope', '$mdDialog', 'id',
    function ($scope, $timeout, $mdSidenav, $mdUtil, $log, $meteor, $rootScope, $mdDialog, id) {
        $scope.stories = $meteor.collection( function() {
            return Story.find({});
        });
        $scope.members = $meteor.collection(Meteor.users, false).subscribe('users');

        if (id) {
            $scope.form = $meteor.object(Note, id, false);
        } else {
            $scope.form = {};
        }

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