//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('scrum').controller('TeamCtrl', [ '$scope', '$mdDialog', '$mdSidenav', '$mdUtil', '$log', '$reactive',
    function ($scope, $mdDialog, $mdSidenav, $mdUtil, $log, $reactive) {
        $reactive(this).attach($scope);

        this.subscribe('team');
        this.helpers({
            teams: function() {
                teams = Team.find(
                    {
                        //$or: [{userId: Meteor.user()._id}, {members : Meteor.user()._id}]

                        $or: [
                            {
                                'userId' : Meteor.user()._id,
                            }
                            ,
                            {
                                'members' : Meteor.user()._id,
                                //'userId' : friendId,
                                //'friendId' : $rootScope.currentUser._id
                            }
                        ]
                    });
                return teams;
            }
        });

        $scope.remove = function(team) {
            $scope.teams.remove(team);
        }

        $scope.modalSave = function(ev, id){
            //$mdDialog.alert()
            //    .parent(angular.element(document.querySelector('#popupContainer')))
            //    .clickOutsideToClose(true)
            //    .title('This is an alert title')
            //    .content('You can specify some description text in here.')
            //    .ariaLabel('Alert Dialog Demo')
            //    .ok('Got it!')
            //    .targetEvent(ev)

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