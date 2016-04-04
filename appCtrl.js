require(['scripts/main.js'], function() {
    require(["angular", "uirouter", "uiapp", "appCtrl"], function() {

        try {
            console.log('sdkf ksdnf ksd');
            angular.module('uiapp').controller("appCtrl", function($scope, $state) {
                $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
                    alert("state change successfully" + $state.href('greeting') + $state.get('greeting').te);
                    $state.go('greeting');
                });
            });
            angular.element(document).ready(function() {
                angular.bootstrap(document, ['uiapp']);
            });
        } catch (e) {
            console.log(e);
        }

    });
});
