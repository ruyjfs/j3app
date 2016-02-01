//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('scrum').controller('StorySaveCtrl', [ '$scope', '$timeout', '$mdSidenav', '$mdUtil', '$log', '$meteor', '$rootScope', '$mdDialog', 'id', '$stateParams',
    function ($scope, $timeout, $mdSidenav, $mdUtil, $log, $meteor, $rootScope, $mdDialog, id, $stateParams) {

        if (id) {
            $scope.form = Story.findOne(id);
        } else {
            $scope.form = {};
        }
        $scope.form.projectId = $stateParams.id;

        $scope.save = function () {
            Meteor.call('storySave', $scope.form, function (error) {
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