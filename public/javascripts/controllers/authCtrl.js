app.controller("authCtrl", function($scope,AuthFactory,UserFactory,$location,$rootScope){
	
	$scope.auth = {
    	email:"s@s.com",
    	password:"111111"
    };

    //function to log in 
	let logMeIn = () => {
		AuthFactory.authenticate($scope.auth)
		.then((usercred) => {
    		return UserFactory.getUser(usercred.uid);
		},(error)=>{
			console.log("error in authenticate:",error);
		})
		.then((user)=>{
    		$rootScope.user = user ;
    		$location.url('/parentChildLogin');
		})
		.catch((error)=>{
			console.log("error in logMeIn:",error);
		});
	};


	//function to register new user 
	$scope.registerUser = () => {
		AuthFactory.registerWithEmail($scope.auth)
		.then((didRegister)=>{
			$scope.auth.uid = didRegister.uid;
			return UserFactory.addUser($scope.auth);
		},(error)=>{
			console.log("error in registerWithEmail:",error);
		})
		.then((registerComplete)=>{
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