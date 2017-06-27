app.controller("ChildListCtrl", function($location, ChildFactory, $scope, $rootScope, AvatarFactory, ActivityFactory, ChildActivityFactory) {


    $scope.selectedchildren = [];
    $scope.activities = [];
    $scope.selectedChildActivities = [];
    $scope.newChildActivity = {};
    $scope.tempSelectChild = "";


    // displayChildrenForParent
    let displayChildData =()=>{
    ChildFactory.getChildrenForParent($rootScope.user.uid)
        .then((result) => {
            $scope.selectedchildren = result;
            //loop through the selectedchildren to get image url 
            $scope.selectedchildren.forEach((kid) => {
                $scope.childId = kid.id;
                AvatarFactory.getSinglePicture(kid.pic)
                    .then((image) => {
                        kid.url = image.path;
                    })
                    .catch((error) => {
                        console.log("error in getSinglePicture :", error);
                    });

                ChildActivityFactory.getChildActivitiesForChild(kid.id)
                    .then((childActivities) => {
                        kid.activities = [];
                        childActivities.forEach((x) => {
                            ActivityFactory.getSingleActivity(x.activityId)
                                .then((result) => {
                                    kid.activities.push(result);
                                });
                        });
                    });
            });
        })
        .catch((error) => {
            console.log("error in displayChildrenForParent: ", error);
        });

    };

    displayChildData();


    $scope.displayAllActivities = (id) => {
        $scope.tempSelectChild = id;
        $rootScope.selectedChild = id;
        console.log("$scope.tempSelectChild", $scope.tempSelectChild);
        console.log("$rootScope.selectedCild", $rootScope.selectedChild);
        ActivityFactory.getAllActivities()
            .then((results) => {
                // console.log("results", results);
                $scope.activities = results;
            })
            .catch((error) => {
                console.log("error", error);
            });
    };


    $scope.addChildActivity = (activityId) => {
        // console.log("$scope.tempSelectChild", $scope.tempSelectChild);
        // console.log("activityId insideaddChildActivity ", activityId);
        $scope.newChildActivity.isCompleted = false;
        $scope.newChildActivity.childId = $scope.tempSelectChild;
        $scope.newChildActivity.activityId = activityId;
        console.log("$scope.newChildActivity in postChildActivity:",$scope.newChildActivity);
        ChildActivityFactory.postChildActivity($scope.newChildActivity)
            .then((response) => {
                $location.url('/childList');
                displayChildData();
            })
            .catch((error) => {
                console.log("error in addChildActivity: ", error);
            });
    };

    $scope.deleteChild = (id)=>{
    	console.log("id inside the delete",id);
    	$scope.tempSelectChild = id;
    	ChildFactory.deletz($scope.tempSelectChild)
    	.then(()=>{
    		displayChildData();
    	})
    	.catch((error) => {
            console.log("error in deleteChild: ", error);
        });
    };


    if ($location.path() === '/logout') {
        AuthFactory.logout();
        $rootScope.user = {};
        $location.url('/auth');
    }

    $scope.displaySingleChild = (childId) =>{
        $location.url(`/viewSingleChild/${childId}`);
    };


});
