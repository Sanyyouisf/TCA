app.factory("ChildFactory", function($q, $http, FIREBASE_CONFIG){

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


	let getSingleChild = (childId) => {
        return $q((resolve, reject) => {
            $http.get(`${FIREBASE_CONFIG.databaseURL}/children/${childId}.json`)
                .then((resultz) => {
                    resultz.data.id = id;
                    console.log("id in getSingleChile",id);
                    resolve(resultz);

                })
                .catch((error)=>{
				reject(error);
				console.log("error in getSingleChild :",error);
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



	return{postNewChild:postNewChild , getChildrenForParent:getChildrenForParent , getSingleChild:getSingleChild};

});