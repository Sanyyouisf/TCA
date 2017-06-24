app.controller("activityListCtrl", function($scope,$location, AuthFactory,ActivityFactory, ChildFactory, $rootScope, AvatarFactory, ChildActivityFactory) {
    console.log(" inside activityList-Ctrl");

    $scope.activityId ="";
    $scope.tempSelectChild ="";
    $scope.newChildActivity = {};


    let displayAllActivities = () => {
        // $scope.activityId = id;
        // console.log("$scope.activityId",$scope.activityId);
        ActivityFactory.getAllActivities()
            .then((results) => {
                console.log("results", results);
                $scope.activities = results;
            })
            .catch((error) => {
                console.log("error", error);
            });
    };

    displayAllActivities();


    $scope.displayAllChildren = (activityId) => {
        $scope.activityId = activityId;
        ChildFactory.getChildrenForParent($rootScope.user.uid)
        .then((result) => {
            $scope.selectedchildren = result;
            // console.log("$scope.selectedchildren",$scope.selectedchildren);
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


//add child activity
    $scope.addChildActivity = (childId) => {
        $scope.newChildActivity.isCompleted = false;
        $scope.newChildActivity.childId = childId;
        $scope.newChildActivity.activityId = $scope.activityId;
        ChildActivityFactory.postChildActivity($scope.newChildActivity)
        .then((response) => {
            $location.url('/activityList');
            $scope.displayAllChildren($scope.activityId);
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
