app.controller("singleChildActivityCtrl", function($scope,ActivityFactory,ChildActivityFactory,$routeParams,$location,ChildFactory,AvatarFactory){

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
				//to get the child name and avatat pic
				ChildFactory.getSingleChild($scope.childActivity.childId)
	    		.then((result) => {
	        		$scope.selectedChild = result;
	        		AvatarFactory.getSinglePicture($scope.selectedChild.pic)
	        		.then((image) => {
	            		$scope.selectedChild.url = image.path;
	        		});
	        	});
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