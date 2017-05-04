angular.module('scrum').controller('SprintSaveCtrl',
    function ($scope, $mdDialog, id, $stateParams, $reactive, $translate) {
        $reactive(this).attach($scope);
        $translate.use(Session.get('lang'));

        // Meteor.subscribe('sprint');
        if (id) {
            this.form = Sprint.findOne(id);
            //console.log($scope.dateStart);
            //console.log(moment($scope.dateStart, 'x').format('L'));
            //console.log($scope.dateStart);
            //console.log(moment($scope.dateStart, 'x').format('L'));
            //$scope.form.dateStart = moment($scope.dateStart, 'x');
            //$scope.form.dateEnd = moment($scope.dateEnd, 'x');

            if (typeof(this.form.dateStart) === 'string') {
                this.form.dateStart = new Date(moment(this.form.dateStart, 'x').format());
            }

            if (typeof(this.form.dateEnd) === 'string') {
                this.form.dateEnd = new Date(moment(this.form.dateEnd, 'x').format());
            }
            this.action = 'Edit';
        } else {
            this.form = {};
            this.action = 'Insert';
        }
        this.form.projectId = $stateParams.id;

        this.save = () => {
            Meteor.call('sprintSave', this.form, (error) => {
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