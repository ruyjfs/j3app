//angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
//    function($scope, $stateParams, $meteor){
angular.module('scrum').controller('ContactCtrl', [ '$scope', '$mdDialog', '$mdSidenav', '$log', '$reactive', '$stateParams',
    function ($scope, $mdDialog, $mdSidenav, $log, $reactive, $stateParams) {
        $reactive(this).attach($scope);
        var members = null;

        this.perPage = 20;
        this.page = 1;
        this.sort = {
            name: 1
        };
        $scope.filterSelected = true;

        this.searchText = '';
        this.helpers({
            members: function() {
                let searchString = this.getReactively('searchText');
                selector = {};
                if (typeof searchString === 'string' && searchString.length) {
                    selector = {
                        $or: [
                            {name: {$regex:  `.*${searchString}.*`, $options : 'i' }},
                            {lastName: {$regex:  `.*${searchString}.*`, $options : 'i' }},
                            {email: {$regex:  `.*${searchString}.*`, $options : 'i' }},
                            {emails: {address: {$regex:  `.*${searchString}.*`, $options : 'i' }}},
                        ]
                    };
                }

                let users = Meteor.users.find(selector, {
                    limit: parseInt(this.getReactively('perPage')),
                    skip: parseInt((this.getReactively('page') - 1) * this.getReactively('perPage')),
                    sort: this.getReactively('sort')
                });

                return users.map(function(user){
                    if (user.status) {
                        if (user.status.lastLogin) {
                            if (moment(new Date).diff(moment(user.status.lastLogin.date), 'days') > 2) {
                                user.statusLastLoginDate = moment(user.status.lastLogin.date).format('L H[h]m');
                            } else {
                                user.statusLastLoginDate = moment(user.status.lastLogin.date).fromNow(); // in 40 minutes
                            }
                        }
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
                        user.img = 'http://www.gravatar.com/avatar/' + CryptoJS.MD5(user.emails[0].address).toString() + '?s=60&d=mm';
                    } else {
                        user.img = 'http://www.gravatar.com/avatar/00000000000000000000000000000000?s=60&d=mm&f=y';
                    }
                    user.nameTreated = user.name + ' ' + user.lastName;
                    if (user.nameTreated.length > 14) {
                        user.nameTreated = user.nameTreated.substr(0,13) + '...';
                    }
                    return user;
                });
            },
            total: () => {
                console.info(this.getReactively('members'));
                // return this.getReactively('members').fetch().length;
            }
        });

        this.pageChanged = function(newPage) {
            this.page = newPage;
        };

        this.sortChange = function(sort) {
            this.sort = {
                name: parseInt(sort)
            };
        };

        this.close = function () {
            $mdDialog.hide();
        };

        this.modalDelete = function (ev, id) {
            let parentEl = angular.element(document.body);
            $mdDialog.show({
                parent: parentEl,
                targetEvent: ev,
                template:
                '<md-dialog aria-label="List dialog">' +
                '  <md-dialog-content>'+
                '    <p>Would you like to remove this member of organization?</p>' +
                '  </md-dialog-content>' +
                '  <md-dialog-actions>' +
                '    <md-button ng-click="ctrl.close()" class="white orange-text text-darken-3 btn waves-effect waves-orange hoverable ng-binding">' +
                '      Cancel' +
                '    </md-button>' +
                '    <md-button ng-click="ctrl.delete(\'' + id + '\')" class="btn orange darken-3 waves-effect waves-light hoverable ng-binding">' +
                '      Remove' +
                '    </md-button>' +
                '  </md-dialog-actions>' +
                '</md-dialog>',
                controller: 'OrganizationMemberCtrl as ctrl'
            });
        };

        this.delete = (id) => {
            let arrOrganization = Organization.findOne({namespace: organizationNamespace});
            let formAddNew = {};
            formAddNew._id = this.formAdd._id;
            formAddNew.members = arrOrganization.members.filter(function(memberId){
                return (memberId != id);
            });
            Meteor.call('organizationUpdateMembers', formAddNew, function (error) {
                if (error) {
                    Materialize.toast('Erro: ' + error, 4000);
                } else {
                    Materialize.toast('Member removed successfully!', 4000);
                    $mdDialog.hide();
                }
            });
        };
}]);

