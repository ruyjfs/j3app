angular.module("socially").controller("AddNewPartyCtrl", ['$scope', '$meteor', '$auth', '$state', '$mdDialog', 'parties',
    function ($scope, $meteor, $auth, $state, $mdDialog, parties) {
        $scope.newParty = {};
        $scope.addNewParty = function () {
            if($scope.newParty.name){
                $scope.newParty.owner = $auth.currentUser._id;
                parties.push($scope.newParty);
                $scope.newParty = '';
                $mdDialog.hide();
            }
        }
        $scope.close = function () {
            $mdDialog.hide();
        }
    }
]);