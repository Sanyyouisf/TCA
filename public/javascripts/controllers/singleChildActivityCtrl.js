app.controller("singleChildActivityCtrl", function($scope,ActivityFactory,ChildActivityFactory,$routeParams){

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
		console.log("completed",completed);
		$scope.childActivity.childActivityId = $routeParams.childActivityId;
		console.log("final $scope.childActivity",$scope.childActivity);
    	ChildActivityFactory.editChildActivity($scope.childActivity)
    	.then((resulted)=>{
    		console.log("resulted",resulted);
    	}).catch((error)=>{
    		console.log("inputChange error",error);
    	});
    };

});