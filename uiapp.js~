
angular.module('uiapp', ['ui.router']);
angular.module('uiapp').config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('greeting', {
            url: '/greeting',

            templateUrl: "greeting.html"
        })
        .state('greeting.name', {
            url: '/name',
            parent: 'greeting',
            controllerL: 'appCtrl',
            views: {
                'name': {
                    templateUrl: "name.html"
                },
                'surname': {
                    templateUrl: "surname.html",
                    controller: 'appCtrl'
                }
            }
        });
});
