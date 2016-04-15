//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('user').controller('UserSaveCtrl', [ '$scope', '$timeout', '$mdSidenav', '$mdUtil', '$log', '$meteor', '$mdDialog', '$reactive',
    function ($scope, $timeout, $mdSidenav, $mdUtil, $log, $meteor, $mdDialog, $reactive) {
        $reactive(this).attach($scope);

        //$scope.dataForm = $meteor.object(Users, $rootScope.currentUser._id, false);
        //$scope.members = $meteor.collection(Meteor.users, false).subscribe('users');

        //$scope.dataForm = $meteor.object(Meteor.users, Meteor.user()._id, false);
        //$scope.dataForm = Meteor.users().findOne(Meteor.user()._id);

        this.subscribe('users');
        this.form = Meteor.users.findOne(Meteor.userId());
        console.log(Meteor.userId());
        console.log(this.form);

        user = Meteor.users.findOne(Meteor.userId());
        console.log(user);
        if (user.status) {
            if (user.status.idle == true) {
                user.statusColor = ' #FFC107';
                user.statusName = ' Away';
            } else if (user.status.online == true) {
                user.statusColor = ' #9ACD32';
                user.statusName = ' Online';
            } else {
                user.statusColor = ' rgba(224, 224, 224, 0.77)';
                user.statusName = ' Offline';
            }
        } else {
            user.statusColor = ' rgba(224, 224, 224, 0.77)';
            user.statusName = ' Offline';
        }

        // Imagem do gravatar.
        if (user.emails && user.emails[0].address) {
            user.img = 'http://www.gravatar.com/avatar/'+CryptoJS.MD5(user.emails[0].address).toString()+'?s=60&d=mm';
        } else {
            user.img = 'http://www.gravatar.com/avatar/00000000000000000000000000000000?s=60&d=mm&f=y';
        }

        user.nameTreated = user.name + ' ' + user.lastName;
        if (user.nameTreated.length > 14) {
            user.nameTreated = user.nameTreated.substr(0,13) + '...';
        }
        this.user = user;


        this.form.email = this.form.emails[0].address;
        this.saveUser = function (){
            Meteor.call('userSave', this.form, function (error) {
                if (error) {
                    //console.log('Oops, unable to invite!');
                    Materialize.toast('Erro: ' + error, 4000);
                } else {
                    this.form = Meteor.users.findOne(Meteor.user()._id);
                    //console.log(this.form);
                    //console.log('aqui');
                    Materialize.toast('Saved successfully!', 4000);
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
    }
]);