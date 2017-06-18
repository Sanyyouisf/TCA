app.controller("editChildCtrl", function($scope, $routeParams,ChildFactory, AvatarFactory, $rootScope) {

	$scope.selectedChild ="";
	$scope.updatedChild = {};
	$scope.allPictures =[];
	// $scope.newChild= {};
	 	
	console.log("$routeParams.childId :",$routeParams.childId);
	ChildFactory.getSingleChild($routeParams.childId)
	.then ((results) => {
		console.log("results",results);
		$scope.selectedChild = results;
		console.log("$scope.selectedChild",$scope.selectedChild);
	}).catch ((error) => {
		console.log("error in Edit Address",error);
	});

	
	$scope.displayAllPictures = ()=>{
		AvatarFactory.getAllPictures ()
		.then((allPicturez) => {
			$scope.allPictures = allPicturez;
		})
		.catch((error)=>{
			console.log("error addNewChild :",error);
		});
	};

	$scope.updateProfilePicture = (avatarId) => {
		// console.log("ipicId",avatarId);
		// console.log("$rootScope.user",$rootScope.user);
		$scope.updatedChild.pic = avatarId;
		$scope.updatedChild.parentId=$rootScope.user.uid;
		$scope.updatedChild.id = $routeParams.childId;
		console.log("$scope.updatedChild",$scope.updatedChild);
	};

	$scope.updateChild = (updatedChild) => {
		console.log("inside updateChild in ctrl");
		console.log("$scope.updatedChild",$scope.updatedChild);
		ChildFactory.editSingleChild($scope.updatedChild)
		.then((result)=>{
			console.log("result",result);
			// $location.url("/addressBooks/list");
		}).catch((error)=>{
			console.log("error in addNewAddress :",error);
		});
	};



});