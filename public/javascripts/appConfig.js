let isAuth = (AuthFactory) => 
	new Promise ((resolve,reject)=>{
	if (AuthFactory.isAuthenticated()){
		resolve();
	}else{
		reject();
	}	
});



app.run(function(FIREBASE_CONFIG,$rootScope,$location,AuthFactory) {
    firebase.initializeApp(FIREBASE_CONFIG);
    $rootScope.$on('$routeChangeStart', function(event, currRoute, prevRoute){
    	var logged = AuthFactory.isAuthenticated();
    	var appTo;
    	// if the path is /auth  
    	if (currRoute.originalPath) {
    		appTo = currRoute.originalPath.indexOf('/auth') !== -1;
    	}
    	//if not on /auth page AND not logged in redirect to /auth
    	if (!appTo && !logged) {
      	event.preventDefault();
      	$location.path('/auth');
    	}
    });
});

app.config(function($routeProvider){
	$routeProvider
	.when('/auth',{
		templateUrl:"partials/home.html",
		controller:"authCtrl"
	})
	.when('/parentChildLogin',{
		templateUrl:"partials/parentChildLogin.html",
		controller:"parentChildLoginCtrl",
		resolve:{isAuth}
	})
	.when('/parentProfile',{
		templateUrl:"partials/parentProfile.html",
		controller:"parentProfileCtr",
		resolve:{isAuth}
	})
	.when('/newChild',{
		templateUrl:"partials/newChild.html",
		controller:"newChildCtrl",
		resolve:{isAuth}
	})
	.when( '/childList',{
		templateUrl:"partials/childList.html",
		controller:"ChildListCtrl",
		resolve:{isAuth}
	})
	.when('/activityList',{
		templateUrl:"partials/activityList.html",
		controller:"activityListCtrl",
		resolve:{isAuth}
	})
	.when('/viewSingleChild/:childId',{
		templateUrl:"partials/viewSingleChild.html",
		controller:"viewSingleChildCtrl",
		resolve:{isAuth}
	})
	.when('/childLogin',{
		templateUrl:"partials/childLogin.html",
		controller:"childLoginCtrl",
		resolve:{isAuth}
	})
	.when('/childProfile/:childId',{
		templateUrl:"partials/childProfile.html",
		controller:"childProfileCtrl",
		resolve:{isAuth}
	})
	.when('/singleChildActivity/:childActivityId',{
		templateUrl:"partials/singleChildActivity.html",
		controller:"singleChildActivityCtrl",
		resolve:{isAuth}
	})
	.when('/editChild/:childId',{
		templateUrl:"partials/editChild.html",
		controller:"editChildCtrl",
		resolve:{isAuth}
	})
	.otherwise('/auth');
});