var app=angular.module('app',['ui.router','ngMaterial'])
app.config(function($stateProvider, $urlRouterProvider){
   $stateProvider
        .state('home', {
            url:"/home",
            views: {
                "mainView": {
                    templateUrl: 'name.html',
                }
            }
        })
        .state('jobs', {
	    url: "/jobs",
            views: {
                "mainView": {
                    templateUrl: 'greeting.html',
                }
            }
        })
});
 app.controller('appCtrl',function($scope){
  var vm=this;
  this.title="hello";
$scope.changeUrl=function() {
        if (typeof (history.pushState) != "undefined") {
            var obj = { Page: "", Url: "" };
            history.replaceState(null, null, "greeting.html");
	     console.log();
        } else {
            alert("Browser does not support HTML5.");
        }
    }
 
 })
