//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('scrum').controller('TeamSaveCtrl', [ '$scope', '$rootScope', '$mdDialog', 'id', '$stateParams',
    function ($scope, $rootScope, $mdDialog, id, $stateParams) {

        //project = Project.findOne({'namespace': $stateParams.product});
        //if (project) {
        //    $stateParams.id = project._id;
        //}
        $scope.title = 'Scrum';
        //Meteor.subscribe('users');
        //Meteor.subscribe('team');
        //$scope.members = $meteor.collection(Meteor.users, false).subscribe('users');
        var organization =  false;
        var organizationId = false;
        if ($stateParams.organization != 'organization') {
            organization = Organization.findOne({'namespace': $stateParams.organization});
            organizationId = organization._id;
        }
        if (organization) {
            if (organization.members) {
                whereUser = {_id: {$in: organization.members}};
            } else {
                whereUser = false;
            }
        } else {
            whereUser = {};
        }
        if (whereUser) {
            $scope.members = Meteor.users.find(whereUser, {sort: {name: 1, lastName: 1}}).fetch();
        } else {
            $scope.members = [];
        }

        if (id) {
            //$scope.form = $meteor.object(Project, id, false);
            $scope.form = Team.findOne(id);
            $scope.action = 'Edit';
        } else {
            $scope.form = {};
            $scope.form.time = 1;
            $scope.action = 'Insert';
        }
        if (organizationId) {
            $scope.form.organization = organizationId;
        }

        $scope.save = function (){
            //$meteor.call('teamSave', $scope.teamForm).then(
            //    function(data){
            //        console.log('success inviting', data);
            //    },
            //    function(err){
            //        console.log('failed', err);
            //    }
            //);

            Meteor.call('teamSave', $scope.form, function (error) {
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