//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('admin').controller('UserSaveModalCtrl', [ '$scope', '$timeout', '$mdSidenav', '$mdUtil', '$log', '$meteor', '$rootScope', '$mdDialog', 'id',
    function ($scope, $timeout, $mdSidenav, $mdUtil, $log, $meteor, $rootScope, $mdDialog, id) {

        Meteor.subscribe('users');
        $scope.form = Meteor.users.findOne(id);
        console.log($scope.form );
        if ($scope.form) {
            $scope.form.email = $scope.form.emails[0].address;
        }
        $scope.save = function (){
            Meteor.call('userSave', $scope.form, function (error) {
                if (error) {
                    //console.log('Oops, unable to invite!');
                    Materialize.toast('Erro: ' + error, 4000);
                } else {
                    $scope.form = Meteor.users.findOne(Meteor.user()._id);
                    Materialize.toast('Saved successfully!', 4000);
                    $scope.form = '';
                    $mdDialog.hide();
                }
            });
        }


        //if (id) {
        //    //$scope.form = $meteor.object(Project, id, false);
        //    Meteor.subscribe('users');
        //    $scope.form = Meteor.users.findOne(id);
        //} else {
        //    $scope.form = {};
        //}

        //$scope.save = function (){
        //    //$meteor.call('teamSave', $scope.teamForm).then(
        //    //    function(data){
        //    //        console.log('success inviting', data);
        //    //    },
        //    //    function(err){
        //    //        console.log('failed', err);
        //    //    }
        //    //);
        //
        //    Meteor.call('userSave', $scope.form, function (error) {
        //        if (error) {
        //            Materialize.toast('Erro: ' + error, 4000);
        //        } else {
        //            Materialize.toast('Saved successfully!', 4000);
        //            $scope.form = '';
        //            $mdDialog.hide();
        //        }
        //    });
        //}

        $scope.close = function () {
            $mdDialog.hide();
        }
    }
]);