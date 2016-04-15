//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('user').controller('Friend2Ctrl', [ '$scope', '$mdDialog', '$mdSidenav', '$mdUtil', '$log', '$reactive',
    function ($scope, $mdDialog, $mdSidenav, $mdUtil, $log, $reactive) {
        $reactive(this).attach($scope);
        this.subscribe('team');
        this.helpers({
            friend: function() {
                Meteor.subscribe('users');
                friends = Friend.find({userId: Meteor.user()._id});
                //teams = Team.find(
                //    {
                //        //$or: [{userId: Meteor.user()._id}, {members : Meteor.user()._id}]
                //        $or: [
                //            {
                //                'userId' : Meteor.user()._id,
                //            }
                //            ,
                //            {
                //                'members' : Meteor.user()._id,
                //                //'userId' : contactId,
                //                //'contactId' : $rootScope.currentUser._id
                //            }
                //        ]
                //    });
                return friends;
            },
            contacts: function(){
                contacts = [
                    'Marina Augustine',
                    'Oddr Sarno',
                    'Nick Giannopoulos',
                    'Narayana Garner',
                    'Anita Gros',
                    'Megan Smith',
                    'Tsvetko Metzger',
                    'Hector Simek',
                    'Some-guy withalongalastaname'
                ];
                return contacts.map(function (c, index) {
                    var cParts = c.split(' ');
                    var contact = {
                        name: c,
                        email: cParts[0][0].toLowerCase() + '.' + cParts[1].toLowerCase() + '@example.com',
                        image: 'http://lorempixel.com/50/50/people?' + index
                    };
                    contact._lowername = contact.name.toLowerCase();
                    return contact;
                });
                return [self.allContacts[0]];
            },
            allContacts: function(){
                contacts = [
                    'Marina Augustine',
                    'Oddr Sarno',
                    'Nick Giannopoulos',
                    'Narayana Garner',
                    'Anita Gros',
                    'Megan Smith',
                    'Tsvetko Metzger',
                    'Hector Simek',
                    'Some-guy withalongalastaname'
                ];
                return contacts.map(function (c, index) {
                    var cParts = c.split(' ');
                    var contact = {
                        name: c,
                        email: cParts[0][0].toLowerCase() + '.' + cParts[1].toLowerCase() + '@example.com',
                        image: 'http://lorempixel.com/50/50/people?' + index
                    };
                    contact._lowername = contact.name.toLowerCase();
                    return contact;
                });
            },
            //querySearch: function (query) {
            //var results = query ?
            //    self.allContacts.filter(createFilterFor(query)) : [];
            //return results;
            //}
            //querySearch: function(){
            //
            //}
        });

        $scope.filterSelected = true;
        $scope.remove = function(team) {
            console.log(this.getReactively('teams'));
            this.teams.remove(team);
        }

        this.querySearch = function(query) {
            function createFilterFor(query) {
                var lowercaseQuery = angular.lowercase(query);
                return function filterFn(contact) {
                    return (contact._lowername.indexOf(lowercaseQuery) != -1);;
                };
            }
            console.log('asd');
            var results = query ?
                this.getReactively('allContacts').filter(createFilterFor(query)) : [];
            return results;
        }
}]);