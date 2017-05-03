angular.module('scrum').controller('StatusSaveCtrl',
    function ($scope, $mdDialog, id, $stateParams, $reactive, $translate) {
        $reactive(this).attach($scope);
        $translate.use(Session.get('lang'));

        let project = Project.findOne({'namespace': $stateParams.id});
        if (project) {
            $stateParams.id = project._id;
        }
        if (id) {
            this.form = Status.findOne(id);
            this.action = 'Edit';
        } else {
            this.form = {};
            this.action = 'Insert';
        }
        this.form.projectId = $stateParams.id;

        this.save = () => {
            Meteor.call('statusSave', this.form, function (error) {
                if (error) {
                    $('md-dialog').animateCss('jello');
                    Materialize.toast($translate.instant('Notice') + ': '+ $translate.instant(error.reason) + '!', 4000, 'rounded red accent-1');
                } else {
                    Materialize.toast($translate.instant('Saved successfully') + '!', 4000, 'rounded green accent-1 green-text text-darken-4');
                    $mdDialog.hide();
                }
            });
        };

        this.close = () => {
            $mdDialog.hide();
        }
    }
);