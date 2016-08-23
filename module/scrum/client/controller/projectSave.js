//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('scrum').controller('ProjectSaveCtrl', ['$scope', '$reactive', '$mdDialog' , '$stateParams', 'id',
    function ($scope, $reactive, $mdDialog, $stateParams, id) {
        $reactive(this).attach($scope);
        //this.title = 'Project';

        var organizationId = $stateParams.organizationId;
        console.log(organizationId);
        //this.subscribe('team');
        //this.subscribe('users');

        if (id) {
            //$scope.form = $meteor.object(Project, id, false);
            $scope.form = Project.findOne(id);
            $scope.action = 'Edit';
        } else {
            $scope.form = {};
            $scope.userId = Meteor.userId();
            $scope.action = 'Insert';
        }

        if ($scope.form.teams) {
            $scope.teams = Team.find({
                $or: [{members : Meteor.userId()}, {userId : Meteor.userId()}, {_id: {$in: $scope.form.teams}}]
            }, {sort: {name: 1}}).fetch();
        } else {
            $scope.teams =  Team.find({
                $or: [{members : Meteor.userId()}, {userId : Meteor.userId()}]
            }).fetch();
        }

        if (organizationId == 0) {
            $scope.users = Meteor.users.find({}, {sort: {name: 1, lastName: 1}}).fetch();
        } else {
            $scope.users = Meteor.users.find({$or: [{organizationId: organizationId}, {userId : Meteor.userId()}, {userId : $scope.userId} ]}, {sort: {name: 1, lastName: 1}}).fetch();
        }

        $scope.organizations = Organization.find({}, {sort: {name: 1, namespace: 1}}).fetch();

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