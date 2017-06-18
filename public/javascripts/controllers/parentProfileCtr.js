app.controller("parentProfileCtr", function($rootScope ,$location,AuthFactory){

	if($location.path()==='/logout'){
		AuthFactory.logout();
		$rootScope.user={};
		$location.url('/auth');
	}

});