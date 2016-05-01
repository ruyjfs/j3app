//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('scrum').controller('NoteViewCtrl', [ '$scope', '$mdDialog', 'id', 'storyId', '$stateParams', '$reactive',
    function ($scope, $mdDialog, id, storyId, $stateParams, $reactive) {
        //$reactive(this).attach($scope);

        $scope.form = {};
        if (id) {
            $scope.form = Note.findOne(id);
            $scope.projectIdOld = $scope.form.projectId;
        } else {
            $scope.form.projectId = $stateParams.id;
            $scope.form.time = 1;
        }

        if (storyId) {
            $scope.form.story = storyId;
            if ($stateParams.sprintId != 1) {
                $scope.form.sprintId = $stateParams.sprintId;
                $scope.form.owner = Meteor.userId();
            }
        }

        //this.subscribe('users');
        Meteor.subscribe('project');
        Meteor.subscribe('team');
        Meteor.subscribe('note');
        Meteor.subscribe('story');
        Meteor.subscribe('users');
        $scope.helpers({
            stories: function () {
                return Story.find({projectId: $stateParams.id}, {sort: {name: 1}});
            },
            members: function () {
                project = Project.findOne($stateParams.id);
                usersId = [];
                if (project && project.teams) {
                    teams = Team.find({_id: {$in: project.teams}}, {sort: {name: 1}}).fetch().map(function(team){
                        if (team.members) {
                            team.members.map(function(userId){
                                usersId.push(userId);
                            });
                        }
                        return team.members;
                    });
                }
                if ($scope.form && $scope.form.owner){
                    usersId.push($scope.form.owner);
                }
                users = Meteor.users.find({_id: {$in: usersId}}, {sort: {name: 1, lastName: 1}});
                return users;
            },
            projects: function () {
                teamsId = Team.find({$or: [{members: Meteor.userId()}, {userId: Meteor.userId()}]}, {sort: {name: 1}}).map(function(member){
                    return member._id;
                });
                projects = Project.find({$or: [{userId: Meteor.userId()}, {teams: {$in: teamsId}}]}, {sort: {name: 1}});
                return projects;
            }
        });
        $scope.save = function () {
            Meteor.call('noteSave', $scope.form, function (error) {

                if ($scope.projectIdOld != $scope.form.projectId) {
                    $scope.form.story = '';
                    $scope.form.sprintId = '';
                    $scope.form.statusId = '';
                }

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