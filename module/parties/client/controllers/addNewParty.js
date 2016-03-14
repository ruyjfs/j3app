angular.module("socially").controller("AddNewPartyCtrl", ['$scope', '$meteor', '$state', '$mdDialog', 'parties',
    function ($scope, $meteor, $state, $mdDialog, parties) {
        $scope.newParty = {};
        $scope.addNewParty = function () {
            if($scope.newParty.name){
                $scope.newParty.owner = Meteor.user()._id;
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