app.controller("ChildListCtrl", function($location,ChildFactory,$scope,$rootScope,AvatarFactory,ActivityFactory){
	console.log(" inside ChildList-Ctrl");


	$scope.selectedchildren=[];
	$scope.activities =[];

	// let displayChildrenForParent = ()=>{
		ChildFactory.getChildrenForParent($rootScope.user.uid)
		.then((result)=>{
			$scope.selectedchildren = result ;
			// console.log("result in displayChildrenForParent",result); 
			$scope.selectedchildren.forEach((kid) => {
				// console.log("kid inside forEach :",kid);
				AvatarFactory.getSinglePicture(kid.pic).then((image) =>{
					// console.log("image inside forEach :",image);
					kid.url = image.path;
					// console.log("kid.path",kid.url);
					// console.log("image.path",image.path);

				}).catch((error)=>{
					console.log("error in getSinglePicture :",error);
				});	
			});
		})
		.catch((error) => {
            console.log("error in displayChildrenForParent: ", error);
        });


		$scope.displayAllActivities = () => {
			console.log("inside displayAllActivities");
			ActivityFactory.getAllActivities()
			.then((results)=>{
				console.log("results",results);
				$scope.activities = results;

			})
			.catch((error)=>{
				console.log("error",error);
			});
		};


        if($location.path()==='/logout'){
		AuthFactory.logout();
		$rootScope.user={};
		$location.url('/auth');
		}
	

});
