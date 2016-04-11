//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('scrum').controller('ProjectTeamCtrl', [ '$scope', '$mdDialog', '$mdSidenav', '$mdUtil', '$log', '$reactive', '$stateParams',
    function ($scope, $mdDialog, $mdSidenav, $mdUtil, $log, $reactive, $stateParams) {
        $reactive(this).attach($scope);
        this.helpers({
            teams: function() {
                project = Project.findOne($stateParams.id);
                if (Meteor.user()){
                    userId = Meteor.userId();
                } else {
                    userId = '';
                }

                //if (project.teams) {
                //    teams = project.teams.map(function(team){
                //        team = Team.findOne(team);
                //        return team;
                //    });
                //}

                if (project && project.teams) {
                    teams = Team.find({_id: {$in: project.teams}}).fetch().map(function(team){
                        if (team.members) {
                            team.members = Meteor.users.find({_id: {$in: team.members}}).fetch();
                        }
                        return team;
                    });
                } else {
                    teams = {}
                }

                //teams = Team.find(
                //    {
                //        //$or: [{userId: Meteor.user()._id}, {members : Meteor.user()._id}]
                //        $or: [
                //            {
                //                'userId' : userId,
                //            }
                //            ,
                //            {
                //                'members' : userId,
                //                //'userId' : contactId,
                //                //'contactId' : $rootScope.currentUser._id
                //            }
                //        ]
                //    }).map(function(team){
                //
                //        return team;
                //    });
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