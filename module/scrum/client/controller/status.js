angular.module('scrum').controller('StatusCtrl',
    function ($scope, $mdDialog, $reactive, $stateParams, $translate) {
        $reactive(this).attach($scope);
        $translate.use(Session.get('lang'));

        $scope.booLoading = false;
        $('#progressBar').fadeOut('slow');

        if (!$stateParams.product) {
            $state.go('scrum');
        }

        this.id = $stateParams.product;
        this.sprintId = $stateParams.sprintId;


        this.perPage = 5;
        this.page = 1;
        this.sort = {
            name: 1
        };

        this.searchText = '';
        $scope.progressBar = {};
        $scope.progressBar.status = Meteor.subscribe('status', $stateParams.product, {}, this.getReactively('searchText'), false).ready();
        this.subscribe('status', function(){
                return [
                    $stateParams.product,
                    {},
                    this.getReactively('searchText'),
                    false
                ]
            }, {onReady: () => {$scope.progressBar.story = true;}}
        );
        $scope.booLoading = true;
        $scope.$watchCollection('progressBar', function() {
            if (
                $scope.progressBar.status
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
                //     $document.ready(() => {
                //         $('.md-fab').addClass('pulse');
                //         console.log($('.md-fab'));
                //     });
                // }
                $scope.booLoading = false;
                $('#progressBar').fadeOut('slow');
            }
        });
        this.total = function() {
            return Counts.get('totalStatus');
        };
        this.pageChanged = function(newPage) {
            this.page = newPage;
        };
        this.sortChange = function(sort) {
            this.sort = {
                name: parseInt(sort)
            };
        };
        this.helpers({
            states: function () {
                return Status.find({},
                    {
                        limit: parseInt(this.getReactively('perPage')),
                        skip: parseInt((this.getReactively('page') - 1) * this.getReactively('perPage')),
                        sort: this.getReactively('sort')
                    }
                );
            }
        });
        $scope.modalStatusSave = function (ev, id) {
            $mdDialog.show({
                controller: 'StatusSaveCtrl as ctrl',
                templateUrl: 'module/scrum/client/view/status-save.ng.html',
                clickOutsideToClose: true,
                locals: {'id': id},
                targetEvent: ev
            }).then(function (answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function () {
                $scope.status = 'You cancelled the dialog.';
            });
        };

        this.trash = function($id){
            Meteor.call('statusTrash', {id: $id, trash: true}, function (error) {
                if (error) {
                    Materialize.toast('Erro: ' + error, 4000);
                } else {
                    Materialize.toast($translate.instant('Status sent to trash') + '!', 4000, 'rounded green accent-1 green-text text-darken-4');
                }
            });
        };
    }
);