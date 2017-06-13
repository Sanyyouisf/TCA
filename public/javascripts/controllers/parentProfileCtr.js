app.controller("parentProfileCtr", function($rootScope ,$location){
	// console.log(" inside parentProfile-Ctr");
	if($location.path()==='/logout'){
		AuthFactory.logout();
		$rootScope.user={};
		$location.url('/auth');
	}

});