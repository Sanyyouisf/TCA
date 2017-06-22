app.controller("childProfileCtrl", function($scope,ChildActivityFactory,ChildFactory,$routeParams,ActivityFactory,AvatarFactory){
	
	$scope.childActivities = [];
	console.log("$routeParams.childId",$routeParams.childId);

		ChildFactory.getSingleChild($routeParams.childId)
		.then((resultChild)=>{
			$scope.selectedChild =resultChild;
			AvatarFactory.getSinglePicture($scope.selectedChild.pic)
            .then((image) => {
            	$scope.pic = image.path;
            });
		});

		ChildActivityFactory.getChildActivitiesForChild($routeParams.childId)
		.then((resultActivities)=>{
			let kidActivities = [];
			$scope.childActivities = resultActivities;
			$scope.childActivities.forEach((x) => {
		        ActivityFactory.getSingleActivity(x.activityId)
		        .then((result) => {
		            result.childActivityId = x.id;
		            result.isCompleted = x.isCompleted;
		            kidActivities.push(result);
		        });
		    });
		    $scope.activities = kidActivities;
		})
		.catch((error)=>{
			console.log("error in displayChildActivities",error);
		});
	
});