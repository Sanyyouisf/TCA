app.controller("editChildCtrl", function($scope, ChildFactory, AvatarFactory, $rootScope) {


$scope.updatedChild = {};

	ChildFactory.getSingleChild($routeParams.id)
	.then ((results) => {
		console.log("results",results);
		$scope.updatedChild = results.data;
	}).catch ((error) => {
		console.log("error in Edit Address",error);
	});


	$scope.updatedChild = () => {
		ChildFactory.editSingleChild($scope.updatedChild)
		.then(()=>{
			$location.url("/addressBooks/list");
		}).catch((error)=>{
			console.log("error in addNewAddress :",error);
		});
	};



});