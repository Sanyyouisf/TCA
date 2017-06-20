app.controller("authCtrl", function($scope,AuthFactory,UserFactory,$location,$rootScope){
	
	$scope.auth = {
    	email:"d@d.com",
    	password:"111111"
    };

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