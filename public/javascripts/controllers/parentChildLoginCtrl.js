app.controller("parentChildLoginCtrl", function($location,AuthFactory,$rootScope){

	if($location.path()==='/logout'){
		AuthFactory.logout();
		$rootScope.user={};
		$location.url('/auth');
	}

});