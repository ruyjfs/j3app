angular.module('admin').controller('FooterCtrl', [ '$scope', '$timeout', '$mdSidenav', '$mdUtil', '$log', '$rootScope', '$reactive',
    function ($scope, $timeout, $mdSidenav, $mdUtil, $log, $rootScope, $reactive) {
        $reactive(this).attach($scope);

        $rootScope.$watch('nameModule', () => {
            this.helpers({
                strClassColor: function () {
                    let strClassColor;
                    switch ($rootScope.nameModule) {
                        case 'j3user':
                            strClassColor = 'orange darken-4';
                            break;
                        case 'j3admin':
                            strClassColor = 'brown darken-4';
                            break;
                        case 'j3scrum':
                            strClassColor = 'brown darken-4';
                            break;
                        case 'j3tect':
                            strClassColor = 'blue darken-4';
                            break;
                        case 'j3game':
                            strClassColor = 'red darken-4';
                            break;
                        case 'j3drive':
                            strClassColor = 'grey';
                            break;
                        default:
                            strClassColor = 'grey darken-4';
                            break;
                    }
                    return strClassColor;
                },
                strNameModule: function () {
                    return $rootScope.nameModule;
                },
            });
        });
    }
]);