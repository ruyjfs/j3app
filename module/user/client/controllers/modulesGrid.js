angular.module("user").controller("ModulesGridCtrl", ['$scope', '$state', '$mdDialog', '$mdBottomSheet',
    function($scope, $state, $mdDialog,  $mdBottomSheet){

        $scope.items = [
            { name: 'User', icon: 'person', link: 'user'},
            { name: 'Scrum', icon: 'dashboard', link: 'scrum/project'}
            //{ name: 'Message', icon: 'message' },
            //{ name: 'Copy', icon: 'copy2' },
            //{ name: 'Facebook', icon: 'facebook' },
            //{ name: 'Twitter', icon: 'twitter' },
        ];
        $scope.listItemClick = function($index, $link) {
            $state.go($link)
            var clickedItem = $scope.items[$index];
            $mdBottomSheet.hide(clickedItem);
        };
    }
]);
