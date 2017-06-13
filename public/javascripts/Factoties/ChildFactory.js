app.factory("ChildFactory", function($q, $http, FIREBASE_CONFIG){
	console.log(" inside Child-Factory");

	// let addChild =(childData , parentId) => {
	// 	return $q ((resolve,reject) => {
	// 		$http.post(`${FIREBASE_CONFIG.databaseURL}/children.json?orderBy="uid"&equalTo="${userId}"`,
	// 			JSON.stringify({
	// 				parentId:childData.parentId,
	// 				childName:childData.childName,
	// 				age:childData.age,
	// 				pic:childData.pic
	// 			})
	// 		)
	// 		.then((storeChiledSuccess)=>{
	// 			resolve(storeChiledSuccess);
	// 			console.log("storeChiledSuccess in addChild",storeChiledSuccess);
	// 		})
	// 		.catch((error)=>{
	// 			reject(error);
	// 			console.log("error in addChild :",error);
	// 		});
	// 	});
	// };


	let postNewChild =(childData) => {
		console.log("childData in postNewChild:",childData);
		return $q ((resolve,reject) => {
			$http.post(`${FIREBASE_CONFIG.databaseURL}/children.json`,
				JSON.stringify(childData))
			.then((storeChiledSuccess)=>{
				resolve(storeChiledSuccess);
				console.log("storeChiledSuccess in addChild",storeChiledSuccess);
			})
			.catch((error)=>{
				reject(error);
				console.log("error in addChild :",error);
			});
		});
	};

	return{postNewChild:postNewChild};

});