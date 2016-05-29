//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('scrum').controller('ContactCtrl', [ '$scope', '$mdDialog', '$mdSidenav', '$log', '$reactive',
    function ($scope, $mdDialog, $mdSidenav, $log, $reactive) {
        $reactive(this).attach($scope);
        $scope.helpers({
            contacts: function() {
                Meteor.subscribe('contact');
                Meteor.subscribe('users');

                if (Meteor.userId()) {
                    contacts = Contact.find({userId: Meteor.userId()}).map(function(contact){
                        var user = Meteor.users.findOne({_id:contact.contactId});
                        contact.name = user.name;
                        contact.lastName = user.lastName;
                        contact.email = user.email;
                        return contact;
                    });
                } else {
                    contacts = [];
                }
                return contacts;
            }
        });

        //$scope.remove = function(team) {
        //    console.log(this.getReactively('teams'));
        //    this.teams.remove(team);
        //}
}]);

