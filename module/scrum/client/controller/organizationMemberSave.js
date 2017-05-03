angular.module('scrum').controller('OrganizationMemberSaveCtrl',
    function ($scope, $reactive, $mdDialog, $rootScope, id, $stateParams, $translate) {
        $reactive(this).attach($scope);

        let organizationNamespace = $stateParams.organization;
        this.formAdd = {};
        this.formAdd.members = [];
        this.subscribe('organization',  function(){}, function(){
            let organization = Organization.findOne({namespace: organizationNamespace});
            id = organization._id;
            this.formAdd._id = id;
        });
        Meteor.subscribe('users');

        this.save = function(ev){
            let formAddNew = {};
            formAddNew._id = this.formAdd._id;
            formAddNew.members = this.formAdd.members.map(function(member){
                return member._id;
            });
            console.info(formAddNew.members);
            this.getReactively('formAdd').members  = [];
            console.info(formAddNew);
            Meteor.call('organizationSaveMembers', formAddNew, function (error) {
                if (error) {
                    $('md-dialog').animateCss('jello');
                    Materialize.toast($translate.instant('Notice') + ': '+ $translate.instant(error.reason) + '!', 4000, 'rounded red accent-1');
                } else {
                    // Materialize.toast('Saved successfully!', 4000, 'rounded green accent-1 green-text text-darken-4');
                    // Materialize.toast('Saved successfully!', 4000, 'rounded green white-text');
                    Materialize.toast($translate.instant('Saved successfully') + '!', 4000, 'rounded green accent-1 green-text text-darken-4');
                    $mdDialog.hide();
                }
            });
        };

        this.close = function () {
            $mdDialog.hide();
        };

        this.remove = function(team) {
            this.teams.remove(team);
        };

        this.querySearch = function(strSearch) {
            let selector = {};
            if (typeof strSearch === 'string' && strSearch.length) {
                selector = {
                    $or: [
                        {name: {$regex:  `.*${strSearch}.*`, $options : 'i' }},
                        {email: {$regex:  `.*${strSearch}.*`, $options : 'i' }}
                        // {name: strSearch}
                    ]
                };
            }

            users = Meteor.users.find(selector).fetch();
            return users.map(function (user, index) {
                user.name = user.name + ' ' + user.lastName;
                if (user.emails && user.emails[0].address) { // Imagem do gravatar.
                    user.image = 'http://www.gravatar.com/avatar/' + CryptoJS.MD5(user.emails[0].address).toString() + '?s=40&d=mm';
                } else {
                    user.image = 'http://www.gravatar.com/avatar/00000000000000000000000000000000?s=40&d=mm&f=y';
                }
                return user;
            });
        };
    }
);