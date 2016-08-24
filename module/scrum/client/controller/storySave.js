angular.module('scrum').controller('StorySaveCtrl', [ '$scope', '$mdDialog', 'id', '$stateParams',
    function ($scope, $mdDialog, id, $stateParams) {

        if (id) {
            $scope.form = Story.findOne(id);
            $scope.action = 'Edit';
        } else {
            $scope.form = {};
            $scope.form.color = '#ffcc80';
            $scope.action = 'Insert';
        }
        $scope.form.projectId = $stateParams.id;

        $scope.save = function () {
            Meteor.call('storySave', $scope.form, function (error) {
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