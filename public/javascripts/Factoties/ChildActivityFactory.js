app.factory("ChildActivityFactory", function($q, $http, FIREBASE_CONFIG){
	console.log(" inside ChildActivity-Factory");


	// let postChildActivity = (newChildActivity)=>{
	// 	return $q ((resolve,reject)=>{
	// 		$http.post (`${FIREBASE_CONFIG.database.URL}/childActivities.json`,JSON.stringify(newChildActivity))
	// 	});
	// }


	let getChildActivitiesForChild = (childId) => {
		let ChildActivityz = [];
		return $q ((resolve,reject)=>{
			$http.get(`${FIREBASE_CONFIG.databaseURL}/childActivities.json?orderBy="childId"&equalTo="${childId}"`)
			.then((fbChildActivities)=>{
                console.log("fbChildActivities in getChildActivitiesForChild ",fbChildActivities);
				let ChildActivityCollection = fbChildActivities.data;
                if (ChildActivityCollection !== null) {
                    Object.keys(ChildActivityCollection).forEach((key) => {
                        ChildActivityCollection[key].id = key;
                        ChildActivityz.push(ChildActivityCollection[key]);
                        });
                    }
                resolve(ChildActivityz);
                console.log("ChildActivityz in getChildActivitiesForChild ",ChildActivityz);
			})
			.catch((error)=>{
				reject(error);
				console.log("error in getChildActivitiesForChild :",error);
			});
		});
	};



	return{getChildActivitiesForChild:getChildActivitiesForChild};

});