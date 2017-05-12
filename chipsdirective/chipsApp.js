angular.module("chipTestApp",['chipsApp'])
angular.module("chipTestApp").controller("chipCtrl",function($scope){
	var vm=this;
	vm.chipsArray=[];
	vm.placeholder= "Enter chipTestApp";
	vm.demoArray = [{"name":"Apple"},{"name":"Grapes"},{"name":"Pinapple"},{"name":"Watermelon"},{"name":"Orange"},{"name":"Aam"}];
	var text="";
	vm.selectedNameFunction = function(selectedObject){
		vm.selected=selectedObject.originalObject;
		setTimeout(function() {
        $scope.$apply(function() {});
         }, 0);
	}

	vm.transfromChipFn= function(chipToAdd){
		return chipToAdd;
	}

	vm.onAddChip =function(){
		console.log(vm.chipsArray);
		if(vm.chipsArray.length>=5){
			vm.placeholder= "Max Limit Reached";
		}
	}
})