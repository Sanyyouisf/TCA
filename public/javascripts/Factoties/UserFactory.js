app.factory("UserFactory", function($q, $http, FIREBASE_CONFIG){

	let addUser =(authData) => {
		return $q ((resolve,reject)=>{
			$http.post(`${FIREBASE_CONFIG.databaseURL}/parents.json`,
				JSON.stringify({
					uid:authData.uid,
					pName:authData.pName
				})	
			)
			.then((storeUserSuccess)=>{
				resolve(storeUserSuccess);
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
				let users = [];
				Object.keys(userObject.data).forEach((key)=>{
					users.push(userObject.data[key]);
				});
				resolve(users[0]);
			})
			.catch((error)=>{
				reject(error);
				console.log("error in getUser",error);
			});
		});
	};


	return{ addUser:addUser,getUser:getUser};	
});