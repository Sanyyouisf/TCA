app.controller("authCtrl", function($scope,AuthFactory,UserFactory,$location,$rootScope){
	
	$scope.alerts=[];
	$scope.auth = {
    	email:"s@s.com",
    	password:"111111"
    };


    $scope.addAlert = function() {
    $scope.alerts.push({msg: 'Another alert!'});
  };

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };

    //function to log in 
	let logMeIn = () => {
		AuthFactory.authenticate($scope.auth)
		.then((usercred) => {
    		return UserFactory.getUser(usercred.uid);
		})
		.then((user)=>{
    		$rootScope.user = user ;
    		$location.url('/parentChildLogin');
		})
		.catch((error)=>{
			$scope.alerts.push({msg: error.message});
			console.log("error in logMeIn:",error);
		});
	};


	//function to register new user 
	$scope.registerUser = () => {
		AuthFactory.registerWithEmail($scope.auth)
		.then((didRegister)=>{
			$scope.auth.uid = didRegister.uid;
			return UserFactory.addUser($scope.auth);
		})
		.then((registerComplete)=>{
    		logMeIn();
		})
		.catch((error)=>{
			$scope.alerts.push({msg:error.message});
			console.log("error in addUser:",error);
		});
	};

	
	$scope.loginUser = () => {
    	logMeIn();
    };


});