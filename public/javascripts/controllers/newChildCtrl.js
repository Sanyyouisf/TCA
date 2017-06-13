app.controller("newChildCtrl", function($location,$scope,$rootScope,ChildFactory){
	console.log(" inside newChild-Ctrl");

	if($location.path()==='/logout'){
		AuthFactory.logout();
		$rootScope.user={};
		$location.url('/auth');
	}

	$scope.addNewChild = ()=>{
		$scope.newChild.parenId = $rootScope.user.uid;
		console.log("$scope.newChild in addNewChild:",$scope.newChild);		
		ChildFactory.postNewChild($scope.newChild)
		.then((reponse)=>{
			console.log("reponse in addNewChild:",reponse);
		})
		.catch((error)=>{
			console.log("error addNewChild :",error);
		});
	};


});