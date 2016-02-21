//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('scrum').controller('NoteSaveCtrl', [ '$scope', '$mdDialog', 'id', '$stateParams',
    function ($scope, $mdDialog, id, $stateParams) {

        Meteor.subscribe('note');
        Meteor.subscribe('story');
        Meteor.subscribe('users');

        $scope.helpers({
            stories: function () {
                return Story.find({projectId: $stateParams.id});
            },
            members: function () {
                return Meteor.users.find({});
            }
        });

        $scope.form = {};
        if (id) {
            $scope.form = Note.findOne(id);
            console.log(Note.findOne(id));
            console.log($scope.form);
        }
        //$scope.form.projectId = $stateParams.id;

        $scope.save = function () {
            Meteor.call('noteSave', $scope.form, function (error) {
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