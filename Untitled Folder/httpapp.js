var app = angular.module('app', ['angucomplete-alt']);
app.controller('uCtrl', function($scope, $http) {
    var vm=this;
    vm.selectedItem="";
    vm.jobQuerySearch=jobQuerySearch;
    vm.inputChanged = inputChanged;
    vm.optionSelected = optionSelected
    vm.array =[{"keyword":"abc"},{"keyword":"pqr"},{"keyword":"pqr"},{"keyword":"stu"},{"keyword":"vwx"}];
    vm.remoteCall=remoteCall;

    function jobQuerySearch(searchText,array){ 
    console.log(searchText)	;
    	var array =[{"keyword":"abc"},{"keyword":"pqr"}];
    	return array;
    }

    function optionSelected(data){

    	console.log(data);
    }

    function inputChanged(){
    	console.log("input changed");
    }

    function remoteCall(str,promise){
    	  	return $http.get("https://api.myjson.com/bins/nwwb3", {}, {timeout:promise})
                .then(function(response) {
                    if (response.data ) {
                        return response;
                    }
                }, function(response) {
                    factory.showToast("Something went wrong!");
                    return false;
                });
    }
});

