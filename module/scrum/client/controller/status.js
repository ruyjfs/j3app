angular.module('scrum').controller('StatusCtrl', [ '$scope', '$mdDialog', '$reactive', '$stateParams',
    function ($scope, $mdDialog, $reactive, $stateParams) {
        $reactive(this).attach($scope);

        if (!$stateParams.id) {
            $state.go('scrum');
        }

        this.subscribe('status', function(){return [$stateParams.id]});
        this.helpers({
            states: function () {
                return Status.find({});
            }
        });
    }
]);