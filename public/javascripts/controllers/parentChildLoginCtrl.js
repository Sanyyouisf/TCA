app.controller("parentChildLoginCtrl", function($scope,$location,AuthFactory,$rootScope){

	if($location.path()==='/logout'){
		AuthFactory.logout();
		$rootScope.user={};
		$location.url('/auth');
	}

	$scope.goToChildLoginPage=()=>{
		$location.url('/childLogin');
	};
	
	$scope.goToParentProfilePage=()=>{
		$location.url('/parentProfile');
	};

});