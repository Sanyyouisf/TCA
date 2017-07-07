app.controller("editChildCtrl", function($scope, $routeParams, $location, ChildFactory, AvatarFactory, $rootScope) {

    $scope.selectedChild = "";
    $scope.updatedChild = {};
    $scope.allPictures = [];

    ChildFactory.getSingleChild($routeParams.childId)
        .then((results) => {
            $scope.selectedChild = results;
        }).catch((error) => {
            console.log("error in Edit Address", error);
        });


    $scope.displayAllPictures = () => {
        AvatarFactory.getAllPictures()
            .then((allPicturez) => {
                $scope.allPictures = allPicturez;
            })
            .catch((error) => {
                console.log("error addNewChild :", error);
            });
    };

    $scope.updateProfilePicture = (avatarId) => {
        $scope.updatedChild.pic = avatarId;
        $scope.updatedChild.parentId = $rootScope.user.uid;
        $scope.updatedChild.id = $routeParams.childId;
    };


    $scope.updateChild = (updatedChild) => {
        $scope.updatedChild.id = $routeParams.childId;
        ChildFactory.editSingleChild($scope.updatedChild)
            .then((result) => {
                $location.url("/childList");
            }).catch((error) => {
                console.log("error in addNewAddress :", error);
            });
    };


});
