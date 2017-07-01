app.controller("childLoginCtrl", function($scope, ChildFactory, AvatarFactory, $rootScope,$location) {


    $scope.selectedchildren = [];
    $scope.childId = [];

    let displayChildData = () => {
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
                });
            })
            .catch((error) => {
                console.log("error in displayChildrenForParent: ", error);
            });
    };

    displayChildData();


    $scope.goToProfile = (childId) => {
        $location.url(`/childProfile/${childId}`);
    };


});
