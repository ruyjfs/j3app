angular.module("user").controller("ToastUserCtrl", ['$scope', '$reactive', '$state', '$mdDialog', 'user',
    function($scope, $reactive, $state, $mdDialog, user){
        $reactive(this).attach($scope);

        //Meteor.subscribe('users');
        //var user = Meteor.users.findOne(id);
        //if (user) {
        //    if (user.status) {
        //        if (user.status.idle == true) {
        //            user.statusColor = ' #FFC107';
        //            user.statusName = ' Away';
        //        } else if (user.status.online == true) {
        //            user.statusColor = ' #9ACD32';
        //            user.statusName = ' online';
        //        } else {
        //            user.statusColor = ' rgba(224, 224, 224, 0.77)';
        //            user.statusName = ' offline';
        //        }
        //    } else {
        //        user.statusColor = ' rgba(224, 224, 224, 0.77)';
        //        user.statusName = ' offline';
        //    }
        //
        //    // Imagem do gravatar.
        //    if (user.emails && user.emails[0].address) {
        //        user.img = 'http://www.gravatar.com/avatar/'+CryptoJS.MD5(user.emails[0].address).toString()+'?s=40&d=mm';
        //    } else {
        //        user.img = 'http://www.gravatar.com/avatar/00000000000000000000000000000000?s=40&d=mm&f=y';
        //    }
        //
        //    user.nameTreated = user.name + ' ' + user.lastName;
        //    if (user.nameTreated.length > 14) {
        //        user.nameTreated = user.nameTreated.substr(0,13) + '...';
        //    }
        //}
        $scope.user= user;
    }
]);
