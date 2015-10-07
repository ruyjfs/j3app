angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
    function($scope, $stateParams, $meteor){
        $scope.party = $meteor.object(Parties, $stateParams.partyId, false);

        $scope.save = function() {
            $scope.party.save().then(function(numberOfDocs){
                alert('save success doc affected ', numberOfDocs);
            }, function(error){
                alert('save error ' + error.reason);
                console.info(error);
            });
        };

        $scope.reset = function() {
            console.log($scope.party.reset());
            $scope.party.reset();
        };
    }
]);