//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('scrum').controller('StatusSaveCtrl', [ '$scope', '$mdDialog', 'id', '$stateParams',
    function ($scope, $mdDialog, id, $stateParams) {
        if (id) {
            $scope.form = Status.findOne(id);
            $scope.action = 'Edit';
        } else {
            $scope.form = {};
            $scope.action = 'Insert';
        }
        $scope.form.projectId = $stateParams.id;

        $scope.save = function () {
            Meteor.call('statusSave', $scope.form, function (error) {
                if (error) {
                    Materialize.toast('Erro: ' + error, 4000);
                } else {
                    Materialize.toast('Saved successfully!', 4000);
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