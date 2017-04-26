//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('scrum').controller('ContactSaveCtrl', ['$scope', '$reactive', '$mdSidenav', '$mdUtil', '$log', '$meteor', '$rootScope', '$mdDialog', 'id',
    function ($scope, $reactive, $mdSidenav, $mdUtil, $log, $meteor, $rootScope, $mdDialog, id) {
        $reactive(this).attach($scope);
        // this.form = {};
        // this.form.email = '';
        // this.saveFriend = function () {
            // console.log($scope.form.email);
            // contact = Meteor.users.findOne({email: $scope.form.email});
            // if (contact) {
            //     Meteor.subscribe('contact');
            //     Meteor.subscribe('users');
            //     oldContact = Contact.findOne({$and: [{contactId: contact._id}, {userId: Meteor.user()._id}]});
            //     if (oldContact) {
            //         var user = Meteor.users.findOne({_id: oldContact.contactId});
            //         oldContact.name = user.name;
            //         Materialize.toast(oldContact.name + ' it is already a contact!', 4000);
            //         $scope.form = '';
            //         $mdDialog.hide();
            //     } else {
            //         $scope.form.contactId = contact._id;
            //         Meteor.call('contactSave', $scope.form, function (error) {
            //             if (error) {
            //                 //console.log('Oops, unable to invite!');
            //                 Materialize.toast('Erro: ' + error, 4000);
            //             } else {
            //                 Materialize.toast('Saved successfully!', 4000);
            //                 $scope.form = '';
            //                 $mdDialog.hide();
            //             }
            //         });
            //     }
            //
            // } else {
            //     Materialize.toast('Contact not found!', 4000);
            // }
        // };

        this.form = {};
        this.form.contacts = [];
        Meteor.subscribe('users');
        this.save = function(ev){
            let formNew = {};
            formNew.contacts = this.form.contacts.map(function(contact){
                return contact._id;
            });
            this.getReactively('form').contacts  = [];
            Meteor.call('contactSaveAll', formNew, function (error) {
                if (error) {
                    Materialize.toast('Erro: ' + error, 4000);
                } else {
                    Materialize.toast('Saved successfully!', 4000);
                    $mdDialog.hide();
                }
            });
        };

        this.close = function () {
            $mdDialog.hide();
        };

        this.querySearch = function(strSearch) {
            let selector = {};
            if (typeof strSearch === 'string' && strSearch.length) {
                selector = {
                    $or: [
                        {name: {$regex:  `.*${strSearch}.*`, $options : 'i' }},
                        {lastName: {$regex:  `.*${strSearch}.*`, $options : 'i' }},
                        {email: {$regex:  `.*${strSearch}.*`, $options : 'i' }},
                        {emails: {address: {$regex:  `.*${strSearch}.*`, $options : 'i' }}},
                    ],
                    _id: {$not: Meteor.userId()}
                };
            }

            users = Meteor.users.find(selector).fetch();
            return users.map(function (user, index) {
                user.name = user.name + ' ' + user.lastName;
                if (user.emails && user.emails[0].address) { // Imagem do gravatar.
                    user.image = 'http://www.gravatar.com/avatar/' + CryptoJS.MD5(user.emails[0].address).toString() + '?s=40&d=mm';
                } else {
                    user.image = 'http://www.gravatar.com/avatar/00000000000000000000000000000000?s=40&d=mm&f=y';
                }
                return user;
            });
        };
    }
]);