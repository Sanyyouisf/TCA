app.controller("ChildListCtrl", function($location,ChildFactory,$scope,$rootScope,AvatarFactory,ActivityFactory,ChildActivityFactory){


	$scope.selectedchildren=[];
	$scope.activities =[];
	$scope.selectedChildActivities = [];

	// displayChildrenForParent
		ChildFactory.getChildrenForParent($rootScope.user.uid)
		.then((result)=>{
			$scope.selectedchildren = result ;
			// console.log("result in displayChildrenForParent",result);

			//loop through the selectedchildren to get image url 
			$scope.selectedchildren.forEach((kid) => {
				// console.log("kid inside forEach :",kid);
				// console.log("kid.id inside forEach :",kid.id);
				$scope.childId= kid.id;
				AvatarFactory.getSinglePicture(kid.pic)
				.then((image) =>{
					// console.log("image inside forEach :",image);
					kid.url = image.path;
					// console.log("kid.path",kid.url);
					// console.log("image.path",image.path);
				})
				.catch((error)=>{
					console.log("error in getSinglePicture :",error);
				});
				ChildActivityFactory.getChildActivitiesForChild(kid.id)
				.then((childActivities) =>{
					kid.activities=[];
					console.log("childActivities",childActivities);
					childActivities.forEach((x)=>{
						ActivityFactory.getSingleActivity(x.activityId)
						.then((result)=>{
							console.log("result",result);
							console.log("kid.childName",kid.childName);
							kid.activities.push(result);



						});
					});


				});


			});

		// 	//display the activities for this child
		// 	$scope.selectedchildren.forEach((kid) => {
		// 		// console.log("kid",kid.id);
		// 		let childId= kid.id;
		// 		// console.log("$scope.childId",$scope.childId);
		// 		ChildActivityFactory.getChildActivitiesForChild(childId)
		// 		.then((childActivities) =>{
		// 			// console.log("childActivities in getChildActivitiesForChild :",childActivities);
		// 			$scope.selectedChildActivities = childActivities;
		// 			// console.log("$scope.selectedChildActivities in getChildActivitiesForChild :",$scope.selectedChildActivities);
		// 			$scope.selectedChildActivities.forEach((activity) => {
		// 				// console.log("activity inside forEach :",activity);
		// 				ActivityFactory.getSingleActivity(activity.activityId)
		// 					.then((result) =>{
		// 					// console.log("result inside forEach :",result);
		// 					activity.activity=result;
		// 					console.log("$scope.selectedChildActivities :",$scope.selectedChildActivities);
		// 					// $scope.selectedChildActivitiestest =result;
		// 					// console.log("$scope.selectedChildActivitiestest",$scope.selectedChildActivitiestest);
		// 					})
		// 					.catch((error)=>{
		// 					console.log("error in getSinglePicture :",error);
		// 				});
		// 			});
		// 			// console.log("$scope.selectedChildActivities",$scope.selectedChildActivities);		
		// 	});
		// });

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
