//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('scrum').controller('ProjectTeamCtrl', [ '$scope', '$mdDialog', '$mdSidenav', '$mdUtil', '$log', '$reactive',
    function ($scope, $mdDialog, $mdSidenav, $mdUtil, $log, $reactive) {
        $reactive(this).attach($scope);

        this.subscribe('team');
        this.helpers({
            teams: function() {

                if (Meteor.user()){
                    userId = Meteor.user()._id;
                } else {
                    userId = '';
                }

                teams = Team.find(
                    {
                        //$or: [{userId: Meteor.user()._id}, {members : Meteor.user()._id}]

                        $or: [
                            {
                                'userId' : userId,
                            }
                            ,
                            {
                                'members' : userId,
                                //'userId' : friendId,
                                //'friendId' : $rootScope.currentUser._id
                            }
                        ]
                    });
                return teams;
            }
        });

        $scope.remove = function(team) {
            console.log(this.getReactively('teams'));
            this.teams.remove(team);
        }

        $scope.modalSave = function(ev, id){
            $mdDialog.show({
                controller: 'TeamSaveCtrl',
                templateUrl: 'module/scrum/client/view/team-save.ng.html',
                clickOutsideToClose:true,
                locals : {
                    id: id
                },
                targetEvent: ev
            }).then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });
        };
}]);