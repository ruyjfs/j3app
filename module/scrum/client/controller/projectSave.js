//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('scrum').controller('ProjectSaveCtrl', ['$scope', '$timeout', '$mdSidenav', '$mdUtil', '$log', '$meteor', '$reactive', '$rootScope', '$mdDialog', 'id',
    function ($scope, $timeout, $mdSidenav, $mdUtil, $log, $meteor, $reactive, $rootScope, $mdDialog, id) {
        $reactive(this).attach($scope);
        this.title = 'Project';

        $scope.helpers({
            teams: function () {
                return Team.find({});
            }
        });

        $scope.weeks = [
            1,
            2,
            3,
            4
        ];

        if (id) {
            //$scope.form = $meteor.object(Project, id, false);
            $scope.form = Project.findOne(id);
        } else {
            $scope.form = {};
        }

        $scope.save = function () {

            Meteor.call('projectSave', $scope.form, function (error) {
                if (error) {
                    console.log('Oops, unable to invite!');
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