var app = angular.module('app', ['ngMessages']);
app.controller('uCtrl', function($scope, $http) {
    $scope.submit = function() {
        var name = $scope.name;
        var email = $scope.email;
        values = { uname: name, uemail: email  }
    }
});

angular.module('app').directive('usernameValidator', function($http, $q, $timeout) {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
                ngModel.$asyncValidators.uniqueUsername = function(modelValue, viewValue) {
                    console.log("hkhkakha");

                var value = modelValue || viewValue;
                return $http.get('data.txt').then(function(response) {
                    var persons = response.data;
                    for (i = 0; i < persons.length; i++) {
                        if (persons[i].Name == value) {
                            console.log("username is already present");
                            return $q.reject('error');
                        }
                    }
                    return true;
                }, function() {
                    console.log('Failed');
                });
            };


        }


    }

});
