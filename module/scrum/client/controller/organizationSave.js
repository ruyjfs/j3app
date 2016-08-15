//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('scrum').controller('OrganizationSaveCtrl', ['$scope', '$reactive', '$mdDialog', 'id',
    function ($scope, $reactive, $mdDialog, id) {
        $reactive(this).attach($scope);
        this.title = 'Organization';
        Meteor.subscribe('users');

        if (id) {
            //$scope.form = $meteor.object(Organization, id, false);
            $scope.form = Organization.findOne(id);
            $scope.action = 'Edit';
        } else {
            $scope.form = {};
            $scope.userId = Meteor.userId();
            $scope.action = 'Insert';
        }

        //Meteor.subscribe('team');
        //if ($scope.form.teams) {
        //    $scope.teams = Team.find({
        //        $or: [{members : Meteor.userId()}, {userId : Meteor.userId()}, {_id: {$in: $scope.form.teams}}]
        //    }, {sort: {name: 1}}).fetch();
        //} else {
        //    $scope.teams =  Team.find({
        //        $or: [{members : Meteor.userId()}, {userId : Meteor.userId()}]
        //    }).fetch();
        //}
        $scope.users = Meteor.users.find({}, {sort: {name: 1, lastName: 1}}).fetch();

        $scope.save = function () {
            Meteor.call('organizationSave', $scope.form, function (error) {
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