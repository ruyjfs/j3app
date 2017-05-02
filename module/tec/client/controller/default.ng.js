angular.module('tec').controller('DefaultCtrl',
    function ($scope, $timeout, $mdSidenav, $mdUtil, $log) {
        $scope.booLoading = false;
        $('#progressBar').fadeOut('slow');
    }
);