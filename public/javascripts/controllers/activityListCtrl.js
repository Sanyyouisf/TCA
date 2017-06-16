app.controller("activityListCtrl", function($scope,ActivityFactory){
	console.log(" inside activityList-Ctrl");


	// $scope.displayAllActivities = () => {
        ActivityFactory.getAllActivities()
            .then((results) => {
                console.log("results", results);
                $scope.activities = results;
            })
            .catch((error) => {
                console.log("error", error);
            });
    // };
});