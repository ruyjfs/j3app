angular.module('admin').controller('ToolbarCtrl', [ '$scope', '$timeout', '$mdSidenav', '$mdUtil', '$log', '$location', '$meteor',
    function ($scope, $timeout, $mdSidenav, $mdUtil, $log, $location, $meteor) {

        $scope.toggleMenu = buildToggler('menu');
        $scope.toggleContactList = buildToggler('contact-list');

        $scope.title = 'Brotherhood';
        $scope.redirect = function(route){
            arrTitle = route.split('/');
            $scope.title = arrTitle[1];
            $mdSidenav('menu').close();
            $location.path(route);
        }

        $scope.close = function(){
            $mdSidenav('chat').close()
                .then(function(){
                    $scope.messages = [];
                    console.info('ENTROU MANO')
                });
            $mdSidenav('contact-list').toggle();
        }

        //$scope.toggleChat = function(friendId){
        //    $mdSidenav('contact-list').close();
        //
        //
        //    //this.friendId = friendId;
        //
        //    return Messages.find(
        //        {
        //            $or: [
        //                {
        //                    'userId' : Meteor.user()._id,
        //                    'friendId' : $rootScope.friendId
        //                }
        //                ,
        //                {
        //                    'userId' : $rootScope.friendId,
        //                    'friendId' : Meteor.user()._id
        //                }
        //            ]
        //        }
        //    );
        //    //this.currentUser.userId = Meteor.user()._id;
        //
        //    //Meteor.subscribe('messages');
        //    //$scope.messages = $meteor.collection( function() {
        //    //    return Messages.find(
        //    //        {
        //    //            $or: [
        //    //                {
        //    //                    'userId' : Meteor.user()._id,
        //    //                    'friendId' : friendId
        //    //                }
        //    //                ,
        //    //                {
        //    //                    'userId' : friendId,
        //    //                    'friendId' : Meteor.user()._id
        //    //                }
        //    //            ]
        //    //        }
        //    //    );
        //    //});
        //
        //    $mdSidenav('chat').toggle();
        //    //$scope.messages = $meteor.collection(Messages).subscribe('messages', friendId);
        //};

        $scope.menuItems = [
            {
                name: 'Project',
                link: '/scrum/project',
                icon: 'business_center',
            },
            {
                name: 'Team',
                link: '/scrum/team',
                icon: 'group_work',
            },
            {
                name: 'Chat',
                //link: '/team',
                icon: 'chat',
            },
            {
                name: 'Language',
                //link: '/driver',
                icon: 'language',
            },
            {
                name: 'Configuration',
                link: '/user',
                icon: 'settings',
            },
            {
                name: 'Exit',
                link: '/user/logout',
                icon: 'power_settings_new',
            },
            //{
            //    name: 'Usuário',
            //    link: '/user',
            //},
            //{
            //    name: 'Eventos',
            //    link: '/parties',
            //},
        ];

        /**
         * Build handler to open/close a SideNav; when animation finishes
         * report completion in console
         */
        function buildToggler(navID) {
            var debounceFn = $mdUtil.debounce(function () {
                $mdSidenav(navID)
                    .toggle()
                    .then(function () {
                        $log.debug("toggle " + navID + " is done");
                        //$scope.messages = [];
                        //console.info('ENTROU MANO')
                    });
            }, 200);
            return debounceFn;
        }
    }
]);