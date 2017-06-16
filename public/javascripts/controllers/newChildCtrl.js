app.controller("newChildCtrl", function($location,$scope,$routeParams,$rootScope,ChildFactory,AvatarFactory){

	$scope.allPictures =[];
	$scope.newChild= {};

	if($location.path()==='/logout'){
		AuthFactory.logout();
		$rootScope.user={};
		$location.url('/auth');
	}

	$scope.addNewChild = ()=>{
		$scope.newChild.parentId = $rootScope.user.uid;
		console.log("$scope.newChild in addNewChild:",$scope.newChild);		
		ChildFactory.postNewChild($scope.newChild)
		.then((reponse)=>{
			console.log("reponse in addNewChild:",reponse.config.data);
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
		console.log("ipicId",avatarId);
		console.log("$rootScope.user",$rootScope.user);
		$scope.newChild.pic = avatarId;
		$scope.newChild.parentId=$rootScope.user.uid;
	};


});