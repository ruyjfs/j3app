angular.module('scrum').controller('SprintSaveCtrl', [ '$scope', '$mdDialog', 'id', '$stateParams',
    function ($scope, $mdDialog, id, $stateParams) {

        Meteor.subscribe('sprint');
        if (id) {
            $scope.form = Sprint.findOne(id);
            //console.log($scope.dateStart);
            //console.log(moment($scope.dateStart, 'x').format('L'));
            //console.log($scope.dateStart);
            //console.log(moment($scope.dateStart, 'x').format('L'));
            //$scope.form.dateStart = moment($scope.dateStart, 'x');
            //$scope.form.dateEnd = moment($scope.dateEnd, 'x');

            if (typeof($scope.form.dateStart) === 'string') {
                $scope.form.dateStart = new Date(moment($scope.form.dateStart, 'x').format());
            }

            if (typeof($scope.form.dateEnd) === 'string') {
                $scope.form.dateEnd = new Date(moment($scope.form.dateEnd, 'x').format());
            }
        } else {
            $scope.form = {};
        }
        $scope.form.projectId = $stateParams.id;

        $scope.save = function () {
            Meteor.call('sprintSave', $scope.form, function (error) {
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