app.factory("ChildFactory", function($q, $http, FIREBASE_CONFIG){

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


	let getChildrenForParent=(parentId)=>{
		selectedChildren=[];
		return $q ((resolve,reject)=>{
			$http.get(`${FIREBASE_CONFIG.databaseURL}/children.json?orderBy="parentId"&equalTo="${parentId}"`)
			.then((fbChildren)=>{
				var childrenCollection = fbChildren.data;
				// console.log("fbChildren.data in getChildrenForParent",fbChildren.data);
                if (childrenCollection !== null) {
                Object.keys(childrenCollection).forEach((key)=> {
					// console.log("childrenCollection",childrenCollection);
                    childrenCollection[key].id = key;
                    selectedChildren.push(childrenCollection[key]); 
                    });
			}
			resolve(selectedChildren);
			console.log("selectedChildren",selectedChildren);
		})
			.catch((error)=>{
				reject(error);
				console.log("error in getAllChildren :",error);
			});
		});
	};


	// let editChild = () => {
		
	// };

	return{postNewChild:postNewChild , getChildrenForParent:getChildrenForParent};

});