app.factory("ChildFactory", function($q, $http, FIREBASE_CONFIG, $routeParams) {

    let postNewChild = (childData) => {
        return $q((resolve, reject) => {
            $http.post(`${FIREBASE_CONFIG.databaseURL}/children.json`,
                    JSON.stringify(childData))
                .then((storeChiledSuccess) => {
                    resolve(storeChiledSuccess);
                })
                .catch((error) => {
                    reject(error);
                    console.log("error in addChild :", error);
                });
        });
    };


    let getSingleChild = (id) => {
        return $q((resolve, reject) => {
            $http.get(`${FIREBASE_CONFIG.databaseURL}/children/${id}.json`)
                .then((resultz) => {
                    resultz.data.id = id;
                    resolve(resultz.data);
                })
                .catch((error) => {
                    reject(error);
                    console.log("error in getSingleChild :", error);
                });
        });
    };



    let getChildrenForParent = (parentId) => {
        selectedChildren = [];
        return $q((resolve, reject) => {
            $http.get(`${FIREBASE_CONFIG.databaseURL}/children.json?orderBy="parentId"&equalTo="${parentId}"`)
                .then((fbChildren) => {
                    var childrenCollection = fbChildren.data;
                    if (childrenCollection !== null) {
                        Object.keys(childrenCollection).forEach((key) => {
                            childrenCollection[key].id = key;
                            selectedChildren.push(childrenCollection[key]);
                        });
                    }
                    resolve(selectedChildren);
                })
                .catch((error) => {
                    reject(error);
                    console.log("error in getAllChildren :", error);
                });
        });
    };


    let getAllChildren = () => {
        return $q((resolve, reject) => {
            $http.get(`${FIREBASE_CONFIG.databaseURL}/children.json`)
                .then((fbChildren) => {
                    resolve(fbChildren.data);
                })
                .catch((error) => {
                    reject(error);
                    console.log("error in getAllChildren :", error);
                });
        });
    };


    let deletz = (childId) => {
        return $q((resolve, reject) => {
            $http.delete(`${FIREBASE_CONFIG.databaseURL}/children/${childId}.json`)
                .then(() => {
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                    console.log("error in deletz :", error);
                });
        });
    };


    let editSingleChild = (child) => {
        console.log("child :", child);
        return $q((resolve, reject) => {
            $http.put(`${FIREBASE_CONFIG.databaseURL}/children/${child.id}.json`,
                    JSON.stringify({
                        childName: child.childName,
                        parentId: child.parentId,
                        age: child.age,
                        pic: child.pic,
                    }))
                .then((resultz) => {
                    resultz.data.id = $routeParams.childId;
                    resolve(resultz.data);
                })
                .catch((error) => {
                    reject(error);
                    console.log("error in editChild :", error);
                });
        });
    };


    return { postNewChild: postNewChild, getChildrenForParent: getChildrenForParent, getSingleChild: getSingleChild, getAllChildren: getAllChildren, deletz: deletz, editSingleChild: editSingleChild };

});
