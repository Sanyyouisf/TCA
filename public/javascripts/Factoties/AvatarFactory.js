app.factory("AvatarFactory", function($q, $http, FIREBASE_CONFIG){

	//function to get all the profile pictures
	let getAllPictures = ()=>{
		let Picturez = [];
		return $q ((resolve,reject)=>{
			$http.get (`${FIREBASE_CONFIG.databaseURL}/avatars.json`)
			.then((fbPic)=>{
				let pictureCollection = fbPic.data;
				if(pictureCollection !==null ){
					Object.keys(pictureCollection).forEach((key)=>{
						pictureCollection[key].id = key;
						Picturez.push(pictureCollection[key]);
					});
				}
				resolve(Picturez);
			})
			.catch((error)=>{
				reject(error);
				console.log("error in getAllPictures :",error);
			});
		});
	};


	//function to get a single picture by passing the pic id .
	let getSinglePicture = (id) => {
		return $q ((resolve,reject)=>{
			$http.get(`${FIREBASE_CONFIG.databaseURL}/avatars/${id}.json`)
			.then((resultz)=>{
				resultz.data.id = id;
				resolve(resultz.data);
			})
			.catch((error)=>{
				reject(error);
				console.log("error in getSinglePicture :",error);
			});
		});
	};



	return{getAllPictures:getAllPictures ,getSinglePicture:getSinglePicture};

});