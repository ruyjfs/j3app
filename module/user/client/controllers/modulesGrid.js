angular.module("user").controller("ModulesGridCtrl", ['$scope', '$state', '$mdDialog', '$mdBottomSheet',
    function($scope, $state, $mdDialog,  $mdBottomSheet){

        $scope.items = [
            { name: 'Admin', icon: 'tune', link: 'admin'},
            { name: 'User', icon: 'person', link: 'user'},
            { name: 'Scrum', icon: 'dashboard', link: 'scrum/project'},
            { name: 'Gamer', icon: 'videogame_asset', link: 'gamer'},
            { name: 'Driver', icon: 'directions_car', link: 'driver'},
            { name: 'Brotherhood', icon: 'domain', link: 'brotherhood'},
            //{ name: 'Message', icon: 'message' },
            //{ name: 'Copy', icon: 'copy2' },
            //{ name: 'Facebook', icon: 'facebook' },
            //{ name: 'Twitter', icon: 'twitter' },
        ];
        $scope.listItemClick = function($index, $link) {
            $state.go($link);
            var clickedItem = $scope.items[$index];
            $mdBottomSheet.hide(clickedItem);
        };
    }
]);
