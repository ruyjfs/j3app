angular.module('scrum').controller('ProjectSaveCtrl',
    function ($scope, $reactive, $mdDialog, $stateParams, id, $translate) {
        $reactive(this).attach($scope);
        let organizationNamespace = $stateParams.organization;
        organizationId = '';
        if (organizationNamespace != 'organization') {
            let organization = Organization.findOne({namespace: organizationNamespace});
            if (organization) {
                organizationId = organization._id;
            }
        }

        if (id) {
            //$scope.form = $meteor.object(Project, id, false);
            this.form = Project.findOne(id);
            this.action = 'Edit';
        } else {
            this.form = {};
            this.form.color = '#ffcc80';
            this.userId = Meteor.userId();
            this.action = 'Insert';
            this.form.visibility = 2;
            this.form.organization = organizationId;
        }

        if ($stateParams.organization != 'organization') {
            this.teams =  Team.find({$or: [{organization: null}, {organization: ''}, {organization: organizationId}]}, {sort: {name: 1}}).fetch();
        } else {
            if (this.form.teams) {
                this.teams = Team.find({
                    $or: [{members : Meteor.userId()}, {userId : Meteor.userId()}, {_id: {$in: this.form.teams}}]
                }, {sort: {name: 1}}).fetch();
            } else {
                this.teams =  Team.find({
                    $or: [{members : Meteor.userId()}, {userId : Meteor.userId()}]
                }, {sort: {name: 1}}).fetch();
            }
        }


        if (organizationId == 0) {
            this.users = Meteor.users.find({}, {sort: {name: 1, lastName: 1}}).fetch();
        } else {
            this.users = Meteor.users.find({$or: [{organizationId: organizationId}, {userId : Meteor.userId()}, {userId : this.userId} ]}, {sort: {name: 1, lastName: 1}}).fetch();
        }

        this.organizations = Organization.find({}, {sort: {name: 1, namespace: 1}}).fetch();

        this.weeks = [
            1,
            2,
            3,
            4
        ];

        this.save = () => {
            Meteor.call('projectSave', this.form, function (error) {
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