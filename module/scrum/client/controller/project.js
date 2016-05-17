//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams'',
//    function($scope, $stateParams){
angular.module('scrum').controller('ProjectCtrl', ['$scope', '$mdDialog', '$mdSidenav', '$log', '$reactive', '$rootScope',
    function ($scope, $mdDialog, $mdSidenav, $log, $reactive, $rootScope) {
        $reactive(this).attach($scope);

        //Materialize.toast(
        //    'Hello, this screen you can view the products you created and the products that you participate, either in you being on the team linked to the project or standing as PO or Scrum Master.'+
        //    20000
        //);
        //Materialize.toast(
        //    'You can only edit projects that you are the owner.' +
        //    'In all screens with the most (+) button you can add something, then add a team to the project elogo then the product linking the team in the registration of the product.',
        //    20000
        //);

        //console.log(Meteor.user()._id);
        this.subscribe('project');
        //this.subscribe('team');
        this.subscribe('users');
        this.helpers({
            projects: function () {
                projects = Project.find({}, {sort: {name: 1}}).map(function (project) {
                    Meteor.subscribe('sprint', project._id);
                    //projects = Project.find({$or: [{userId: Meteor.userId()}, {teams: {$in: teamsId}}, {scrumMaster: {$in: [Meteor.userId()]}}]}).map(function(project){
                    if (project.teams) {
                        project.teams = Team.find({
                            _id: {$in: project.teams},
                            $or: [{'members': Meteor.userId(), userId: Meteor.userId()}]
                        }).fetch();
                    }
                    project.owner = Meteor.users.findOne(project.userId);
                    dateNow = moment().format('x');
                    sprint = Sprint.findOne(
                        {
                            $and: [
                                {projectId: project._id},
                                {dateStart: {$lte: dateNow}, dateEnd: {$gte: dateNow}}
                            ]
                        }
                    );

                    if (!sprint) {
                        dateNow = moment()._d;
                        sprint = Sprint.findOne(
                            {
                                $and: [
                                    {projectId: project._id},
                                    {dateStart: {$lte: dateNow}, dateEnd: {$gte: dateNow}}
                                ]
                            }
                        );
                    }

                    if (!sprint) {
                        Meteor.call('sprintCreate', project._id, function (error, result) {
                            if (error) {
                                //console.log(error);
                            } else {
                                //console.log('Saved!');
                                $scope.form = '';
                                $mdDialog.hide();
                            }
                            //$rootScope.titleMiddle = result.dateStart + ' - ' + result.dateEnd + ' (' + result.number + ')';

                            if ($stateParams.sprintId == 1 || $stateParams.sprintId == '') {
                                $state.go('scrum/productkanban', {id: $stateParams.id, sprintId: result._id})
                            }
                            sprint = result;
                            //console.info(result);
                        });
                    }

                    //if (sprint) {
                    project.sprint = sprint;
                    //} else {
                    //    Meteor.call('sprintCreate', project._id, function (error, result) {
                    //        if (error) {
                    //            console.log(error);
                    //        } else {
                    //            //console.log('Saved!');
                    //            //$scope.form = '';
                    //            //$mdDialog.hide();
                    //            project.sprint = result;
                    //        }
                    //    });
                    //}

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
        //                    //        'contactId' : contactId
        //                    //    }
        //                    //    ,
        //                    //    {
        //                    //        'userId' : contactId,
        //                    //        'contactId' : $rootScope.currentUser._id
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
        //            //        'contactId' : contactId
        //            //    }
        //            //    ,
        //            //    {
        //            //        'userId' : contactId,
        //            //        'contactId' : $rootScope.currentUser._id
        //            //    }
        //            //]
        //        }
        //    );
        //});

        //$scope.projects = [];
//console.log($rootScope.currentUser._id);
//console.log($rootScope.currentUser);

        this.items = [
            {name: "Project", icon: "business_center", direction: "left", color: 'red'},
            {name: "Team", icon: "group_work", direction: "top", color: 'blue'}
        ];

        this.isOwner = function (userId) {
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