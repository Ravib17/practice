angular.module("PromiseApp", [ "ngMaterial" ]), angular.module("PromiseApp").controller("PromiseCtrl", function(o) {
    function t() {
        console.log(o.count), vm.promise = o.displayFunction().then(function(o) {
            vm.displayText = o.data;
        }, function(o) {
            vm.displayText = o;
        }), console.log("after promise"), e(), console.log("after fucntion");
    }
    function e() {
        console.log("inside wait");
    }
    vm = this, vm.promise = null, vm.displayText = "hello", vm.onClickButton = t, window.onbeforeunload = function(o) {
        return "why would you do that???";
    };
}), angular.module("PromiseApp").factory("PromiseFc", function(o, t) {
    function e() {
        factory.count++, factory.lastPromise && factory.lastPromise.reject("rejected");
        var t = o.defer();
        return factory.lastPromise = t, setTimeout(function() {
            t.resolve({
                data: "promise resolved" + factory.count
            });
        }, 5e3), t.promise;
    }
    return factory = {}, factory.count = 0, factory.lastPromise = null, factory.displayFunction = e, 
    factory;
});