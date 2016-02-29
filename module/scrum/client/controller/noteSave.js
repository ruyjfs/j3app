//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('scrum').controller('NoteSaveCtrl', [ '$scope', '$mdDialog', 'id', 'storyId', '$stateParams',
    function ($scope, $mdDialog, id, storyId, $stateParams) {

        Meteor.subscribe('note');
        Meteor.subscribe('story');
        Meteor.subscribe('users');

        $scope.helpers({
            stories: function () {
                return Story.find({projectId: $stateParams.id});
            },
            members: function () {
                return Meteor.users.find({});
            },
            projects: function () {
                teamsId = Team.find({$or: [{members: Meteor.userId()}, {userId: Meteor.userId()}]}).map(function(member){
                    return member._id;
                });
                projects = Project.find({$or: [{userId: Meteor.userId()}, {teams: {$in: teamsId}}]})
                return projects;
            }
        });

        $scope.form = {};
        if (id) {
            $scope.form = Note.findOne(id);
            $scope.projectIdOwd = $scope.form.projectId;
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

        $scope.save = function () {
            Meteor.call('noteSave', $scope.form, function (error) {

                if ($scope.projectIdOwd != $scope.form.projectId) {
                    $scope.form.story = '';
                    $scope.form.sprintId = '';
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