angular.module('acApp',['ngMaterial']);
angular.module('acApp').controller('acCtrl',function($scope){
    var vm=this
    vm.jobSearchText=null;
    vm.jobQuerySearch=jobQuerySearch;
    isSearchClearListenerApplied = false;
    vm.value="load";
    vm.jobSearchTextChange=jobSearchTextChange;
    init();

    function init(){
           onDestroyListener = $scope.$on('$destroy', function() {
                searchInputElement.off("keyup");
                if (searchClearButton != undefined) {
                    searchClearButton.off("click");
                }
                onDestroyListener();
            });
        setTimeout(function() {
                    searchAutoCompleteElement = angular.element("#search_autocomplete_element");
                    searchInputElement = angular.element("#searchJob");
                    searchInputElement.on("keyup", function(event) {
                        if (event.keyCode == 13) {
                            vm.isDataLoading = true;
                            vm.searchKeyword = vm.jobSearchText;
                            vm.value="eveything is set";
                        }
                    });
                }, 0);
         vm.value="hello";

    }

	function jobQuerySearch(query) {
                if (query) {
                   var array= ["A","B","C","D","E","F"];
                   return array;
                }
            }
    function jobSearchTextChange(query) {
                if (query) {
                  
                    if (!isSearchClearListenerApplied) {
                        isSearchClearListenerApplied = true;
                         searchAutoCompleteElement = angular.element("#search_autocomplete_element");
                         searchInputElement = angular.element("#searchJob");
                        searchClearButton = searchAutoCompleteElement.find("button");
                        
                        searchClearButton.on("click", function(event) {
                            searchInputElement.blur();
                            isSearchClearListenerApplied = false;
                            searchClearButton.off("click");
                            console.log(searchClearButton);
                            if (vm.searchKeyword == "" || vm.searchKeyword == null) {
                                return;
                            }
                              
                            vm.searchKeyword = "";
                            vm.isDataLoading = true;
                            vm.value="x clickeed";

                        });;
                    }
                } else {
                    isSearchClearListenerApplied = false;
                }
            }


});