app.run(function(FIREBASE_CONFIG) {
    firebase.initializeApp(FIREBASE_CONFIG);
});

app.config(function($routeProvider){
	$routeProvider
	.when('/auth',{
		templateUrl:"partials/home.html",
		controller:"authCtrl"
	})
	.when('/parentChildLogin',{
		templateUrl:"partials/parentChildLogin.html",
		controller:"parentChildLoginCtrl"
	})
	.when('/parentProfile',{
		templateUrl:"partials/parentProfile.html",
		controller:"parentProfileCtr"
	})
	.when('/newChild',{
		templateUrl:"partials/newChild.html",
		controller:"newChildCtrl"
	})
	.when( '/childList',{
		templateUrl:"partials/childList.html",
		controller:"ChildListCtrl"
	})
	.when('/activityList',{
		templateUrl:"partials/activityList.html",
		controller:"activityListCtrl"
	})
	.when('/viewSingleChild/:childId',{
		templateUrl:"partials/viewSingleChild.html",
		controller:"viewSingleChildCtrl"
	})
	.when('/childLogin',{
		templateUrl:"partials/childLogin.html",
		controller:"childLoginCtrl"
	})
	.when('/childProfile/:childId',{
		templateUrl:"partials/childProfile.html",
		controller:"childActivityCtrl"
	})
	.when('/singleChildActivity',{
		templateUrl:"partials/singleChildActivity.html",
		controller:"singleChildActivityCtrl"
	})
	.otherwise('/auth');
});