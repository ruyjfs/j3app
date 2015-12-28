//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('user').controller('UserSaveCtrl', [ '$scope', '$timeout', '$mdSidenav', '$mdUtil', '$log', '$meteor', '$auth', '$mdDialog',
    function ($scope, $timeout, $mdSidenav, $mdUtil, $log, $meteor, $auth, $mdDialog) {

        //$scope.title = 'Scrum';
        //$scope.members = $meteor.collection(Meteor.users, false).subscribe('users');
        //$scope.times = [
        //    1,
        //    2,
        //    3,
        //    4,
        //    5,
        //    6,
        //    7,
        //    8,
        //    9
        //];

        //$scope.dataForm = {
        //    name: '',
        //    lastName: '',
        //    email: '',
        //    password: '',
        //    confirmPassword: ''
        //};

        //$scope.dataForm = $meteor.object(Users, $rootScope.currentUser._id, false);
        //$scope.members = $meteor.collection(Meteor.users, false).subscribe('users');
        $scope.dataForm = $meteor.object(Meteor.users, $auth.currentUser._id, false);
        $scope.dataForm.email = $scope.dataForm.emails[0].address;

        $scope.saveUser = function (){
            //$meteor.call('teamSave', $scope.teamForm).then(
            //    function(data){
            //        console.log('success inviting', data);
            //    },
            //    function(err){
            //        console.log('failed', err);
            //    }
            //);
            if(
                $scope.dataForm.name,
                $scope.dataForm.lastName,
                $scope.dataForm.email
            ){
                //if (id) {
                $scope.dataForm.save().then(function(numberOfDocs){
                    console.log('save success doc affected ', numberOfDocs);
                    //$scope.dataForm = $meteor.object(Meteor.users, $rootScope.currentUser._id, false);
                }, function(error){
                    console.log('save error', error);
                });
                //$scope.dataForm.emailMain = $scope.dataForm.emails[0].address;
                //console.log($scope.dataForm);
                //} else {
                //    Team.insert($scope.teamForm);
                //}
                //$scope.teamForm = '';
                //$mdDialog.hide();
            }
        }

        $scope.close = function () {
            $mdDialog.hide();
        }
    }
]);