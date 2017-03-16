angular.module('sapp',['ngMaterial','ngMessages']);
angular.module('sapp').controller('appCtrl',function($mdDialog,$mdSidenav){
 this.selectedMode="md-scale";
  this.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);

    };
    this.openLeftMenu = function() {
    $mdSidenav('right').toggle();
  };

});