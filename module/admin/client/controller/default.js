angular.module("admin").controller("DefaultAdminCtrl", ['$scope', '$state', '$mdDialog',
    function($scope, $state, $mdDialog){

        this.teste = 'haha Admin';
        $scope.teste2 = 'haha Admin';

        $scope.projects = [
            {
                'name': 'j3scrum',
                'description': 'Sistema de SCRUM, gerencie sua equipe.as dasd as dasdasdasdasd asd asdasdasdasd asd asd asd asd asd',
                'link': '/scrum'
            },
            {
                'name': 'j3gamer',
                'description': 'Uma biblioteca incrível de jogos.as asd as dasd asd asd asdasdas dasd as ',
                'link': '/gamer'
            },
            {
                'name': 'j3driver',
                'description': 'Saiba tudo sobre o seu futuro carro. as dasd as das d',
                'link': '/driver'
            }
        ];

        //alert('teste');
        ////$scope.parties = $meteor.collection(Parties, false);
        //
        //$scope.page = 1;
        //$scope.perPage = 3;
        //$scope.sort = { name: 1 };
        //$scope.orderProperty = '1';
        //
        //$scope.users = $meteor.collection(Meteor.users, false).subscribe('users');
        //
        //$scope.rsvp = function(partyId, rsvp){
        //    $meteor.call('rsvp', partyId, rsvp).then(
        //        function(data){
        //            console.log('success responding', data);
        //        },
        //        function(err){
        //            console.log('failed', err);
        //        }
        //    );
        //};
        //
        //$scope.outstandingInvitations = function (party) {
        //    return _.filter($scope.users, function (user) {
        //        return (_.contains(party.invited, user._id) &&
        //        !_.findWhere(party.rsvps, {user: user._id}));
        //    });
        //};
        //
        //
        //$scope.getUserById = function(userId){
        //    return Meteor.users.findOne(userId);
        //};
        //
        //$scope.creator = function(party){
        //    if (!party)
        //        return;
        //    var owner = $scope.getUserById(party.owner);
        //    if (!owner)
        //        return 'nobody';
        //
        //    if ($rootScope.currentUser)
        //        if ($rootScope.currentUser._id)
        //            if (owner._id === $rootScope.currentUser._id)
        //                return 'me';
        //
        //    return owner;
        //};
        //
        //$scope.openAddNewPartyModal = function(){
        //    $mdDialog.show({
        //        controller: 'AddNewPartyCtrl',
        //        templateUrl: 'client/parties/views/add-new-party-modal.ng.html',
        //        clickOutsideToClose:true,
        //        resolve: {
        //            parties: function () {
        //                return $scope.parties;
        //            }
        //        }
        //    }).then(function(answer) {
        //        $scope.status = 'You said the information was "' + answer + '".';
        //    }, function() {
        //        $scope.status = 'You cancelled the dialog.';
        //    });
        //};
        //
        //$scope.parties = $meteor.collection(function() {
        //    return Parties.find({}, {
        //        sort : $scope.getReactively('sort')
        //    });
        //});
        //
        //$meteor.subscribe('parties', {
        //    limit: parseInt($scope.getReactively('perPage')),
        //    skip: (parseInt($scope.getReactively('page')) - 1) * parseInt($scope.getReactively('perPage')),
        //    sort: $scope.getReactively('sort')
        //}, $scope.getReactively('search')).then(function() {
        //    $scope.partiesCount = $meteor.object(Counts ,'numberOfParties', false);
        //});
        //
        //$meteor.autorun($scope, function() {
        //    $meteor.subscribe('parties', {
        //        limit: parseInt($scope.perPage),
        //        skip: parseInt(($scope.page - 1) * $scope.perPage),
        //        sort: $scope.sort
        //    }).then(function(){
        //        $scope.partiesCount = $meteor.object(Counts ,'numberOfParties', false);
        //    });
        //});
        //
        //$scope.remove = function(party){
        //    $scope.parties.remove(party);
        //};
        //
        //$scope.removeAll = function(){
        //    $scope.parties.remove();
        //};
        //
        //$scope.pageChanged = function(newPage) {
        //    $scope.page = newPage;
        //};
        //
        //$scope.$watch('orderProperty', function(){
        //    if ($scope.orderProperty)
        //        $scope.sort = {name: parseInt($scope.orderProperty)};
        //});
        //
        //
        //$scope.parties.forEach( function (party) {
        //    party.onClicked = function () {
        //        $state.go('partyDetails', {partyId: party._id});
        //    };
        //});
        //
        //$scope.map = {
        //    center: {
        //        latitude: 45,
        //        longitude: -73
        //    },
        //    zoom: 8
        //};
    }]);
