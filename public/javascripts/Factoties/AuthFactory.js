app.factory("AuthFactory", function($q, $http, FIREBASE_CONFIG){


	let registerWithEmail =(user)=>{
		return $q((resolve,reject)=>{
      		firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
			.then((resultz)=>{
				resolve(resultz);
				// console.log("resultz in registerWithEmail :",resultz);
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
				// console.log("resultz in authenticate :",resultz);
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


	return{registerWithEmail:registerWithEmail ,authenticate:authenticate ,logout:logout};
});