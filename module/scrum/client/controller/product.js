angular.module('scrum').controller('ProductCtrl',
    function ($scope, $mdDialog, $mdSidenav, $log, $reactive, $rootScope, $stateParams) {
        $reactive(this).attach($scope);
        $rootScope.titleMiddle = '';

        //Materialize.toast(
        //    'Hello, this screen you can view the products you created and the products that you participate, either in you being on the team linked to the project or standing as PO or Scrum Master.'+
        //    20000
        //);
        //Materialize.toast(
        //    'You can only edit projects that you are the owner.' +
        //    'In all screens with the most (+) button you can add something, then add a team to the project elogo then the product linking the team in the registration of the product.',
        //    20000
        //);
        $scope.progressBar = {};
        // $scope.progressBar.organization = Meteor.subscribe('organization').ready();
        this.subscribe('organization', () => {}, {onReady: () => {$scope.progressBar.organization = true;}});
        $scope.progressBar.project = Meteor.subscribe('project').ready();
        this.subscribe('project', () => {}, {onReady: function () {$scope.progressBar.project = true;}});
        $scope.progressBar.users = Meteor.subscribe('users').ready();
        this.subscribe('users', () => {}, {onReady: function () {$scope.progressBar.users = true;}});
        $scope.progressBar.team = Meteor.subscribe('team', $stateParams.organization).ready();
        this.subscribe('team', () => {return [$stateParams.organization]}, {onReady: function () {$scope.progressBar.team = true;}});
        $scope.progressBar.sprint = Meteor.subscribe('sprint', $stateParams.organization).ready();
        this.subscribe('sprint', () => {return [$stateParams.organization]}, {onReady: function () {$scope.progressBar.sprint = true;}});
        $scope.booLoading = true;
        $scope.$watchCollection('progressBar', function() {
            if (
                    $scope.progressBar.organization,
                    $scope.progressBar.project,
                    $scope.progressBar.users,
                    $scope.progressBar.sprint,
                    $scope.progressBar.team
            ) {
                // let organisations = Organization.find({}, {sort: {name: 1}}).map((organization) => {return organization});
                // if (organisations.length == 0) {
                //     if (Session.get('booMsgOrganization') != true) {
                //         Materialize.toast(
                //             $translate.instant('Hi, my name is Ryu, i will help you with whatever it takes.')
                //             , 120000);
                //         Materialize.toast(
                //             $translate.instant('You have no organization, click the red button to create an organization, or contact the owner of an organization to add you to their organization.')
                //             , 120000);
                //         Materialize.toast(
                //             $translate.instant('You can create products without organization, just enter the card without organization. For more information, click on the question mark icon in the top menu.')
                //             , 120000);
                //         Materialize.toast(
                //             $translate.instant('If you have any questions or suggestions, please contact us at contact@j3scrum.com.')
                //             , 120000);
                //         Materialize.toast(
                //             $translate.instant('To close these messages, drag to the side.')
                //             , 120000);
                //         Materialize.toast(
                //             $translate.instant("I'm so glad you joined j3scrum, many things are still to come, best regards!!!")
                //             , 120000);
                //         Session.set('booMsgOrganization', true);
                //     }
                //     $document.ready(() => {
                //         $('.md-fab').addClass('pulse');
                //         console.log($('.md-fab'));
                //     });
                // }
                $scope.booLoading = false;
                $('#progressBar').fadeOut('slow');
            }
        });

        this.helpers({
            projects: function () {
                let organizationId = '';
                if ($stateParams.organization == 'organization') {
                    projects = Project.find({$or: [{organization: ''}, {organization: null}]}, {sort: {name: 1}});
                } else {
                    organization = Organization.findOne({namespace: $stateParams.organization});
                    if (organization) {
                        organizationId = organization._id;
                    }
                    projects = Project.find({organization: organizationId}, {sort: {name: 1}});
                }

                projects = projects.map(function (project) {
                    if (!project.namespace || $stateParams.organization == 'organization') {
                        project.namespace = project._id;
                    }

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
                    if (project.organization) {
                        project.organizationNamespace = organization.namespace;
                    } else {
                        project.organizationNamespace = 'organization';
                    }

                    return project;
                });

                return projects;
            }
        }, true);

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
        };

        this.remove = function (id) {
            this.projects.remove(id);
        };

        this.modalProjectSave = function (ev, id) {
            $mdDialog.show({
                controller: 'ProjectSaveCtrl as ctrl',
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
    }
);