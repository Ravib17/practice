angular.module("app",[]);
angular.module("app").controller("appController",function(){

	this.fn =function(){
		var nicE = new nicEditors.findEditor('myNicEditor');

		question = nicE.getContent();
		console.log(nicE.getContent());
	}
})