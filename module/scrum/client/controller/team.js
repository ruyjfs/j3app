angular.module('scrum').controller('TeamCtrl',
    function ($scope, $mdDialog, $mdUtil, $log, $reactive, $stateParams, $translate) {
        $reactive(this).attach($scope);
        $translate.use(Session.get('lang'));

        this.perPage = 9;
        this.page = 1;
        this.sort = {
            name: 1
        };
        this.teamSearchText = '';
        $scope.progressBar = {};
        $scope.progressBar.organization = Meteor.subscribe('organization').ready();
        this.subscribe('organization', () => {}, {onReady: () => {$scope.progressBar.organization = true;}});
        $scope.progressBar.team = Meteor.subscribe('team', $stateParams.organization, {}, this.getReactively('teamSearchText'), true).ready();
        this.subscribe('team', () => {return [$stateParams.organization]}, {onReady: function () {$scope.progressBar.team = true;}});
        $scope.progressBar.users = Meteor.subscribe('users').ready();
        this.subscribe('users', () => {}, {onReady: function () {$scope.progressBar.users = true;}});
        $scope.booLoading = true;
        $scope.$watchCollection('progressBar', function() {
            if (
                    $scope.progressBar.organization,
                    $scope.progressBar.team,
                    $scope.progressBar.users
            ) {
                // let organisations = Organization.find({}, {sort: {name: 1}}).map((organization) => {return organization});
                // if (organisations.length == 0) {
                //     if (Session.get('booMsgOrganization') != true) {
                //         Materialize.toast(
                //             $translate.instant('Hi, my name is Ryu, i will help you with whatever it takes.')
                //             , 120000);
                //         Materialize.toast(
                //             $translate.instant('You have no organization, click the red button to create an organization, or contact the owner of an organization to add you to their organization.')
                //             , 120000);
                //         Materialize.toast(
                //             $translate.instant('You can create products without organization, just enter the card without organization. For more information, click on the question mark icon in the top menu.')
                //             , 120000);
                //         Materialize.toast(
                //             $translate.instant('If you have any questions or suggestions, please contact us at contact@j3scrum.com.')
                //             , 120000);
                //         Materialize.toast(
                //             $translate.instant('To close these messages, drag to the side.')
                //             , 120000);
                //         Materialize.toast(
                //             $translate.instant("I'm so glad you joined j3scrum, many things are still to come, best regards!!!")
                //             , 120000);
                //         Session.set('booMsgOrganization', true);
                //     }
                // $('.tap-target').tapTarget('open');
                //     $document.ready(() => {
                //         $('.md-fab').addClass('pulse');
                //         console.log($('.md-fab'));
                //     });
                // }
                $scope.booLoading = false;
                $('#progressBar').fadeOut('slow');
            }
        });

        this.exist = ($arrValue) => {
            return ($arrValue.length > 0);
        };

        this.helpers({
            organizationId: function(){
                var id = 'organization';
                if ($stateParams.organization !== 'organization') {
                    var organization = Organization.findOne({$or: [{_id: $stateParams.organization}, {namespace: $stateParams.organization}]});
                    if (organization) {
                        id = organization._id;
                    } else {
                        id = $stateParams.organization;
                    }
                }
                return id;
            },
            teams: function() {
                let strSearch = this.getReactively('teamSearchText');
                selector = {};
                let organizationId = this.getReactively('organizationId');
                if (organizationId && organizationId != 'organization') {
                    if (typeof strSearch === 'string' && strSearch.length) {
                        selector = {
                            $or: [
                                {'userId': Meteor.userId()},
                                {'members': Meteor.userId()}
                            ],
                            // $and: [{$or: [{organization: null}, {organization: ''}, {organization: organizationId}]}]
                            $and: [{organization: organizationId}, {name: {$regex:  `.*${strSearch}.*`, $options : 'i' }}],
                        };
                    } else {
                        selector = {
                            $or: [
                                {'userId': Meteor.userId()},
                                {'members': Meteor.userId()}
                            ],
                            // $and: [{$or: [{organization: null}, {organization: ''}, {organization: organizationId}]}]
                            $and: [{organization: organizationId}]
                        };
                    }
                } else if (organizationId == 'organization') {
                    if (typeof strSearch === 'string' && strSearch.length) {
                        selector = {
                            $and: [{$or: [{'userId': Meteor.userId()}, {'members': Meteor.userId()}]}, {$or: [{organization: null}, {organization: ''}]}]
                        };
                    } else {
                        selector = {
                            $and: [{name: {$regex:  `.*${strSearch}.*`, $options : 'i' }}, {$or: [{'userId': Meteor.userId()}, {'members': Meteor.userId()}]}, {$or: [{organization: null}, {organization: ''}]}]
                        };
                    }
                } else {
                    if (typeof strSearch === 'string' && strSearch.length) {

                    } else {
                        selector = {
                            //$or: [
                            //    {'userId' : this.userId},
                            //    {'members' : this.userId}
                            //],
                            //$and: [{$or: [{organization: null}, {organization: ''}]}]
                        };
                    }
                }

                return Team.find(selector, {
                    limit: parseInt(this.getReactively('perPage')),
                    skip: parseInt((this.getReactively('page') - 1) * this.getReactively('perPage')),
                    sort: this.getReactively('sort')
                });
            },
            total: () => {
                let strSearch = this.getReactively('teamSearchText');
                selector = {};
                if (typeof strSearch === 'string' && strSearch.length) {
                    selector = {
                        $and: [
                            {
                                $or: [
                                    {name: {$regex:  `.*${strSearch}.*`, $options : 'i' }},
                                ]
                            }
                        ]
                    }
                }
                let teamResult = Team.find(selector);
                if (teamResult) {
                    return teamResult.length;
                } else {
                    return 0;
                }
            }
        });

        // this.total = function() {
        //     return Counts.get('totalTeam');
        // };
        this.pageChanged = function(newPage) {
            this.page = newPage;
        };
        this.sortChange = function(sort) {
            this.sort = {
                name: parseInt(sort)
            };
        };

        $scope.remove = function(team) {
            this.teams.remove(team);
        };

        $scope.modalSave = function(ev, id){
            $mdDialog.show({
                controller: 'TeamSaveCtrl as ctrl',
                templateUrl: 'module/scrum/client/view/team-save.ng.html',
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
);
