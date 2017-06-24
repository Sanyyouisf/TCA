app.controller("viewSingleChildCtrl", function($routeParams,$scope,AuthFactory,ChildFactory,$rootScope,$location,AvatarFactory,ChildActivityFactory,ActivityFactory){
	console.log("viewSingleChildCtrl");

	$scope.childId ={};
	$scope.activities = [];
	$scope.isCompleted = false ;
	$scope.activityId = "";
	$scope.childActivities =[];

	let displaySingleChildData = () =>{
	 	console.log("$routeParams.childId :",$routeParams.childId);
	 	ChildFactory.getSingleChild($routeParams.childId)
	    .then((result) => {
	        $scope.selectedChild = result;
	        console.log("$scope.selectedChild",$scope.selectedChild);
	        AvatarFactory.getSinglePicture($scope.selectedChild.pic)
	        .then((image) => {
	            $scope.selectedChild.url = image.path;
	        })
	        .catch((error) => {
	            console.log("error in getSinglePicture :", error);
	        });

		    ChildActivityFactory.getChildActivitiesForChild($scope.selectedChild.id)
		    .then((childActivities) => {
		        let kidActivities = [];
		        $scope.childActivities = childActivities;
		        childActivities.forEach((x) => {
		            ActivityFactory.getSingleActivity(x.activityId)
		            .then((result) => {
		            	result.childActivityId = x.id;
		                result.isCompleted = x.isCompleted;
		                kidActivities.push(result);
		            });
		        });
		        console.log("kidActivities",kidActivities);
		        $scope.activities = kidActivities;
		    });
	    })
	    .catch((error) => {
	        console.log("error in displayChildrenForParent: ", error);
	    });
	};


	displaySingleChildData();


    $scope.deleteChildActivity = (childActivityId) =>{
    	ChildActivityFactory.deletz(childActivityId)
    	.then(()=>{
    		displaySingleChildData();
    	})
    	.catch((error)=>{
    		console.log("error in deleteChildActivity ",error);
    	});
    };	


 	if ($location.path() === '/logout') {
        AuthFactory.logout();
        $rootScope.user = {};
        $location.url('/auth');
    }

});