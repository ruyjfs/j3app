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
                            team.members = Meteor.users.find({_id: {$in: team.members}}).map(function(user){
                                if (user.status) {

                                    if (user.status.lastLogin) {

                                        if (moment(new Date).diff(moment(user.status.lastLogin.date), 'days') > 2) {
                                            user.statusLastLoginDate = moment(user.status.lastLogin.date).format('L H[h]m');
                                        } else {
                                            user.statusLastLoginDate = moment(user.status.lastLogin.date).fromNow(); // in 40 minutes
                                        }
                                    }
                                    //console.log(user.status.lastLogin.date);
                                    //moment(user.status.lastLogin.date).format('L LT')
                                    //user.status.lastLogin.dateTreated = '';
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
                                    user.img = 'http://www.gravatar.com/avatar/' + CryptoJS.MD5(user.emails[0].address).toString() + '?s=60&d=mm';
                                } else {
                                    user.img = 'http://www.gravatar.com/avatar/00000000000000000000000000000000?s=60&d=mm&f=y';
                                }

                                user.nameTreated = user.name + ' ' + user.lastName;
                                if (user.nameTreated.length > 14) {
                                    user.nameTreated = user.nameTreated.substr(0,13) + '...';
                                }

                                return user;
                            });

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