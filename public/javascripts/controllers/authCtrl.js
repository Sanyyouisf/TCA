app.controller("authCtrl", function($scope,AuthFactory,UserFactory,$location,$rootScope){
	
	$scope.auth = {
    	email:"k@k.com",
    	password:"111111"
    };

	let logMeIn = () => {
		AuthFactory.authenticate($scope.auth)
		.then((usercred) => {
    		// console.log("usercred in logMeIn :",usercred);
    		return UserFactory.getUser(usercred.uid);
		},(error)=>{
			console.log("error in authenticate:",error);
		})
		.then((user)=>{
    		console.log("user",user);
    		$rootScope.user = user ;
      		console.log("$rootScope.user in logMeIn :",$rootScope.user);
    		$location.url('/parentChildLogin');
		})
		.catch((error)=>{
			console.log("error in logMeIn:",error);
		});
	};



	$scope.registerUser = () => {
		AuthFactory.registerWithEmail($scope.auth)
		.then((didRegister)=>{
			// console.log("didRegister in didRegister: ", didRegister);
			$scope.auth.uid = didRegister.uid;
			return UserFactory.addUser($scope.auth);
			// console.log("$scope.auth in registerUser: ", $scope.auth);
		},(error)=>{
			console.log("error in registerWithEmail:",error);
		})
		.then((registerComplete)=>{
    		// console.log("registerComplete in registerUser:",registerComplete);
    		logMeIn();
		})
		.catch((error)=>{
			console.log("error in addUser:",error);
		});
	};


	$scope.loginUser = () => {
    	logMeIn();
    };



});