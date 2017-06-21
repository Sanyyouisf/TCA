app.controller("singleChildActivityCtrl", function($scope,ActivityFactory,ChildActivityFactory,$routeParams,$location){

	$scope.childActivityId = "";
	$scope.activity={};
	$scope.childActivity ={};

	let displayChildActivity =()=>{
		ChildActivityFactory.getSingleChildActivity($routeParams.childActivityId)
		.then((result)=>{
			$scope.childActivity = result ;
			ActivityFactory.getSingleActivity(result.activityId)
			.then((resultActivity)=>{
				$scope.activity = resultActivity;
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


	$scope.completedChange = (completed) => {
		$scope.childActivity.childActivityId = $routeParams.childActivityId;
    	ChildActivityFactory.editChildActivity($scope.childActivity)
    	.then((resulted)=>{
    		$location.url(`/childProfile/${$scope.childActivity.childId}`);
    	}).catch((error)=>{
    		console.log("inputChange error",error);
    	});
    };

});