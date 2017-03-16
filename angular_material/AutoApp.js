angular.module('autoApp',['ngMaterial']);
angular.module('autoApp').controller('autoCtrl',function($filter){
	var vm=this;
	vm.searchKeyword=null;
	vm.showSearchResult=false;

	vm.searchOnChange=searchOnChange;
	vm.searchOnKey=searchOnKey;
	vm.onPressKey=onPressKey;	
	vm.onSearchCancel=onSearchCancel;
	vm.optionSelected= optionSelected;
	vm.optionKeydown = optionKeydown;

	vm.cities=["mumbai","delhi","banglore","punjab","goa","Gujrat","chennai"]; //define intial list


		function searchOnChange() {
                if (vm.searchKeyword == "" || vm.searchKeyword == null) {
                    vm.showSearchResult = false;
                } else {
                		console.log(vm.searchKeyword);
                  		vm.searchList=$filter('filter')(vm.cities,vm.searchKeyword);
                  		console.log(vm.showSearchResult)
                  		;//update search list logics
                  		 vm.showSearchResult = true;
                }  
                }
            
           function searchOnKey(event) {
           	console.log("in search On key")
                if (event.keyCode == 13 && vm.searchKeyword != "" && vm.searchKeyword != null) {
                    vm.isDataLoading = true;
                    vm.showSearchResult = false;

                    vm.searchList = ["X","y","z","p"];  //what shoulld display on enter.
                     
                     vm.searchKeyword = null;
                     document.getElementById("search").blur();  
                }
                if (event.keyCode == 40) {
                    document.getElementById("0").focus();

                }

            }
            function onSearchCancel() {
                 vm.searchKeyword = null;

            }
            function onPressKey($event, $index,item) {
                if ($event.keyCode == 40) {
                    if (document.getElementById($index + 1) != null) {
                        document.getElementById($index + 1).focus();

                    }
                } else
                if ($event.keyCode == 38) {

                    if (document.getElementById($index - 1) != null) {

                        document.getElementById($index - 1).focus();
                    }
                } else if ($event.keyCode == 13) {
             		vm.searchKeyword =item;
             		document.getElementById("search").focus();
            		vm.showSearchResult=false;


                }else{
                    document.getElementById("search").focus();
                }

            }
             $('html').on("click", function(e) {

                var scope = angular.element("#search").scope();
                scope.$apply(function() {
                    if (vm.showSearchResult && !$('#search').is(':focus')) {
                        vm.showSearchResult = false;
                    }

                });

            });

             function optionSelected(item){
             	console.log("here");
             	vm.searchKeyword =item;
             }

             function optionKeydown(event,item){
             	console.log("optionKeydown")
             	if(event.keyCode == 13){
             		// vm.searchKeyword =item;
             	}

             }





});