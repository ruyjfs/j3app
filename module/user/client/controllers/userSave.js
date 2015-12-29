//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('user').controller('UserSaveCtrl', [ '$scope', '$timeout', '$mdSidenav', '$mdUtil', '$log', '$meteor', '$mdDialog', '$reactive',
    function ($scope, $timeout, $mdSidenav, $mdUtil, $log, $meteor, $mdDialog, $reactive) {
        $reactive(this).attach($scope);

        //$scope.dataForm = $meteor.object(Users, $rootScope.currentUser._id, false);
        //$scope.members = $meteor.collection(Meteor.users, false).subscribe('users');

        //$scope.dataForm = $meteor.object(Meteor.users, Meteor.user()._id, false);
        //$scope.dataForm = Meteor.users().findOne(Meteor.user()._id);
        this.form = Meteor.users.findOne(Meteor.user()._id);
        this.form.email = this.form.emails[0].address;

        this.saveUser = function (){
            Meteor.call('userSave', this.form, function (error) {
                if (error) {
                    console.log('Oops, unable to invite!');
                } else {
                    this.form = Meteor.users.findOne(Meteor.user()._id);
                    //console.log(this.form);
                    //console.log('aqui');
                    console.log('Saved!');
                }
            });

            //this.form.save().then(function (numberOfDocs) {
            //    console.log('save success doc affected ', numberOfDocs);
            //    //$scope.dataForm = $meteor.object(Meteor.users, $rootScope.currentUser._id, false);
            //}, function (error) {
            //    console.log('save error', error);
            //});

            //$meteor.call('teamSave', $scope.teamForm).then(
            //    function(data){
            //        console.log('success inviting', data);
            //    },
            //    function(err){
            //        console.log('failed', err);
            //    }
            //);
            //if(
            //    this.dataForm.name,
            //        this.dataForm.lastName,
            //        this.dataForm.email
            //){
                //if (id) {
                //this.form.save().then(function(numberOfDocs){
                //    console.log('save success doc affected ', numberOfDocs);
                //    //$scope.dataForm = $meteor.object(Meteor.users, $rootScope.currentUser._id, false);
                //}, function(error){
                //    console.log('save error', error);
                //});
                //$scope.dataForm.emailMain = $scope.dataForm.emails[0].address;
                //console.log($scope.dataForm);
                //} else {
                //    Team.insert($scope.teamForm);
                //}
                //$scope.teamForm = '';
                //$mdDialog.hide();
            //}
        }

        this.close = function () {
            $mdDialog.hide();
        }
    }
]);