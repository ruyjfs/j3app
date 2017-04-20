//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('scrum').controller('ProjectSaveCtrl', ['$scope', '$reactive', '$mdDialog' , '$stateParams', 'id',
    function ($scope, $reactive, $mdDialog, $stateParams, id) {
        $reactive(this).attach($scope);
        //this.title = 'Project';

        //this.subscribe('team', function(){return [$stateParams.organization]});
        //this.subscribe('users');
        this.subscribe('organization');
        // this.subscribe('team', function(){return [$stateParams.organization]});
        var organizationNamespace = $stateParams.organization;
        organizationId = '';
        if (organizationNamespace != 'organization') {
            var organization = Organization.findOne({namespace: organizationNamespace});
            if (organization) {
                organizationId = organization._id;
            }
        }

        if (id) {
            //$scope.form = $meteor.object(Project, id, false);
            $scope.form = Project.findOne(id);
            $scope.action = 'Edit';
        } else {
            $scope.form = {};
            $scope.form.color = '#ffcc80';
            $scope.userId = Meteor.userId();
            $scope.action = 'Insert';
            $scope.form.visibility = 2;
            $scope.form.organization = organizationId;
        }

        if ($stateParams.organization != 'organization') {
            $scope.teams =  Team.find({$or: [{organization: null}, {organization: ''}, {organization: organizationId}]}, {sort: {name: 1}}).fetch();
        } else {
            if ($scope.form.teams) {
                $scope.teams = Team.find({
                    $or: [{members : Meteor.userId()}, {userId : Meteor.userId()}, {_id: {$in: $scope.form.teams}}]
                }, {sort: {name: 1}}).fetch();
            } else {
                $scope.teams =  Team.find({
                    $or: [{members : Meteor.userId()}, {userId : Meteor.userId()}]
                }, {sort: {name: 1}}).fetch();
            }
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

            isValid = true;
            if (id) {
                where = {$and: [{namespace: $scope.form.namespace}, {organization: organizationId}], _id: {$not: id}};
            } else {
                where = {$and: [{namespace: $scope.form.namespace}, {organization: organizationId}]};
            }
            spacenameExist = Project.findOne(where);

            if (spacenameExist) {
                Materialize.toast('Erro: ' + 'Namespace already exists for a product in this organization', 4000);
            } else {
                Meteor.call('projectSave', $scope.form, function (error) {
                    if (error) {
                        Materialize.toast('Erro: ' + error, 4000);
                    } else {
                        Materialize.toast('Saved successfully!', 4000);
                        $scope.form = '';
                        $mdDialog.hide();
                    }
                });
            }
        };

        $scope.close = function () {
            $mdDialog.hide();
        }
    }
]);