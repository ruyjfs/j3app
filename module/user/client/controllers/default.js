angular.module("user").controller("Default2Ctrl", ['$scope', '$reactive', '$state', '$mdDialog',
    function($scope, $reactive, $state, $mdDialog){

        $reactive(this).attach($scope);
        $scope.booLoading = false;
        $('#progressBar').fadeOut('slow');

        //$scope.dataForm = $meteor.object(Users, $rootScope.currentUser._id, false);
        //$scope.members = $meteor.collection(Meteor.users, false).subscribe('users');

        //$scope.dataForm = $meteor.object(Meteor.users, Meteor.user()._id, false);
        //$scope.dataForm = Meteor.users().findOne(Meteor.user()._id);
        this.form = {};
        this.subscribe('users', function() {
            if (Meteor.userId()) {
                user = Meteor.users.findOne(Meteor.userId());
                if (user) {
                    this.form = user;
                    if (user.status) {
                        if (user.status.idle == true) {
                            user.statusColor = ' #FFC107';
                            user.statusName = ' Away';
                        } else if (user.status.online == true) {
                            user.statusColor = ' #9ACD32';
                            user.statusName = ' Online';
                        } else {
                            user.statusColor = ' rgba(224, 224, 224, 0.77)';
                            user.statusName = ' Offline';
                        }
                    } else {
                        user.statusColor = ' rgba(224, 224, 224, 0.77)';
                        user.statusName = ' Offline';
                    }

                    // Imagem do gravatar.
                    if (user.emails && user.emails[0].address) {
                        user.img = 'http://www.gravatar.com/avatar/' + CryptoJS.MD5(user.emails[0].address).toString() + '?s=150&d=mm';
                    } else {
                        user.img = 'http://www.gravatar.com/avatar/00000000000000000000000000000000?s=60&d=mm&f=y';
                    }

                    user.nameTreated = user.name + ' ' + user.lastName;
                    if (user.nameTreated.length > 14) {
                        user.nameTreated = user.nameTreated.substr(0, 13) + '...';
                    }
                    this.user = user;
                    if (this.form.emails) {
                        this.form.email = this.form.emails[0].address;
                    } else {
                        this.form.email = '';
                    }
                }
            }
        });

        this.modalContactSave = function(ev, id){
            $mdDialog.show({
                controller: 'ContactSaveCtrl as ctrl',
                templateUrl: 'module/user/client/views/contact-save.ng.html',
                clickOutsideToClose:true,
                locals : {
                    id: id
                },
                targetEvent: ev
            }).then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });
        };
    }
]);
