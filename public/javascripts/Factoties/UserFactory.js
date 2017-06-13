app.factory("UserFactory", function($q, $http, FIREBASE_CONFIG){

	let addUser =(authData) => {
		return $q ((resolve,reject)=>{
			$http.post(`${FIREBASE_CONFIG.databaseURL}/parents.json`,
				JSON.stringify({
					uid:authData.uid,
					username:authData.username
				})	
			)
			.then((storeUserSuccess)=>{
				resolve(storeUserSuccess);
				// console.log("storeUserSuccess in addUser :",storeUserSuccess);
			})
			.catch((error)=>{
				resolve(error);
				console.log("error in addUser",error);
			});
		});

	};

	let getUser = (parentId) => {
		return $q((resolve,reject)=>{
      		$http.get(`${FIREBASE_CONFIG.databaseURL}/parents.json?orderBy="uid"&equalTo="${parentId}"`)
			.then((userObject) => {
				// console.log("userObject in getUser :",userObject);
				let users = [];
				Object.keys(userObject.data).forEach((key)=>{
					users.push(userObject.data[key]);
					// console.log("users array after pushing in getUser:",users);
				});
				resolve(users[0]);
				// console.log("users[0] after resolve in getUser :",users[0]);
			})
			.catch((error)=>{
				reject(error);
				console.log("error in getUser",error);
			});
		});
	};


	return{ addUser:addUser,getUser:getUser};	
});