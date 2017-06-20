app.controller("singleChildActivityCtrl", function($scope,ActivityFactory,ChildActivityFactory,$routeParams){

	$scope.childActivityId = "";
	$scope.activity={};
	$scope.childActivity ={};

	let displayChildActivity =()=>{
		ChildActivityFactory.getSingleChildActivity($routeParams.childActivityId)
		.then((result)=>{
			// console.log("tvhe result ChildActivity",result);
			$scope.childActivity = result ;
			// console.log("$scope.childActivity",$scope.childActivity);
			ActivityFactory.getSingleActivity(result.activityId)
			.then((resultActivity)=>{
				// console.log("resultActivity",resultActivity);
				$scope.activity = resultActivity;
				// console.log("$scope.activity",$scope.activity);
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