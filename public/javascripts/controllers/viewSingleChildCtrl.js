app.controller("viewSingleChildCtrl", function($routeParams,$scope,AuthFactory,ChildFactory,$rootScope,$location,AvatarFactory,ChildActivityFactory,ActivityFactory){
	console.log("viewSingleChildCtrl");

	$scope.childId ={};
	$scope.activities = [];
	$scope.isCompleted = false ;

 	console.log("$routeParams.childId :",$routeParams.childId);
 	ChildFactory.getSingleChild($routeParams.childId)
    .then((result) => {
        $scope.selectedChild = result;
        // console.log("result in displayChildrenForParent",result);
        AvatarFactory.getSinglePicture($scope.selectedChild.pic)
        .then((image) => {
            // console.log("image inside forEach :",image);
            $scope.selectedChild.url = image.path;
        })
        .catch((error) => {
            console.log("error in getSinglePicture :", error);
        });

	    ChildActivityFactory.getChildActivitiesForChild($scope.selectedChild.id)
	    .then((childActivities) => {
	        let kidActivities = [];
	        // console.log("childActivities", childActivities);
	        childActivities.forEach((x) => {
	            console.log("childActivities.isCompleted :",x.isCompleted);
	            ActivityFactory.getSingleActivity(x.activityId)
	            .then((result) => {
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


 	if ($location.path() === '/logout') {
        AuthFactory.logout();
        $rootScope.user = {};
        $location.url('/auth');
    }

});