//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('scrum').controller('TeamSaveCtrl', [ '$scope', '$rootScope', '$mdDialog', 'id',
    function ($scope, $rootScope, $mdDialog, id) {

        $scope.title = 'Scrum';
        Meteor.subscribe('users');
        Meteor.subscribe('team');
        //$scope.members = $meteor.collection(Meteor.users, false).subscribe('users');
        $scope.members = Meteor.users.find().fetch();
        $scope.times = [
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9
        ];

        if (id) {
            //$scope.form = $meteor.object(Project, id, false);
            $scope.form = Team.findOne(id);
        } else {
            $scope.form = {};
        }

        $scope.save = function (){
            //$meteor.call('teamSave', $scope.teamForm).then(
            //    function(data){
            //        console.log('success inviting', data);
            //    },
            //    function(err){
            //        console.log('failed', err);
            //    }
            //);

            Meteor.call('teamSave', $scope.form, function (error) {
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