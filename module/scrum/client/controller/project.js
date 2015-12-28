//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('scrum').controller('ProjectCtrl', [ '$scope', '$mdDialog', '$mdSidenav', '$log', '$meteor', '$reactive',
    function ($scope, $mdDialog, $mdSidenav, $log, $meteor, $reactive) {
        $reactive(this).attach($scope);

        this.subscribe('project');
        this.helpers({
                projects: function() {
                return Project.find(
                    {
                        //$or: [
                        //    {
                        //        'userId' : $rootScope.currentUser._id,
                        //        'friendId' : friendId
                        //    }
                        //    ,
                        //    {
                        //        'userId' : friendId,
                        //        'friendId' : $rootScope.currentUser._id
                        //    }
                        //]
                    }
                );
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


        this.remove = function(id) {
            this.projects.remove(id);
        }

        this.modalProjectSave = function(ev, id){
            $mdDialog.show({
                controller: 'ProjectSaveCtrl',
                templateUrl: 'module/scrum/client/view/project-save.ng.html',
                clickOutsideToClose:true,
                locals : {
                    id: id
                },
                targetEvent: ev
            }).then(function(answer) {
                this.status = 'You said the information was "' + answer + '".';
            }, function() {
                this.status = 'You cancelled the dialog.';
            });
        };

        this.modalTeamSave = function(ev, id){
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
                this.status = 'You said the information was "' + answer + '".';
            }, function() {
                this.status = 'You cancelled the dialog.';
            });
        };
}]);