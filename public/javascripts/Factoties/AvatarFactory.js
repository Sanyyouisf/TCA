app.factory("AvatarFactory", function($q, $http, FIREBASE_CONFIG){

	let getAllPictures = ()=>{
		let Picturez = [];
		return $q ((resolve,reject)=>{
			$http.get (`${FIREBASE_CONFIG.databaseURL}/avatars.json`)
			.then((fbPic)=>{
				// console.log("fbPic in getAllPictures:",fbPic);
				let pictureCollection = fbPic.data;
				if(pictureCollection !==null ){
					Object.keys(pictureCollection).forEach((key)=>{
						pictureCollection[key].id = key;
						Picturez.push(pictureCollection[key]);
					});
				}
				resolve(Picturez);
				// console.log("resolved Picturez in getAllPictures:",Picturez);
			})
			.catch((error)=>{
				reject(error);
				console.log("error in getAllPictures :",error);
			});
		});
	};


	let getSinglePicture = (id) => {
		// console.log("inside getSinglePicture ");
		return $q ((resolve,reject)=>{
			$http.get(`${FIREBASE_CONFIG.databaseURL}/avatars/${id}.json`)
			.then((resultz)=>{
				resultz.data.id = id;
				resolve(resultz.data);
				// console.log("id in getSinglePicture",id);
                // console.log(" resolved resultz.data in getSinglePicture",resultz.data);
			})
			.catch((error)=>{
				reject(error);
				console.log("error in getSinglePicture :",error);
			});
		});
	};



	return{getAllPictures:getAllPictures ,getSinglePicture:getSinglePicture};

});