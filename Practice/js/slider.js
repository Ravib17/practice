var app = angular.module('sliderApp', ['ngMaterial']);

app.controller('sliderCtrl', function($scope) {

    $scope.spanText = {
        value1: 'Initial Value'
    }

    $scope.changeValue = function(){
    	$scope.spanText.value1 = 'Changed Value';
    }
})