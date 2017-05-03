angular.module('scrum').controller('TeamSaveCtrl',
    function ($scope, $rootScope, $mdDialog, id, $stateParams, $reactive, $translate) {
        $reactive(this).attach($scope);
        $translate.use(Session.get('lang'));

        let organization =  false;
        let organizationId = false;
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
            this.members = Meteor.users.find(whereUser, {sort: {name: 1, lastName: 1}}).fetch();
        } else {
            this.members = [];
        }

        if (id) {
            //this.form = $meteor.object(Project, id, false);
            this.form = Team.findOne(id);
            if (!this.form.color) {
                this.form.color = '#ffcc80';
            }
            this.action = 'Edit';
        } else {
            this.form = {};
            this.form.color = '#ffcc80';
            this.form.time = 1;
            this.action = 'Insert';
        }
        if (organizationId) {
            this.form.organization = organizationId;
        }

        this.save = () => {
            Meteor.call('teamSave', this.form, (error) => {
                if (error) {
                    $('md-dialog').animateCss('jello');
                    Materialize.toast($translate.instant('Notice') + ': '+ $translate.instant(error.reason) + '!', 4000, 'rounded red accent-1');
                } else {
                    Materialize.toast($translate.instant('Saved successfully') + '!', 4000, 'rounded green accent-1 green-text text-darken-4');
                    this.form = '';
                    $mdDialog.hide();
                }
            });
        };

        this.close = () => {
            $mdDialog.hide();
        }
    }
);