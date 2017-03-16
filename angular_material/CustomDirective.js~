var app=angular.module("directiveApp",[]);
  app.directive("createFilter",function(){
	return function(scope,element,attrs){
	var data=JSON.parse(attrs.createFilter);
	var selectElement=angular.element("<select>");
	console.log(data[0]);
	for(var i=0;i<data.length;i++){
	  console.log(data[i]);
	  selectElement.append(angular.element("<option>").text(data[i]));
	}
	
	
	selectElement[0].value=attrs.selectedOption;
	attrs.ngModel=attrs.selectedOption;
	scope[attrs.modelvalue]=attrs.selectedOption
	element.append(selectElement);
	console.log(selectElement);
	}
});

app.controller("CustomDirective",function($scope){
	$scope.array1Value="option 1";
	$scope.optionArray=["option 1","option 2","option 3","option 4"];
	console.log(angular.isArray($scope.optionArray));
});
