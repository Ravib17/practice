(function() {
    angular.module("selectApp", []);
    angular.module("selectApp").directive("iaSelect", function SelectDirective($compile, $parse, $window) {

        function SelectController($scope, $attrs, $element) {
            var vm = this;
            var tempSelectedItem = "";
            var ngModelCtrl = $element.controller('ngModel');
            $scope.selectedOption = "select Option";
            $scope.isOptionMenuOption = false;

            vm.optionAttr = []
            vm.optionElements = [];
            vm.selectedOptIndex = -1;

            $scope.toggleOptions = function() {
                $scope.isOptionMenuOption = !$scope.isOptionMenuOption;
                if ($scope.isOptionMenuOption && vm.selectedOptIndex != -1) {
                    setTimeout(function() {
                        vm.optionElements[vm.selectedOptIndex].childNodes[0].focus();

                    }, 0)
                } else if ($scope.isOptionMenuOption && vm.selectedOptIndex == -1) {
                    setTimeout(function() {
                        vm.selectedOptIndex++;
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
                if (event.keyCode == 13) {
                    $scope.toggleOptions()
                }

            }

            $scope.$watch("selectedItem", function(newValue, oldValue) {

                if (tempSelectedItem != newValue) {
                    updateSelectedOption();
                }

            })


            vm.selectOption = function(element, attr) {

                console.log(attr);
                $scope.selectedOption = element.innerHTML;
                $scope.isOptionMenuOption = false;
                var parent = element.parentElement;
                // console.log(attr);
                console.log(parent.getAttribute("ng-value"));
                if (parent.getAttribute("ng-value")) {
                    var array = parent.getAttribute("ng-value").split(".");
                    var finalValue =attr.value;

                    $scope.selectedItem = finalValue;
                    // console.log(finalValue);
                    ngModelCtrl.$setViewValue($scope.selectedItem);
                } else if (parent.getAttribute("value")) {

                    $scope.selectedItem = parent.getAttribute("value");
                    ngModelCtrl.$setViewValue($scope.selectedItem);
                } else {

                    $scope.selectedItem = element.innerHTML;
                    ngModelCtrl.$setViewValue($scope.selectedItem);
                }
                // $scope.selectedOptElement = element;
                tempSelectedItem = $scope.selectedItem;
                vm.selectedOptIndex = vm.optionElements.indexOf(parent);
                 $element[0].children[0].children[0].focus();

            }


            function updateSelectedOption() {
                var property = "";
                var finalValue = "";
                for (i = 0; i < vm.optionAttr.length; i++) {
                    if (vm.optionElements[i].getAttribute('ng-value')) {
                        property = vm.optionElements[i].getAttribute('ng-value');
                        var propetyArray = property.split(".");
                        finalValue = vm.optionAttr[i].value;
                        if (finalValue === $scope.selectedItem) {
                            $scope.selectedOption = vm.optionElements[i].childNodes[0].innerHTML;
                            vm.selectedOptIndex = i;
                            break;
                        }
                    } else if (vm.optionElements[i].getAttribute('value')) {
                        if (vm.optionElements[i].getAttribute("value") == $scope.selectedItem) {
                            $scope.selectedOption = vm.optionElements[i].childNodes[0].innerHTML;
                            vm.selectedOptIndex = i;
                        }
                    } else {
                        if(vm.optionElements[i].childNodes[0].innerHTML == $scope.selectedItem){
                            $scope.selectedOption = vm.optionElements[i].childNodes[0].innerHTML;
                            vm.selectedOptIndex = i;
                        }
                    }

                }

            }

            $window.addEventListener('click', function(e) {
                if ( angular.element(e.target.parentElement)[0].parentElement != $element[0] ) {
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

    });
    angular.module("selectApp").directive("iaOption",  function OptionDirective($compile) {
        function link(scope, elem, attr, ctrl) {
            var appendElement = $compile(angular.element("<div class='option' id='option'  ng-keydown='optionOnKeyPress($event)' tabindex='-1' ng-click='selectOption($event)'>"))(scope);
            appendElement = appendElement.append(elem.contents());
            elem.append(appendElement);
            ctrl.optionAttr.push(attr);
            ctrl.optionElements.push(elem[0]);
            
            scope.selectOption = function(event) {
                elem[0].focus();
                ctrl.selectOption(event.target,attr);
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
                } else if (event.keyCode == 9) {
                    scope.$parent.$parent.toggleOptions();
                }

            }
        }
        return {
            restrict: "E",
            require: "^iaSelect",
            link: link,
            scope : {

            }
        }
    })

    

   

    angular.module("selectApp").controller('selectCtrl', function() {
        var vm = this;
        vm.selectedOption = 5;
        vm.selectedOption2 = 2;
        vm.add = add;
        vm.callf = function() {
        }
        vm.onValueChanged =function(){
            console.log("selected value is ")
            console.log(vm.selectedOption)

        }

        vm.onValueChanged2 =function(){
            console.log("selected value is ")
            console.log(vm.selectedOption2)

        }

        function add(value) {
            vm.selectedOption = "3"
            vm.optionArray.push(value);
        }
        //vm.optionArray= ["A","B","C","D"];
        // vm.option = {"name":"sunil","class":"5"};
        vm.optionArray = [{ "name": "sunil", "class": 5 }, { "name": "arvind", "class": 6 }, { "name": "ridhi", "class": 7 }, { "name": "ravi", "class": 8 }];
        vm.optionArray2 = [{ "name": "a-z", "class": 1 }, { "name": "z-a", "class": 2 }, { "name": "latest", "class": 3 }, { "name": "oldest", "class": 4 }];
        //vm.optionArray = [{ "name": "sunil", "class": { "className": "primary", "Id": 2 } }, { "name": "arvind", "class": { "className": "primary", "Id": 5 } }, { "name": "ridhi", "class": { "className": "primary", "Id": 6 } }, { "name": "ravi", "class": { "className": "primary", "Id": 9 } }];
    });

})();
