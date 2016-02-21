angular.module('scrum').controller('StatusCtrl', [ '$scope', '$mdDialog', '$reactive', '$stateParams',
    function ($scope, $mdDialog, $reactive, $stateParams) {
        $reactive(this).attach($scope);

        if (!$stateParams.id) {
            $state.go('scrum');
        }

        Meteor.subscribe('status');
        this.helpers({
            states: function () {
                return Status.find({$or: [{projectId: $stateParams.id}, {projectId: null}]});
            }
        });
    }
]);