var app = angular.module('myApp', ['ngMaterial', 'ngMessages'])
    .controller('appCtrl', function($scope,$mdDialog) {
      $scope.selectedMode = 'md-fling';
      $scope.isOpen=false;
      $scope.openSd=function(){
        $scope.isOpen=true;
      }

        $scope.title = "ravi";
        var self = this;

        self.numberChips = [];
    $scope.showAlert = showAlert;

         function showAlert() {

      alert = $mdDialog.alert({
        title: 'Attention',
        textContent: 'This is an example of how easy dialogs can be!',
        ok: 'Close'
      });
      $mdDialog
        .show( alert )
        .finally(function() {
          alert = undefined;
        });

}

    });
app.config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('brown')
        .accentPalette('orange')
});
