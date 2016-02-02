//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('scrum').controller('ContactCtrl', [ '$scope', '$mdDialog', '$mdSidenav', '$mdUtil', '$log', '$reactive',
    function ($scope, $mdDialog, $mdSidenav, $mdUtil, $log, $reactive) {
        $reactive(this).attach($scope);
        this.helpers({
            contacts: function() {
                Meteor.subscribe('contact');
                Meteor.subscribe('users');
                contacts = Contact.find({userId: Meteor.user()._id}).map(function(contact){
                    var user = Meteor.users.findOne({_id:contact.contactId});
                    contact.name = user.name;
                    contact.lastName = user.lastName;
                    contact.email = user.email;
                    return contact;
                });
                return contacts;
            }
        });

        //$scope.remove = function(team) {
        //    console.log(this.getReactively('teams'));
        //    this.teams.remove(team);
        //}
}]);

