(function() {
    //if using angucomplete: use selectedItem property on chips and pass the selectedobj to the 
    //property.
    angular.module('chipsApp', ['angucomplete-alt'])
        .controller('Controller', ['$scope', function($scope) {
            $scope.tags = ["a","b","c","d","e","f","g","h"];
            $scope.selected = null;
            $scope.num=5;
            $scope.demoArray = [{ name: 'A', id: 1 }, { name: 'B', id: 2 }, { name: 'C', id: 3 }, { name: 'D', id: 4 }, { name: 'E', id: 5 }, { name: 'ABCDE', id: 6 }];
            $scope.selectedNameFunction = selectedNameFunction;
            $scope.transfromChipFn = transfromChipFn;            
                $scope.removeChipFunction	=removeChipFunction	;
                $scope.addChipFunction=addChipFunction;
            
            function selectedNameFunction(selectedItem1) {
                if (selectedItem1) {
                    $scope.selected = selectedItem1.originalObject;
                    setTimeout(function() {
                        $scope.$apply(function() {});
                    }, 0);
                }
            }

            function transfromChipFn(no) {
                if (no) {
                    return no;
                } else {
                    return null;
                }
            }

            function removeChipFunction	(no){
			console.log(no)                	
                }
                function addChipFunction(no){
			console.log(no)                	
                }

        }])
        .directive('chipsInput', function($compile) {

            function link(scope, element, attrs, controller) {

            		//console.log(controller)
            	 scope.$watch('chipsArray', function(newValue, oldValue) {
            	 	 if (scope.maxChips) {

            	 	 	if(newValue.length < scope.maxChips)
            	 	 	{
            	 	 		controller.chipsArray=newValue;
            	 	 	}else{
            	 	 		newValue.splice((scope.maxChips),(newValue.length-scope.maxChips));
            	 	 	controller.chipsArray=newValue;
                                
                            } 
                        }else if (!scope.maxChips) {
                                 controller.chipsArray=newValue;
                            }
            	 	 	
                 
                  //console.log(controller.chipsArray)
                });
            }

            function compile(tElement, tAttrs, transclude) {

            }

            function directiveController($scope, $attrs, $element, $exceptionHandler) {

                var inputElement = $element.find('input');
                var data = $attrs.placeholder;
 
                setTimeout(function() {
                    inputElement.attr("placeholder", $scope.placeholder);
                    $scope.$watch('placeholder', function(newValue, oldValue) {
                    	if(inputElement[0]!=undefined)
                        if (newValue != inputElement[0].getAttribute("placeholder")) {
                            inputElement.attr("placeholder", $scope.placeholder);
                        }
                    })
                }, 0)

                var vm = this;
                vm.chipsArray =  [];
                vm.demovar = 2;
                vm.titleFieldsToDisplay = "";
                vm.chipdata = null;
                vm.placeholderToShow = "";
                vm.useReadOnly=false;

                vm.focusfn = focusfn;
                vm.keydown = keydown;
                vm.blur = blur;
                vm.clicked = clicked;
                vm.divclicked = divclicked;
                vm.addDataToShowTags = addDataToShowTags;

                $scope.$watch('selectedItem', function(newValue, oldValue) {
                    var event = {};
                    event.keyCode = 13;
                    	 if (vm.titleFieldsToDisplay) {
                        var toSend = newValue[angular.copy(vm.titleFieldsToDisplay)];
                        keydown(event, toSend);
                    }                 
                });

                 $scope.$watch('readOnly', function(newValue, oldValue) {
                       vm.useReadOnly=angular.copy(newValue);
                    })

                setTimeout(function() {
                    if ('onTransformChip' in $attrs) {
                        vm.useTransformChip = true;
                    } else
                        vm.useTransformChip = false;

                    if ('onAddChip' in $attrs) {
                        vm.useAddChip = true;
                    } else
                        vm.useAddChip = false;

                     if ('onRemoveChip' in $attrs) {
                        vm.useRemoveChip = true;
                    } else
                        vm.useRemoveChip = false;

                    var autoCompleteElement = $element.find('div');
                    for (var i = 0; i < autoCompleteElement.length; i++) {
                        if (autoCompleteElement[i].attributes.getNamedItem("angucomplete-alt")) {
                            vm.transcludeAnguComplete = true;
                            break;
                        } else {
                            vm.transcludeAnguComplete = false;
                        }
                    }
                }, 0);

                var enter_keycode = 13;

                function focusfn(event) {

                }

                function keydown(event, data) {
                    var e = {};

                    $scope.chiptoadd = angular.copy(data);
                    if (vm.useTransformChip) {
                        vm.valueFromTransformChip = $scope.onTransformChip({ 'chiptoadd': $scope.chiptoadd });
                        data = vm.valueFromTransformChip;
                        console.log("trans")
                    }
                    if (event.keyCode == 13) {
                        if (typeof data == 'string')
                            data = data.trim();
                        if (data != '' && data != undefined && data != null) {
                            if ($scope.maxChips && vm.chipsArray.length < $scope.maxChips) {
                                addDataToShowTags(data)
                            } else if (!$scope.maxChips) {
                                addDataToShowTags(data)
                            }
                        }
                        vm.chipdata = "";
                    }
                }

                function blur(event) {

                }

                function clicked(index) {
                	var data=vm.chipsArray[index];
                    vm.chipsArray.splice(index, 1);
                    if(vm.useRemoveChip)
                     $scope.onRemoveChip({ 'chiptoremove':data });
                }

                function divclicked() {
                    document.getElementById("chips_input").focus();
                }

                function addDataToShowTags(data) {
                	// $scope.chiptoadd = angular.copy(data);
                    var found = 0;
                    if (vm.chipsArray.length == 0)
                        vm.chipsArray.push(data);
                    else {
                        for (var i = 0; i < vm.chipsArray.length; i++) {
                            if (vm.chipsArray[i] == data) {
                                found = 1;
                            }
                        }
                        if (!found)
                            vm.chipsArray.push(data);
                    }
                    if(vm.useAddChip)
                    $scope.onAddChip({ 'chiptoadd': $scope.chiptoadd });

                }


            }

            return {
                restrict: 'E',
                transclude: true,
                scope: {
                    chipsArray: '=ngModel',
                    selectedItem: '=',
                    onTransformChip: '&',
                    maxChips: '@',
                    placeholder: '@',
                    readOnly:'@',
                    onAddChip: '&',
                    onRemoveChip: '&'
                },
                controller: directiveController,
                controllerAs: 'dirCtrl',
                templateUrl: 'chipstemplate.html',
                replace: true,
                link: link
            };
        })

})();
