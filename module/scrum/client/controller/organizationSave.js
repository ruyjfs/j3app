angular.module('scrum').controller('OrganizationSaveCtrl',
    function ($scope, $reactive, $mdDialog, $rootScope, id, $document) {
        $reactive(this).attach($scope);
        this.title = 'Organization';
        Meteor.subscribe('users');
        $rootScope.organizationId = id;

        if (id) {
            //$scope.form = $meteor.object(Organization, id, false);
            $scope.form = Organization.findOne(id);
            $scope.action = 'Edit';
        } else {
            $scope.form = {};
            $scope.form.color = '#ffcc80';
            $scope.userId = Meteor.userId();
            $scope.action = 'Insert';
            $scope.form.visibility = 3;
        }

        //Meteor.subscribe('team');
        //if ($scope.form.teams) {
        //    $scope.teams = Team.find({
        //        $or: [{members : Meteor.userId()}, {userId : Meteor.userId()}, {_id: {$in: $scope.form.teams}}]
        //    }, {sort: {name: 1}}).fetch();
        //} else {
        //    $scope.teams =  Team.find({
        //        $or: [{members : Meteor.userId()}, {userId : Meteor.userId()}]
        //    }).fetch();
        //}
        $scope.users = Meteor.users.find({}, {sort: {name: 1, lastName: 1}}).fetch();

        $scope.save = function () {
            if ($scope.elmForm.$valid) {
                Meteor.call('organizationSave', $scope.form, function (error) {
                    if (error) {
                        Materialize.toast(error, 4000);
                    } else {
                        Materialize.toast('Saved successfully!', 4000);
                        $scope.form = '';
                        $mdDialog.hide();
                    }
                });
            } else {
                Materialize.toast('Erro: ', 4000);
            }
        };

        $scope.close = function () {
            $mdDialog.hide();
        }

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
                 var users = Meteor.users.find({}, {

                    //limit: parseInt(this.getReactively('perPage')),
                    //skip: parseInt((this.getReactively('page') - 1) * this.getReactively('perPage')),
                    //sort: this.getReactively('sort')
                });

                console.log(users);

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

        $scope.remove = function(team) {
            this.teams.remove(team);
        };

        $document.ready(() => {
        });
    }
);