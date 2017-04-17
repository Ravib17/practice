(function() {
    angular.module("selectApp", []);
    angular.module("selectApp").directive("iaSelect", SelectDirective);
    angular.module("selectApp").directive("iaOption", OptionDirective)

    function SelectDirective($compile, $parse, $window) {

        function SelectController($scope, $attrs, $element) {
            var vm = this;
            $scope.isOptionMenuOption = false;
            vm.selectedOptIndex = -1;

            $scope.toggleOptions = function() {
                $scope.isOptionMenuOption = !$scope.isOptionMenuOption;
                if ($scope.isOptionMenuOption && vm.selectedOptIndex != -1) {
                    setTimeout(function() {
                        console.log(vm.optionElements);
                        console.log(vm.selectedOptIndex)
                        vm.optionElements[vm.selectedOptIndex].childNodes[0].focus();

                    }, 0)
                }
            }

            $scope.onBlurSelectDiv = function() {
                if (vm.selectedOptIndex == -1 && !$scope.isOptionMenuOption) {
                    $scope.isOptionMenuOption = false;
                }
            }

            $scope.onSelectKeydown = function(event) {
                console.log("here");
                if (event.keyCode == 13) {
                    $scope.toggleOptions()
                }
            }



            $scope.selectedOption = "select Option";
            vm.options = []
            vm.optionElements = [];
            $scope.$watch("selectedItem", function(newValue,oldValue) {
                if (oldValue != newValue) {
                    console.log(angular.copy(oldValue));
                    console.log(angular.copy(newValue));
                    updateSelectedOption();
                }

            })


            vm.selectOption = function(element, valueObject) {
                

                $scope.selectedOption = element.innerHTML;
                $scope.isOptionMenuOption = false;
                var parent = element.parentElement;
                if (parent.getAttribute("ng-value")) {
                    console.log("1");
                    var array = parent.getAttribute("ng-value").split(".");
                    var finalValue = angular.copy(valueObject);
                    for (var i = 1; i < array.length; i++) {
                        finalValue = finalValue[array[i]];
                    }
                    $scope.selectedItem = finalValue;
                }else if(parent.getAttribute("value")) {
                    console.log("2");

                    $scope.selectedItem = parent.getAttribute("value");
                }else {
                    console.log("3");

                    $scope.selectedItem = element.innerHTML;
                }
                // $scope.selectedOptElement = element;
                vm.selectedOptIndex = vm.optionElements.indexOf(parent);
                document.getElementById("select_div").focus();

            }

            function updateSelectedOption() {
                var property = "";
                var finalValue = "";
                console.log(vm.options)
                for (i = 0; i < vm.options.length; i++) {
                    property = vm.optionElements[i].getAttribute('ng-value');
                    var propetyArray = property.split(".");
                    finalValue = vm.options[i];
                    console.log(finalValue);
                    for (j = 1; j < propetyArray.length; j++) {
                        finalValue = finalValue[propetyArray[j]];
                    }
                    console.log(finalValue === $scope.selectedItem);
                    if (finalValue === $scope.selectedItem) {
                        $scope.selectedOption = vm.optionElements[i].childNodes[0].innerHTML;
                        vm.selectedOptIndex = i;
                        break;
                    }

                }

            }

            $window.addEventListener('click', function(e) {
                console.log(e.target.id);
                if (e.target.id != "select_div" && e.target.id != "option") {
                    $scope.isOptionMenuOption = false;
                    if (!$scope.$$phase) {
                        $scope.$digest();
                    }
                }
            });

            setTimeout(function() {
                updateSelectedOption();
                if (!$scope.$$phase) {
                    $scope.$digest();
                }
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
            // count++;
            var appendElement = $compile(angular.element("<div class='option'  ng-keydown='optionOnKeyPress($event)' tabindex='-1' ng-click='selectOption($event)'>"))(scope);
            appendElement = appendElement.append(elem.contents());
            elem.append(appendElement);
            ctrl.options.push(scope.option);
            ctrl.optionElements.push(elem[0])
            console.log(ctrl.options);
            scope.selectOption = function(event) {
                console.log("herea;jsosdj");
                elem[0].focus();

                ctrl.selectOption(event.target, scope.option);
            }

            scope.optionOnKeyPress = function(event) {
                if (event.keyCode == 40) {
                    if (ctrl.selectedOptIndex < ctrl.optionElements.length - 1) {
                        ctrl.selectedOptIndex++;
                        ctrl.optionElements[ctrl.selectedOptIndex].childNodes[0].focus();
                    }
                } else if (event.keyCode == 38) {
                    if (ctrl.selectedOptIndex > 0) {
                        ctrl.selectedOptIndex--;
                        ctrl.optionElements[ctrl.selectedOptIndex].childNodes[0].focus();
                    }
                } else if (event.keyCode == 13) {
                    scope.selectOption(event);
                }

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
        // vm.selectedOption = 5;
        vm.add = add;
        vm.callf = function() {
            console.log(vm.optionArray);
        }

        function add(value) {
            vm.selectedOption = 5
            vm.optionArray.push(value);
            console.log(vm.optionArray);
        }
        //vm.optionArray= ["A","B","C","D"];
        // vm.option = {"name":"sunil","class":"5"};
        //vm.optionArray = [{ "name": "sunil", "class": 5 }, { "name": "arvind", "class": 6 }, { "name": "ridhi", "class": 7 }, { "name": "ravi", "class": 8 }];
        vm.optionArray = [{ "name": "sunil", "class": { "className": "primary", "Id": 2 } }, { "name": "arvind", "class": { "className": "primary", "Id": 5 } }, { "name": "ridhi", "class": { "className": "primary", "Id": 6 } }, { "name": "ravi", "class": { "className": "primary", "Id": 9 } }];
    });

})();
