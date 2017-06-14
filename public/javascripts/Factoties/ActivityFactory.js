app.factory("ActivityFactory", function($q, $http, FIREBASE_CONFIG){
	console.log(" inside Activity-Factory");

	let getAllActivities = () => {
		let Activitiez = [];
		return $q((resolve,reject)=>{
			$http.get(`${FIREBASE_CONFIG.databaseURL}/activities.json`)
			.then((fbActivities)=>{
				let activitiesCollection = fbActivities.data;
                if (activitiesCollection !== null) {
                    Object.keys(activitiesCollection).forEach((key) => {
                        activitiesCollection[key].id = key;
                        Activitiez.push(activitiesCollection[key]);
                    });
                }
                resolve(Activitiez);
			})
			.catch((error) => {
                    reject(error);
                    console.log("error in getAllActivities:",error);
            });
		});
	};




	return {getAllActivities:getAllActivities};

});