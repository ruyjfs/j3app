angular.module("user").controller("ModulesGridCtrl", ['$scope', '$state', '$mdDialog', '$mdBottomSheet',
    function($scope, $state, $mdDialog,  $mdBottomSheet){
        if (Meteor.user().email == 'ruyjfs@gmail.com') {
            $scope.items = [
                { name: 'Admin', icon: 'tune', link: 'admin'},
                { name: 'User', icon: 'person', link: 'user'},
                { name: 'Scrum', icon: 'dashboard', link: 'scrum/product'},
                { name: 'Gamer', icon: 'videogame_asset', link: 'gamer'},
                { name: 'Driver', icon: 'directions_car', link: 'driver'},
                { name: 'Brotherhood', icon: 'domain', link: 'brotherhood'},
                //{ name: 'Message', icon: 'message' },
                //{ name: 'Copy', icon: 'copy2' },
                //{ name: 'Facebook', icon: 'facebook' },
                //{ name: 'Twitter', icon: 'twitter' },
            ];
        } else {
            $scope.items = [
                { name: 'User', icon: 'person', link: 'user'},
                { name: 'Scrum', icon: 'dashboard', link: 'scrum/product'},
                { name: 'Gamer', icon: 'videogame_asset', link: 'gamer'},
                { name: 'Driver', icon: 'directions_car', link: 'driver'},
                { name: 'Brotherhood', icon: 'domain', link: 'brotherhood'},
                //{ name: 'Message', icon: 'message' },
                //{ name: 'Copy', icon: 'copy2' },
                //{ name: 'Facebook', icon: 'facebook' },
                //{ name: 'Twitter', icon: 'twitter' },
            ];

        }
        $scope.listItemClick = function($index, $link) {
            titleMiddle = '';
            $state.go($link);
            var clickedItem = $scope.items[$index];
            $mdBottomSheet.hide(clickedItem);
            $('.brand-logo').removeClass('animated flip').hide().show().addClass('animated flip');
            $('#logo-middle').hide();
            titleMiddle = '';
        };
    }
]);
