//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('scrum').controller('ContactSaveCtrl', ['$scope', '$reactive', '$mdSidenav', '$mdUtil', '$log', '$meteor', '$rootScope', '$mdDialog', 'id',
    function ($scope, $reactive, $mdSidenav, $mdUtil, $log, $meteor, $rootScope, $mdDialog, id) {
        $reactive(this).attach($scope);

        $scope.form = {};
        $scope.form.email = '';

        $scope.saveFriend = function () {

            console.log($scope.form.email);
            contact = Meteor.users.findOne({email: $scope.form.email});
            if (contact) {
                Meteor.subscribe('contact');
                Meteor.subscribe('users');
                oldContact = Contact.findOne({$and: [{contactId: contact._id}, {userId: Meteor.user()._id}]});
                if (oldContact) {
                    var user = Meteor.users.findOne({_id: oldContact.contactId});
                    oldContact.name = user.name;
                    Materialize.toast(oldContact.name + ' it is already a contact!', 4000);
                    $scope.form = '';
                    $mdDialog.hide();
                } else {
                    $scope.form.contactId = contact._id;
                    Meteor.call('contactSave', $scope.form, function (error) {
                        if (error) {
                            //console.log('Oops, unable to invite!');
                            Materialize.toast('Erro: ' + error, 4000);
                        } else {
                            Materialize.toast('Saved successfully!', 4000);
                            $scope.form = '';
                            $mdDialog.hide();
                        }
                    });
                }

            } else {
                Materialize.toast('Contact not found!', 4000);
            }
        }

        $scope.close = function () {
            $mdDialog.hide();
        }
    }
]);