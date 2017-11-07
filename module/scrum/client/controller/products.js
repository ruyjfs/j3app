angular.module('scrum').controller('ProductsCtrl',
    function ($scope, $mdDialog, $mdSidenav, $log, $reactive, $rootScope, $stateParams, $translate, $document) {
        $reactive(this).attach($scope);
        $translate.use(Session.get('lang'));
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
        $scope.progressBar.users = Meteor.subscribe('users').ready();123456

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
                let arrProject = Project.find({}, {sort: {name: 1}}).fetch();
                if (arrProject.length == 0) {
                    // if (Session.get('booMsgProduct') != true) {
                    //     Materialize.toast(
                    //         $translate.instant('This is where the products of the organization are.')
                    //         , 140000);
                    //     Materialize.toast(
                    //         $translate.instant('In scrum we call any type of project in a product.')
                    //         , 140000);
                    //     Materialize.toast(
                    //         $translate.instant("Following the hierarchical order in j3scrum, an organization owns the products, a product has several sprints and each sprint have several tasks.")
                    //         , 140000);
                    //     Materialize.toast(
                    //         $translate.instant("Relax, when entering the product you will know better how the scrum works and the main one as it is a kanban.")
                    //         , 140000);
                    //     Materialize.toast(
                    //         $translate.instant("Click the red button to create a product.")
                    //         , 140000);
                    //     Materialize.toast(
                    //         $translate.instant("Do not forget, every screen has the question button in the upper corner to better explain the scrum and the functionality of each screen.")
                    //         , 140000);
                    //     Materialize.toast(
                    //         $translate.instant("Good luck with the product!!!")
                    //         , 140000);

                        $('.tap-target').tapTarget('open');
                        Session.set('booMsgProduct', true);
                    // }
                    $document.ready(() => {
                        $('.md-fab').addClass('pulse');
                    });
                }
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
