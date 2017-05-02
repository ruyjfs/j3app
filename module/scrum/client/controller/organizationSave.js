angular.module('scrum').controller('OrganizationSaveCtrl',
    function ($scope, $reactive, $mdDialog, $rootScope, id, $translate) {
        $reactive(this).attach($scope);
        $translate.use(Session.get('lang'));
        if (id) {
            //$scope.form = $meteor.object(Organization, id, false);
            this.form = Organization.findOne(id);
            this.action = 'Edit';
        } else {
            this.form = {};
            this.form.color = '#ffcc80';
            this.userId = Meteor.userId();
            this.action = 'Insert';
            this.form.visibility = 3;
        }

        //Meteor.subscribe('team');
        //if (this.form.teams) {
        //    this.teams = Team.find({
        //        $or: [{members : Meteor.userId()}, {userId : Meteor.userId()}, {_id: {$in: this.form.teams}}]
        //    }, {sort: {name: 1}}).fetch();
        //} else {
        //    this.teams =  Team.find({
        //        $or: [{members : Meteor.userId()}, {userId : Meteor.userId()}]
        //    }).fetch();
        //}
        this.users = Meteor.users.find({}, {sort: {name: 1, lastName: 1}}).fetch();

        this.save = function () {
            if (this.elmForm.$valid) {
                Meteor.call('organizationSave', this.form, function (error) {
                    if (error) {
                        $('md-dialog').animateCss('jello');
                        Materialize.toast($translate.instant('Notice') + ': '+ $translate.instant(error.reason) + '!', 4000, 'rounded red accent-1');
                    } else {
                        // Materialize.toast('Saved successfully!', 4000, 'rounded green accent-1 green-text text-darken-4');
                        // Materialize.toast('Saved successfully!', 4000, 'rounded green white-text');
                        Materialize.toast($translate.instant('Saved successfully') + '!', 4000, 'rounded green accent-1 green-text text-darken-4');
                        this.form = '';
                        $mdDialog.hide();
                    }
                });
            } else {
                Materialize.toast('Erro: ', 4000);
            }
        };

        this.close = function () {
            $mdDialog.hide();
        };

        this.perPage = 5;
        this.page = 1;
        this.sort = {
            name: 1
        };

        this.searchText = '';
        //this.subscribe('team', function(){
        //        return [{}, this.getReactively('searchText')
        //        ]
        //    }
        //);
        this.helpers({
            teams: function() {
                return Team.find({}, {

                    limit: parseInt(this.getReactively('perPage')),
                    skip: parseInt((this.getReactively('page') - 1) * this.getReactively('perPage')),
                    sort: this.getReactively('sort')
                });
            },
            users: function() {
                 let users = Meteor.users.find({}, {

                    //limit: parseInt(this.getReactively('perPage')),
                    //skip: parseInt((this.getReactively('page') - 1) * this.getReactively('perPage')),
                    //sort: this.getReactively('sort')
                });
                return users;
            }
        });

        this.total = function() {
            return Counts.get('totalTeam');
        };
        this.pageChanged = function(newPage) {
            this.page = newPage;
        };
        this.sortChange = function(sort) {
            this.sort = {
                name: parseInt(sort)
            };
        };

        this.remove = function(team) {
            this.teams.remove(team);
        };
    }
);