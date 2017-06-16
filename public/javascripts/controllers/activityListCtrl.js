app.controller("activityListCtrl", function($scope, ActivityFactory, ChildFactory, $rootScope, AvatarFactory, ChildActivityFactory) {
    console.log(" inside activityList-Ctrl");


    let displayAllActivities = () => {
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

    $scope.displayAllChildren = (id) => {
        console.log("id in displayAllChildren ", id);
        $scope.activityId = id;

        ChildFactory.getChildrenForParent($rootScope.user.uid)
            .then((result) => {
                $scope.selectedchildren = result;
                console.log("$scope.selectedchildren",$scope.selectedchildren);
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




});
