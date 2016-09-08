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

        //$scope.toggleChat = function(contactId){
        //    $mdSidenav('contact-list').close();
        //
        //
        //    //this.contactId = contactId;
        //
        //    return Message.find(
        //        {
        //            $or: [
        //                {
        //                    'userId' : Meteor.user()._id,
        //                    'contactId' : $rootScope.contactId
        //                }
        //                ,
        //                {
        //                    'userId' : $rootScope.contactId,
        //                    'contactId' : Meteor.user()._id
        //                }
        //            ]
        //        }
        //    );
        //    //this.currentUser.userId = Meteor.user()._id;
        //
        //    //Meteor.subscribe('message');
        //    //$scope.messages = $meteor.collection( function() {
        //    //    return Message.find(
        //    //        {
        //    //            $or: [
        //    //                {
        //    //                    'userId' : Meteor.user()._id,
        //    //                    'contactId' : contactId
        //    //                }
        //    //                ,
        //    //                {
        //    //                    'userId' : contactId,
        //    //                    'contactId' : Meteor.user()._id
        //    //                }
        //    //            ]
        //    //        }
        //    //    );
        //    //});
        //
        //    $mdSidenav('chat').toggle();
        //    //$scope.messages = $meteor.collection(Messages).subscribe('message', contactId);
        //};

        $scope.menuItems = [
            {
                name: 'Project',
                link: '/scrum/organization',
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
                //link: '/drive',
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