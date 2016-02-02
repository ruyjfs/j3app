//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('scrum').controller('NoteSaveCtrl', [ '$scope', '$timeout', '$mdSidenav', '$mdUtil', '$log', '$meteor', '$rootScope', '$mdDialog', 'id', '$stateParams',
    function ($scope, $timeout, $mdSidenav, $mdUtil, $log, $meteor, $rootScope, $mdDialog, id, $stateParams) {

        $scope.helpers({
            stories: function () {
                Meteor.subscribe('stories');
                return Story.find({projectId: $stateParams.id});
            },
            members: function () {
                Meteor.subscribe('users');
                return Meteor.users.find({});
            }
        });

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
            Materialize.toast('Saved successfully!', 4000);
            $scope.form = '';
            $mdDialog.hide();

        }

        //$scope.save = function () {
        //    Meteor.call('noteSave', $scope.form, function (error) {
        //        if (error) {
        //            Materialize.toast('Erro: ' + error, 4000);
        //        } else {
        //            Materialize.toast('Saved successfully!', 4000);
        //            $scope.form = '';
        //            $mdDialog.hide();
        //        }
        //    });
        //}

        $scope.close = function () {
            $mdDialog.hide();
        }
    }
]);