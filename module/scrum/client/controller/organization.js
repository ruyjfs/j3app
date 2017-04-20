//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams'',
//    function($scope, $stateParams){
angular.module('scrum').controller('OrganizationCtrl', ['$scope', '$mdDialog', '$mdSidenav', '$log', '$reactive', '$rootScope', '$stateParams', '$document', '$translate',
    function ($scope, $mdDialog, $mdSidenav, $log, $reactive, $rootScope, $stateParams, $document, $translate) {
        $reactive(this).attach($scope);
        $translate.use(Session.get('lang'));
        if (Session.get('booMsgWelcome') != true) {
            Materialize.toast($translate.instant('Welcome') + '!!! \\o/', 4000, 'rounded orange darken-1');
            Session.set('booMsgWelcome', true);
        }
        // $translate.refresh();
        // let $translate = $filter('translate');

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
        Meteor.subscribe('organization', () => {
            let organisations = Organization.find({}, {sort: {name: 1}}).map((organization) => {return organization});
            if (organisations.length == 0) {
                if (Session.get('booMsgOrganization') != true) {
                    Materialize.toast(
                        $translate.instant('Hi, my name is Ryu, i will help you with whatever it takes.')
                        , 120000);
                    Materialize.toast(
                        $translate.instant('You have no organization, click the red button to create an organization, or contact the owner of an organization to add you to their organization.')
                        , 120000);
                    Materialize.toast(
                        $translate.instant('You can create products without organization, just enter the card without organization. For more information, click on the question mark icon in the top menu.')
                        , 120000);
                    Materialize.toast(
                        $translate.instant('If you have any questions or suggestions, please contact us at contact@j3scrum.com.')
                        , 120000);
                    Materialize.toast(
                        $translate.instant('To close these messages, drag to the side.')
                        , 120000);
                    Materialize.toast(
                        $translate.instant("I'm so glad you joined j3scrum, many things are still to come, best regards!!!")
                        , 120000);
                    Session.set('booMsgOrganization', true);
                }
                // $document.ready(() => {
                //     $('.md-fab').addClass('pulse');
                //     console.log($('.md-fab'));
                // });
            }
        });
        this.subscribe('team', function(){return [$stateParams.organization]});
        this.subscribe('project');
        this.subscribe('users');
        this.helpers({
            organisations: function () {
                let organisations = Organization.find({}, {sort: {name: 1}}).map(function (organization) {
                    projectsId = [];
                    let n = 0;
                    organization.total = {};
                    if (organization.members) {
                        organization.total.members = organization.members.length;
                    } else {
                        organization.total.members = 0;
                    }
                    organization.total.projects = Project.find({organization: organization._id}).map(function(project){
                        projectsId[n] = project._id;
                        n++;
                        return project._id;
                    }).length;
                    organization.total.teams = Team.find({organization: organization._id}).fetch().length;
                    if (organization.visibility && organization.visibility == 3) {
                        organization.visualization = 'public';
                    } else {
                        organization.visualization = 'private';
                    }
                    //organization.teams = Team.find()
                    //Meteor.subscribe('sprint', project._id);
                    ////projects = Project.find({$or: [{userId: Meteor.userId()}, {teams: {$in: teamsId}}, {scrumMaster: {$in: [Meteor.userId()]}}]}).map(function(project){
                    //if (project.teams) {
                    //    project.teams = Team.find({
                    //        _id: {$in: project.teams},
                    //        $or: [{'members': Meteor.userId(), userId: Meteor.userId()}]
                    //    }).fetch();
                    //}
                    //project.owner = Meteor.users.findOne(project.userId);
                    //dateNow = moment().format('x');
                    //sprint = Sprint.findOne(
                    //    {
                    //        $and: [
                    //            {projectId: project._id},
                    //            {dateStart: {$lte: dateNow}, dateEnd: {$gte: dateNow}}
                    //        ]
                    //    }
                    //);
                    //
                    //if (!sprint) {
                    //    dateNow = moment()._d;
                    //    sprint = Sprint.findOne(
                    //        {
                    //            $and: [
                    //                {projectId: project._id},
                    //                {dateStart: {$lte: dateNow}, dateEnd: {$gte: dateNow}}
                    //            ]
                    //        }
                    //    );
                    //}
                    //
                    //if (!sprint) {
                    //    Meteor.call('sprintCreate', project._id, function (error, result) {
                    //        if (error) {
                    //            //console.log(error);
                    //        } else {
                    //            //console.log('Saved!');
                    //            $scope.form = '';
                    //            $mdDialog.hide();
                    //        }
                    //        //$rootScope.titleMiddle = result.dateStart + ' - ' + result.dateEnd + ' (' + result.number + ')';
                    //
                    //        sprint = result;
                    //        //console.info(result);
                    //    });
                    //}

                    return organization;
                });
                // console.log(this.getReactively('organisations'));
                return organisations;
            }
        }, true);

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

        //this.items = [
        //    {name: "Project", icon: "business_center", direction: "left", color: 'red'},
        //    {name: "Team", icon: "group_work", direction: "top", color: 'blue'}
        //];

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

        this.modalOrganizationSave = function (ev, id) {
            $mdDialog.show({
                controller: 'OrganizationSaveCtrl',
                templateUrl: 'module/scrum/client/view/organization-save.ng.html',
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
    }]);