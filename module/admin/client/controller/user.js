//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams'',
//    function($scope, $stateParams){
    angular.module("admin").controller("UserCtrl", ['$scope', '$state', '$mdDialog', '$reactive', '$rootScope',
    function ($scope, $state, $mdDialog, $reactive, $rootScope) {
        $reactive(this).attach($scope);

        $scope.teste = '1';
        this.teste2 = '2';

        //console.log(Meteor.user()._id);
        this.subscribe('project');
        this.subscribe('team');
        this.helpers({
            users: function () {
                Meteor.subscribe('users');
                users = Meteor.users.find({});
                //teams = Team.find(
                //    {
                //        //$or: [{userId: Meteor.user()._id}, {members : Meteor.user()._id}]
                //        $or: [
                //            {
                //                'userId' : Meteor.user()._id,
                //            }
                //            ,
                //            {
                //                'members' : Meteor.user()._id,
                //                //'userId' : friendId,
                //                //'friendId' : $rootScope.currentUser._id
                //            }
                //        ]
                //    });
                return users;
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
                return (Meteor.user()._id == userId);
            } else {
                return true;
            }
        }

        this.remove = function (id) {
            this.projects.remove(id);
        }

        this.modalUserSave = function (ev, id) {
            $mdDialog.show({
                controller: 'UserSaveModalCtrl',
                templateUrl: 'module/admin/client/view/user-save-modal.ng.html',
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