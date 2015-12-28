//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('scrum').controller('StorySaveCtrl', [ '$scope', '$timeout', '$mdSidenav', '$mdUtil', '$log', '$meteor', '$rootScope', '$mdDialog', 'id',
    function ($scope, $timeout, $mdSidenav, $mdUtil, $log, $meteor, $rootScope, $mdDialog, id) {
        $scope.projects = $meteor.collection( function() {
            return Project.find({});
        });

        if (id) {
            $scope.form = $meteor.object(Story, id, false);
        } else {
            $scope.form = {};
        }

        $scope.save = function () {
            if($scope.form.name){
                if($scope.form.name) {
                    if (id) {
                        $scope.form.save();
                    } else {
                        Story.insert($scope.form);
                    }
                }
                $scope.form = '';
                $mdDialog.hide();
            }
        }

        $scope.close = function () {
            $mdDialog.hide();
        }
    }
]);