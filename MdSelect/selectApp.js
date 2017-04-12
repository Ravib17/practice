(function() {
    angular.module("selectApp", []);
    angular.module("selectApp").directive("iaSelect", SelectDirective);
    angular.module("selectApp").directive("iaOption", OptionDirective)

    function SelectDirective($compile, $parse) {

        function SelectController($scope, $attrs, $element) {
            var vm = this;
            $scope.isOptionMenuOption = false;

            $scope.toggleOptions = function() {
                $scope.isOptionMenuOption = !$scope.isOptionMenuOption;
            }
            $scope.selectedOption = "select Option";
            vm.options = []
            vm.optionElements = [];
            $scope.$watch("selectedItem", function(oldValue, newValue) {
                if (oldValue != newValue) {
                	
                    updateSelectedOption();
                }

            })

            vm.selectOption = function(element, valueObject) {
                $scope.selectedOption = element.innerHTML;
                $scope.isOptionMenuOption = false;
                var parent = element.parentElement;
                console.log(parent.getAttribute("ng-value"));

                var array = parent.getAttribute("ng-value").split(".");
                var finalValue = angular.copy(valueObject);
                for (var i = 1; i < array.length; i++) {
                    finalValue = finalValue[array[i]];
                }
                $scope.selectedItem = finalValue;
            }

            function updateSelectedOption() {
                var property = "";
                var finalValue = "";
                console.log(vm.options)
                for (i = 0; i < vm.options.length; i++) {
                    property = vm.optionElements[i].getAttribute('ng-value');
                    var propetyArray = property.split(".");
                    finalValue = vm.options[i];
                    for (j = 1; j < propetyArray.length; j++) {
                        finalValue = finalValue[propetyArray[j]];
                    }
                    console.log(finalValue === $scope.selectedItem);
                    if (finalValue === $scope.selectedItem) {
                        $scope.selectedOption = vm.optionElements[i].childNodes[0].innerHTML;
                        if(!$scope.$$phase){
                        	$scope.$digest();
                        }
                        break;
                    }

                }
            }

            setTimeout(function() {
                updateSelectedOption()
            }, 0)


        }
        return {
            restrict: "EA",
            controller: SelectController,
            transclude: true,
            require: "^ngModel",
            scope: {
                selectedItem: "=ngModel"
            },
            templateUrl: 'iaSelect.html'
        }

    }

    function OptionDirective($compile) {
        function link(scope, elem, attr, ctrl) {
            // console.log(ctrl.id)
            var appendElement = $compile(angular.element("<div class='option' ng-click='selectOption($event)'>"))(scope);
            appendElement = appendElement.append(elem.contents());
            elem.append(appendElement);
            ctrl.options.push(scope.option);
            ctrl.optionElements.push(elem[0])
            console.log(ctrl.options);
            scope.selectOption = function(event) {
                ctrl.selectOption(event.target, scope.option);
            }
        }
        return {
            restrict: "E",
            require: "^iaSelect",
            link: link,
        }
    }

    angular.module("selectApp").controller('selectCtrl', function() {
        var vm = this;
        vm.selectedOption = 5;
        vm.callf = function() {
                console.log(vm.optionArray);
            }
            //vm.optionArray= ["A","B","C","D"];
            // vm.option = {"name":"sunil","class":"5"};
            //vm.optionArray = [{ "name": "sunil", "class": 5 }, { "name": "arvind", "class": 6 }, { "name": "ridhi", "class": 7 }, { "name": "ravi", "class": 8 }];
        vm.optionArray = [{ "name": "sunil", "class": { "className": "primary", "Id": 2 } }, { "name": "arvind", "class": { "className": "primary", "Id": 5 } }, { "name": "ridhi", "class": { "className": "primary", "Id": 6 } }, { "name": "ravi", "class": { "className": "primary", "Id": 9 } }];
    });

})();
