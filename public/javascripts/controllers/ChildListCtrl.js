app.controller("ChildListCtrl", function($location,ChildFactory,$scope,$rootScope,AvatarFactory,ActivityFactory,ChildActivityFactory){
	console.log(" inside ChildList-Ctrl");


	$scope.selectedchildren=[];
	$scope.activities =[];
	$scope.selectedChildActivities = [];

	// displayChildrenForParent
		ChildFactory.getChildrenForParent($rootScope.user.uid)
		.then((result)=>{
			$scope.selectedchildren = result ;
			console.log("result in displayChildrenForParent",result);

			//loop through the selectedchildren to get image url 
			$scope.selectedchildren.forEach((kid) => {
				console.log("kid inside forEach :",kid);
				$scope.childId= kid.id;
				AvatarFactory.getSinglePicture(kid.pic).then((image) =>{
					// console.log("image inside forEach :",image);
					kid.url = image.path;
					// console.log("kid.path",kid.url);
					// console.log("image.path",image.path);

				}).catch((error)=>{
					console.log("error in getSinglePicture :",error);
				});	
			});

			//display the activities for this child
			console.log("$scope.childId :",$scope.childId);
			ChildActivityFactory.getChildActivitiesForChild($scope.childId)
			.then((childActivities) =>{
				$scope.selectedChildActivities = childActivities;
				// console.log("childActivities in getChildActivitiesForChild :",childActivities);
					
					$scope.selectedChildActivities.forEach((activity) => {
						// console.log("ChildActivities inside forEach :",ChildActivities);
						ActivityFactory.getSingleActivity(activity.activityId)
							.then((result) =>{
							// console.log("result inside forEach :",result);
							activity.activity=result;
							})
							.catch((error)=>{
							console.log("error in getSinglePicture :",error);
						});
					});
					console.log("$scope.selectedChildActivities",$scope.selectedChildActivities);		

					//ng-repeat="cat in selectedChildActivities". cat.activity.name
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
