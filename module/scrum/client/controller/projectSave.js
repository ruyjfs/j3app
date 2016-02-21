//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('scrum').controller('ProjectSaveCtrl', ['$scope', '$reactive', '$mdDialog', 'id',
    function ($scope, $reactive, $mdDialog, id) {
        $reactive(this).attach($scope);
        this.title = 'Project';

        if (id) {
            //$scope.form = $meteor.object(Project, id, false);
            $scope.form = Project.findOne(id);
        } else {
            $scope.form = {};
        }

        $scope.helpers({
            teams: function () {
                if ($scope.form.teams) {
                    return Team.find({
                        $or: [{members : Meteor.user()._id}, {userId : Meteor.user()._id}, {_id: {$in: $scope.form.teams}}]
                    });
                } else {
                    return Team.find({
                        $or: [{members : Meteor.user()._id}, {userId : Meteor.user()._id}]
                    });
                }
            }
        });

        $scope.weeks = [
            1,
            2,
            3,
            4
        ];

        $scope.save = function () {

            Meteor.call('projectSave', $scope.form, function (error) {
                if (error) {
                    Materialize.toast('Erro: ' + error, 4000);
                } else {
                    Materialize.toast('Saved successfully!', 4000);
                    $scope.form = '';
                    $mdDialog.hide();
                }
            });
        };

        $scope.close = function () {
            $mdDialog.hide();
        }
    }
]);