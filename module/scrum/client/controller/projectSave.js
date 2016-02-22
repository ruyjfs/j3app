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

        Meteor.subscribe('team');
        if ($scope.form.teams) {
            $scope.teams = Team.find({
                $or: [{members : Meteor.userId()}, {userId : Meteor.userId()}, {_id: {$in: $scope.form.teams}}]
            }).fetch();
        } else {
            $scope.teams =  Team.find({
                $or: [{members : Meteor.userId()}, {userId : Meteor.userId()}]
            }).fetch();
        }

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