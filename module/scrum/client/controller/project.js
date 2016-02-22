//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams'',
//    function($scope, $stateParams){
angular.module('scrum').controller('ProjectCtrl', ['$scope', '$mdDialog', '$mdSidenav', '$log', '$reactive', '$rootScope',
    function ($scope, $mdDialog, $mdSidenav, $log, $reactive, $rootScope) {
        $reactive(this).attach($scope);

        $scope.teste = '1';
        this.teste2 = '2';

        //console.log(Meteor.user()._id);
        this.subscribe('project');
        this.subscribe('team');
        this.subscribe('users');
        this.helpers({
            projects: function () {
                teamsId = Team.find({$or: [{members: Meteor.userId()}, {userId: Meteor.userId()}]}).map(function(member){
                    return member._id;
                });
                projects = Project.find({$or: [{userId: Meteor.userId()}, {teams: {$in: teamsId}}]}).map(function(project){
                    if (project.teams) {
                        project.teams = Team.find({
                                _id: { $in: project.teams},
                                $or: [{'members' : Meteor.userId(), userId: Meteor.userId()}]
                            }).fetch();
                    }
                    project.owner = Meteor.users.findOne(project.userId);

                    return project;
                });
                return projects;
            }
        });

        //this.projects = Project.find(
        //                {
        //                    //$or: [
        //                    //    {
        //                    //        'userId' : $rootScope.currentUser._id,
        //                    //        'friendId' : friendId
        //                    //    }
        //                    //    ,
        //                    //    {
        //                    //        'userId' : friendId,
        //                    //        'friendId' : $rootScope.currentUser._id
        //                    //    }
        //                    //]
        //                }
        //            );
        //
        //console.log(this.projects);

        //this.projects = $meteor.collection( function() {
        //    return Project.find(
        //        {
        //            //$or: [
        //            //    {
        //            //        'userId' : $rootScope.currentUser._id,
        //            //        'friendId' : friendId
        //            //    }
        //            //    ,
        //            //    {
        //            //        'userId' : friendId,
        //            //        'friendId' : $rootScope.currentUser._id
        //            //    }
        //            //]
        //        }
        //    );
        //});

        //$scope.projects = [];
//console.log($rootScope.currentUser._id);
//console.log($rootScope.currentUser);

        this.items = [
            { name: "Project", icon: "business_center", direction: "left", color: 'red' },
            { name: "Team", icon: "group_work", direction: "top", color: 'blue' }
        ];

        this.isOwner = function(userId) {
            if (userId) {
                return (Meteor.userId() == userId);
            } else {
                return true;
            }
        }

        this.remove = function (id) {
            this.projects.remove(id);
        }

        this.modalProjectSave = function (ev, id) {
            $mdDialog.show({
                controller: 'ProjectSaveCtrl',
                templateUrl: 'module/scrum/client/view/project-save.ng.html',
                clickOutsideToClose: true,
                locals: {
                    id: id
                },
                targetEvent: ev
            }).then(function (answer) {
                this.status = 'You said the information was "' + answer + '".';
            }, function () {
                this.status = 'You cancelled the dialog.';
            });
        };

        $rootScope.titleMiddle = '';
        this.modalTeamSave = function (ev, id) {
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
                clickOutsideToClose: true,
                locals: {
                    id: id
                },
                targetEvent: ev
            }).then(function (answer) {
                this.status = 'You said the information was "' + answer + '".';
            }, function () {
                this.status = 'You cancelled the dialog.';
            });
        };
    }]);