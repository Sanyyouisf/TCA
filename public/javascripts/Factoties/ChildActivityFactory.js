app.factory("ChildActivityFactory", function($q, $http, FIREBASE_CONFIG){


	let postChildActivity = (newChildActivity)=>{
		return $q ((resolve,reject)=>{
			$http.post(`${FIREBASE_CONFIG.databaseURL}/childActivities.json`,
			JSON.stringify(newChildActivity))
			.then((fbchildActivity)=>{
				resolve(fbchildActivity);
			})
			.catch((error)=>{
				reject(error);
				console.log("error in postChildActivity :",error);
			});
		});
	};


	let getChildActivitiesForChild = (childId) => {
		let ChildActivityz = [];
		return $q ((resolve,reject)=>{
			$http.get(`${FIREBASE_CONFIG.databaseURL}/childActivities.json?orderBy="childId"&equalTo="${childId}"`)
			.then((fbChildActivities)=>{
                // console.log("fbChildActivities in getChildActivitiesForChild ",fbChildActivities);
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

	let deletz = (childActivityId) => {
        return $q((resolve, reject) => {
            $http.delete(`${FIREBASE_CONFIG.databaseURL}/childActivities/${childActivityId}.json`)
                .then(() => { 
                	resolve();
                })
                .catch((error) => {
                    reject(error);
                    console.log("error in deletz :", error);
                });
        });
    };



	return{getChildActivitiesForChild:getChildActivitiesForChild, postChildActivity:postChildActivity ,deletz:deletz};

});