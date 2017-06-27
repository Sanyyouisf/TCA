app.controller("newChildCtrl", function($location,$scope,$routeParams,$rootScope,ChildFactory,AvatarFactory){

	$scope.allPictures =[];


	if($location.path()==='/logout'){
		AuthFactory.logout();
		$rootScope.user={};
		$location.url('/auth');
	}

	$scope.addNewChild = ()=>{
		$scope.newChild.parentId = $rootScope.user.uid;
		ChildFactory.postNewChild($scope.newChild)
		.then((reponse)=>{
			$scope.newChild= {};
			$location.url('/childList');
		})
		.catch((error)=>{
			console.log("error addNewChild :",error);
		});
	};


	$scope.displayAllPictures = ()=>{
		AvatarFactory.getAllPictures ()
		.then((allPicturez) => {
			$scope.allPictures = allPicturez;
		})
		.catch((error)=>{
			console.log("error addNewChild :",error);
		});
	};

	$scope.addProfilePicture = (avatarId) => {
		$scope.newChild.pic = avatarId;
		$scope.newChild.parentId=$rootScope.user.uid;
	};


});