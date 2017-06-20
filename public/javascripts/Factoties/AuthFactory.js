app.factory("AuthFactory", function($q, $http, FIREBASE_CONFIG){

	let currentUser = null;

	//function to check if the user is authenticated or not 
	let isAuthenticated = () => {
    	return firebase.auth().currentUser ? true : false;
  	};


  	//function to register the new user with email and password
	let registerWithEmail =(user)=>{
		return $q((resolve,reject)=>{
      		firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
			.then((resultz)=>{
				resolve(resultz);
			})
			.catch((error)=>{
				reject(error);
				console.log("error in registerWithEmail :",error);
			});
		});
	};


	let authenticate =(credentials)=>{
		return $q ((resolve,reject)=>{
			firebase.auth().signInWithEmailAndPassword(credentials.email,credentials.password)
			.then((resultz)=>{
				resolve(resultz);
			})
			.catch((error)=>{
				reject(error);
				console.log("error in authenticate :",error);
			});
		});
	};


	let logout =() => {
		firebase.auth().signOut();
	};


	return{isAuthenticated:isAuthenticated, registerWithEmail:registerWithEmail ,authenticate:authenticate ,logout:logout};
});