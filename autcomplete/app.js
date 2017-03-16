var app = angular.module('app', ['angucomplete-alt']);
app.controller('appCtrl', function($scope, $http) {
    var vm=this;
    vm.selectedItem="";
    vm.jobQuerySearch=jobQuerySearch;
    vm.inputChanged = inputChanged;
    vm.optionSelected = optionSelected
    vm.array =[{"keyword":"abc"},{"keyword":"pqr"},{"keyword":"pqr"},{"keyword":"stu"},{"keyword":"vwx"}];
    vm.remoteCall=remoteCall;

    //work as query search return suggestion but only for local search .
    function jobQuerySearch(searchText,array){   

    console.log(searchText)	;
    	var array =[{"keyword":"abc"},{"keyword":"pqr"}];
    	return array;
    }

    //function after user selects option the selected object comes in parameter of function 
    //eg.data use data.orginalObject to get object 
    function optionSelected(data){

    	console.log(data);
    }

    //this is same as searchTextChange on material autcomplete whenuser change input this function will called
    function inputChanged(){
    	console.log("input changed");
    }

    //this function bind with remote-api-handler attribute to for get and post call
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

