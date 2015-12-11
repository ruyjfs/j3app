//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('user').controller('UserSaveCtrl', [ '$scope', '$timeout', '$mdSidenav', '$mdUtil', '$log', '$meteor', '$rootScope', '$mdDialog',
    function ($scope, $timeout, $mdSidenav, $mdUtil, $log, $meteor, $rootScope, $mdDialog) {

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

        $scope.dataForm = {
            name: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: ''
        };
        //if (id) {
        //    //$scope.teste = $meteor.collection( function() {
        //    //    return Team.findOne(id);
        //    //});
        //    $scope.dataForm = $meteor.object(Team, $rootScope.user._id, false);
        //$scope.dataForm = Users.findOne($rootScope.currentUser._id);

        //$meteor.collection( function() {
        //    return Users.find({});
        //});

        //$scope.teamForm = $meteor.object(Users, id, false);
        //$scope.dataForm = $meteor.object(Users, $rootScope.currentUser._id, false);

        //$meteor.subscribe('users');
        //$scope.dataForm = $meteor.collection( function() {
        //    return Users.findOne($rootScope.currentUser._id);
        //});

        //$scope.dataForm = $meteor.collection(Meteor.users, false).subscribe('users');
//        $scope.teamForm = $meteor.object(Users, $rootScope.currentUser._id, false);
//console.log($scope.dataForm);
        //    //$scope.teamForm = {};
        //    //console.log(id);
        //    //console.log($scope.teste);
        //} else {
        //    $scope.teamForm = {};
        //}



        $scope.save = function (){
            //$meteor.call('teamSave', $scope.teamForm).then(
            //    function(data){
            //        console.log('success inviting', data);
            //    },
            //    function(err){
            //        console.log('failed', err);
            //    }
            //);
            if(
                $scope.teamForm.name,
                $scope.teamForm.time,
                $scope.teamForm.members
            ){

                if (id) {
                    $scope.teamForm.save();
                } else {
                    Team.insert($scope.teamForm);
                }
                $scope.teamForm = '';
                $mdDialog.hide();
            }
        }

        $scope.close = function () {
            $mdDialog.hide();
        }
    }
]);