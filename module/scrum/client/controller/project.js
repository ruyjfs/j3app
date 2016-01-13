//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams'',
//    function($scope, $stateParams){
angular.module('scrum').controller('ProjectCtrl', ['$scope', '$mdDialog', '$mdSidenav', '$log', '$reactive',
    function ($scope, $mdDialog, $mdSidenav, $log, $reactive) {
        $reactive(this).attach($scope);

        //console.log(Meteor.user()._id);
        this.subscribe('project');
        this.subscribe('team');
        this.helpers({
            projects: function () {
                projectsNew = [];
                projects = Project.find({});
                projects.forEach(function(project){
                    if (project.userId && project.userId != Meteor.user()._id) {
                        if (project.teams) {
                            teams = Team.find({
                                    _id: { $in: project.teams},
                                    $and: [{'members' : Meteor.user()._id}]
                                });
                            if (teams.fetch().length > 0) {
                                projectsNew.push(project);
                            }
                        }
                    } else if (project) {
                        projectsNew.push(project);
                    }
                });
                return projectsNew;
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