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
                //result = Meteor.call('getProjectByUser', Meteor.user()._id, function (error , result) {
                //    console.log(result);
                //    console.log(result);
                //    console.log(result);
                //    return result;
                //    //if (error) {
                //    //    //console.log('Oops, unable to invite!');
                //    //} else {
                //    //    console.log('Saved!');
                //    //    $scope.form = '';
                //    //    $mdDialog.hide();
                //    //}
                //});
                //return result;

                projectsNew = [];
                projects = Project.find({});
                //projects.forEach(function(project, projectKey){
                ////    if (project.userId != Meteor.user()._id) {
                ////        project.teams = Team.find(
                ////            {
                ////                _id: { $in: [project.teams] },
                ////                $and: [{'members' : Meteor.user()._id}]
                ////            });
                ////    //
                ////    //    //project.teams.filter({members: Meteor.user()._id});
                ////        console.log(project.teams);
                ////        if (project.teams) {
                ////    //        projectsNew[projectKey] = project;
                ////        }
                ////    } else {
                //        projectsNew[projectKey] = project;
                ////    }
                ////
                ////    //note.owner = Meteor.users.findOne(note.owner);
                ////    //teste = note.owner.name.split(' ');
                ////    //console.log(teste);
                ////    //note.owner.firstName = note.owner.name.substring(0, note.owner.name.trim().search(' '));
                ////    projectsNew[projectKey] = project;
                //});
                return projects;



                //Meteor.user()._id
                //return
            //    return Project.find(
            //        {
            //            $or: [
            //                {
            //                    'userId' : Meteor.user()._id,
            //                }
            //            //    ,
            //            //    {
            //            //        'userId' : friendId,
            //            //        'friendId' : $rootScope.currentUser._id
            //            //    }
            //            ]
            //        }
            //    ).forEach(
            //        //function (project) {
            //        //    newBook.category = db.categories.findOne( { "_id": newBook.category } );
            //        //    newBook.lendings = db.lendings.find( { "book": newBook._id  } ).toArray();
            //        //    newBook.authors = db.authors.find( { "_id": { $in: newBook.authors }  } ).toArray();
            //        //    db.booksReloaded.insert(newBook);
            //        //}
            //    );
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