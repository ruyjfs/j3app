angular.module("user").controller("ModulesGridCtrl", ['$scope', '$state', '$mdDialog', '$mdBottomSheet',
    function($scope, $state, $mdDialog,  $mdBottomSheet){
        if (Meteor.user().email == 'ruyjfs@gmail.com') {
            $scope.items = [
                { name: 'Admin', icon: 'tune', link: 'admin'},
                { name: 'You', icon: 'person', link: 'user'},
                { name: 'j3scrum', icon: 'dashboard', link: 'scrum/organization'},
                { name: 'j3game', icon: 'videogame_asset', link: 'game'},
                //{ name: 'j3drive', icon: 'directions_car', link: 'drive'},
                { name: 'j3tec', icon: 'domain', link: 'tec'},
                { name: 'j3rotherhood', icon: 'domain', link: 'brotherhood'},
                //{ name: 'Message', icon: 'message' },
                //{ name: 'Copy', icon: 'copy2' },
                //{ name: 'Facebook', icon: 'facebook' },
                //{ name: 'Twitter', icon: 'twitter' },
            ];
        } else {
            $scope.items = [
                { name: 'You', icon: 'person', link: 'user'},
                { name: 'j3scrum', icon: 'dashboard', link: 'scrum/organization'},
                { name: 'j3game', icon: 'videogame_asset', link: 'game'},
                //{ name: 'j3drive', icon: 'directions_car', link: 'drive'},
                { name: 'j3tec', icon: 'domain', link: 'tec'},
                { name: 'j3rotherhood', icon: 'domain', link: 'brotherhood'},
                //{ name: 'Message', icon: 'message' },
                //{ name: 'Copy', icon: 'copy2' },
                //{ name: 'Facebook', icon: 'facebook' },
                //{ name: 'Twitter', icon: 'twitter' },
            ];

        }
        $scope.listItemClick = function($index, $link) {
            titleMiddle = '';
            console.log($link);
            $state.go($link);
            var clickedItem = $scope.items[$index];
            $mdBottomSheet.hide(clickedItem);
            $('.brand-logo').removeClass('animated flip').hide().show().addClass('animated flip');
            $('#logo-middle').hide();
            titleMiddle = '';
        };
    }
]);
