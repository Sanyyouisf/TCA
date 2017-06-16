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
            // console.log("result in displayChildrenForParent",result);

            //loop through the selectedchildren to get image url 
            $scope.selectedchildren.forEach((kid) => {
                // console.log("kid inside forEach :",kid);
                // console.log("kid.id inside forEach :",kid.id);
                $scope.childId = kid.id;
                AvatarFactory.getSinglePicture(kid.pic)
                    .then((image) => {
                        // console.log("image inside forEach :",image);
                        kid.url = image.path;
                        // console.log("kid.path",kid.url);
                        // console.log("image.path",image.path);
                    })
                    .catch((error) => {
                        console.log("error in getSinglePicture :", error);
                    });

                ChildActivityFactory.getChildActivitiesForChild(kid.id)
                    .then((childActivities) => {
                        kid.activities = [];
                        console.log("childActivities", childActivities);
                        childActivities.forEach((x) => {
                            ActivityFactory.getSingleActivity(x.activityId)
                                .then((result) => {
                                    console.log("result", result);
                                    console.log("kid.childName", kid.childName);
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
        console.log("scope.tempSelectChild", $scope.tempSelectChild);
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
        console.log("$scope.tempSelectChild", $scope.tempSelectChild);
        console.log("activityId insideaddChildActivity ", activityId);
        $scope.newChildActivity.isCompleted = false;
        $scope.newChildActivity.childId = $scope.tempSelectChild;
        $scope.newChildActivity.activityId = activityId;
        console.log("$scope.newChildActivity :", $scope.newChildActivity);
        ChildActivityFactory.postChildActivity($scope.newChildActivity)
            .then((response) => {
                $location.url('/childList');
                displayChildData();
            })
            .catch((error) => {
                console.log("error in addChildActivity: ", error);
            });
    };


    if ($location.path() === '/logout') {
        AuthFactory.logout();
        $rootScope.user = {};
        $location.url('/auth');
    }


});
