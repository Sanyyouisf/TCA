app.controller("childActivityCtrl", function($scope,ChildActivityFactory,ChildFactory,$routeParams,ActivityFactory,AvatarFactory){
	
	$scope.childActivities = [];
	console.log("$routeParams.childId",$routeParams.childId);

		ChildFactory.getSingleChild($routeParams.childId)
		.then((resultChild)=>{
			// console.log("resultChild",resultChild);
			$scope.selectedChild =resultChild;
			console.log("$scope.selectedChild",$scope.selectedChild);

			AvatarFactory.getSinglePicture($scope.selectedChild.pic)
            .then((image) => {
            	console.log("image",image);
            	console.log("image.path",image.path);
            	$scope.pic = image.path;
            });
		});

		ChildActivityFactory.getChildActivitiesForChild($routeParams.childId)
		.then((resultActivities)=>{
			console.log("resultActivities",resultActivities);
			let kidActivities = [];
			$scope.childActivities = resultActivities;
			$scope.childActivities.forEach((x) => {
		        ActivityFactory.getSingleActivity(x.activityId)
		        .then((result) => {
		        	console.log("result ",result);
		            result.childActivityId = x.id;
		            result.isCompleted = x.isCompleted;
		            kidActivities.push(result);
		          	console.log("result.childActivityId",result.childActivityId);
		        });
		    });
		        console.log("kidActivities",kidActivities);
		        $scope.activities = kidActivities;
		        console.log("$scope.activities",$scope.activities);        
		})
		.catch((error)=>{
			console.log("error in displayChildActivities",error);
		});
	
});