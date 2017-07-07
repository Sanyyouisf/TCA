app.controller("activityListCtrl", function ($scope, $location, AuthFactory, ActivityFactory, ChildFactory, $rootScope, AvatarFactory, ChildActivityFactory) {

    $scope.activityId = "";
    $scope.tempSelectChild = "";
    $scope.newChildActivity = {};
    $scope.dueDate = "";
    $scope.tempDueDate = "";


    let displayAllActivities = () => {
        ActivityFactory.getAllActivities()
            .then((results) => {
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
                                $scope.dueDate = x.dueDate;
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


    $scope.addChildActivity = (childId) => {
        // console.log("$scope.newChildActivity.dueDate :", $scope.newChildActivity.dueDate);
        $scope.newChildActivity.isCompleted = false;
        $scope.newChildActivity.childId = childId;
        $scope.newChildActivity.activityId = $scope.activityId;
        // console.log("$scope.newChildActivit",$scope.newChildActivity);
        ChildActivityFactory.postChildActivity($scope.newChildActivity)
            .then((response) => {
                $scope.displayAllChildren($scope.activityId);
                $location.url('/activityList');
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
