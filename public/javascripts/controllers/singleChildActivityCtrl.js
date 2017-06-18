app.controller("singleChildActivityCtrl", function($scope,ActivityFactory,ChildActivityFactory,$routeParams){

	$scope.childActivityId = "";
	$scope.activity={};

	let displayChildActivity =()=>{
		console.log("$routeParams.childActivityId :",$routeParams.childActivityId);
		ChildActivityFactory.getSingleChildActivity($routeParams.childActivityId)
		.then((result)=>{
			ActivityFactory.getSingleActivity(result.activityId)
			.then((resultActivity)=>{
				console.log("resultActivity",resultActivity);
				$scope.activity = resultActivity;
				console.log("$scope.activity",$scope.activity);
			})
			.catch((error)=>{
			console.log("error",error);
			});
		})
		.catch((error)=>{
			console.log("error",error);
		});
	};

	displayChildActivity();

});