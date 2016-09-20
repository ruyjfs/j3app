angular.module('scrum').controller('OrganizationMemberCtrl', [ '$scope', '$mdDialog', '$mdUtil', '$log', '$reactive', '$rootScope', '$stateParams',
    function ($scope, $mdDialog, $mdUtil, $log, $reactive, $rootScope, $stateParams) {
        $reactive(this).attach($scope);
        this.subscribe('users');
        this.formAdd = {};
        this.subscribe('organization',  function(){}, function(){
            var organization = Organization.findOne({namespace: organizationNamespace});
            id = organization._id;
            this.formAdd._id = id;
        });
        var organizationNamespace = $stateParams.organization;

        this.formAdd.members = [];
        $scope.filterSelected = true;
        this.querySearch = function(strSearch) {
            selector = {};
            if (typeof strSearch === 'string' && strSearch.length) {
                selector = {
                    $or: [
                        {name: {$regex:  `.*${strSearch}.*`, $options : 'i' }},
                        {email: {$regex:  `.*${strSearch}.*`, $options : 'i' }},
                        {emails: {address: {$regex:  `.*${strSearch}.*`, $options : 'i' }}},
                    ]
                };

                //{
                //    $or: [
                //        //{name: {$regex:  `.*${strSearch}.*`, $options : 'i' }},
                //        //{email: {$regex:  `.*${strSearch}.*`, $options : 'i' }}
                //        {name: strSearch}
                //    ]
                //}
            }

            users = Meteor.users.find(selector).fetch();
            return users.map(function (user, index) {
                user.name = user.name + ' ' + user.lastName;
                // Imagem do gravatar.
                if (user.emails && user.emails[0].address) {
                    user.image = 'http://www.gravatar.com/avatar/' + CryptoJS.MD5(user.emails[0].address).toString() + '?s=40&d=mm';
                } else {
                    user.image = 'http://www.gravatar.com/avatar/00000000000000000000000000000000?s=40&d=mm&f=y';
                }
                return user;
            });

            return users;
            //return this.getReactively('allContacts');
        }


        this.save = function(ev){
            var formAddNew = {};
            formAddNew._id = this.formAdd._id;
            formAddNew.members = this.formAdd.members.map(function(member){
                return member._id;
            });
            this.getReactively('formAdd').members  = [];
            Meteor.call('organizationSaveMembers', formAddNew, function (error) {
                if (error) {
                    Materialize.toast('Erro: ' + error, 4000);
                } else {
                    Materialize.toast('Saved successfully!', 4000);
                }
            });
        };


        this.perPage = 5;
        this.page = 1;
        this.sort = {
            name: 1
        };

        this.searchText = '';
        this.helpers({
            members: function() {
                arrOrganization = Organization.findOne({namespace: organizationNamespace});
                var searchString = this.getReactively('searchText');
                selector = {};
                if (typeof searchString === 'string' && searchString.length) {
                    selector = {
                        $or: [
                            {name: {$regex:  `.*${searchString}.*`, $options : 'i' }},
                            {email: {$regex:  `.*${searchString}.*`, $options : 'i' }},
                            {emails: {address: {$regex:  `.*${searchString}.*`, $options : 'i' }}},
                        ]
                    };
                }

                if (arrOrganization && arrOrganization.members) {
                    selector._id = { $in: arrOrganization.members }
                }

                var users = Meteor.users.find(selector, {
                    limit: parseInt(this.getReactively('perPage')),
                    skip: parseInt((this.getReactively('page') - 1) * this.getReactively('perPage')),
                    sort: this.getReactively('sort')
                });
                return users;
            }
        });

        this.total = function() {
            return Counts.get('totalMember');
        };
        this.pageChanged = function(newPage) {
            this.page = newPage;
        };
        this.sortChange = function(sort) {
            this.sort = {
                name: parseInt(sort)
            };
        };

        //$scope.remove = function(team) {
        //    this.teams.remove(team);
        //};
        //
        //$scope.modalSave = function(ev, id){
        //    $mdDialog.show({
        //        controller: 'TeamSaveCtrl',
        //        templateUrl: 'module/scrum/client/view/team-save.ng.html',
        //        clickOutsideToClose:true,
        //        locals : {
        //            id: id
        //        },
        //        targetEvent: ev
        //    }).then(function(answer) {
        //        $scope.status = 'You said the information was "' + answer + '".';
        //    }, function() {
        //        $scope.status = 'You cancelled the dialog.';
        //    });
        //};
}]);
