
angular.module("testFileApp",['selectApp'])
angular.module("testFileApp").controller('testCtrl', function() {
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
