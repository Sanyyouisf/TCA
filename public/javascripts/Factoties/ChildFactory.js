app.factory("ChildFactory", function($q, $http, FIREBASE_CONFIG) {

    let postNewChild = (childData) => {
        console.log("childData in postNewChild:", childData);
        return $q((resolve, reject) => {
            $http.post(`${FIREBASE_CONFIG.databaseURL}/children.json`,
                    JSON.stringify(childData))
                .then((storeChiledSuccess) => {
                    resolve(storeChiledSuccess);
                    console.log("storeChiledSuccess in addChild", storeChiledSuccess);
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
                    console.log("resultz.data in getSingleChild:", resultz.data);
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
                    // console.log("fbChildren.data in getChildrenForParent",fbChildren.data);
                    if (childrenCollection !== null) {
                        Object.keys(childrenCollection).forEach((key) => {
                            // console.log("childrenCollection",childrenCollection);
                            childrenCollection[key].id = key;
                            selectedChildren.push(childrenCollection[key]);
                        });
                    }
                    resolve(selectedChildren);
                    console.log("selectedChildren", selectedChildren);
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
                    console.log("fbChildren", fbChildren.data);
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
                .then(() => {})
                .catch((error) => {
                    reject(error);
                    console.log("error in deletz :", error);
                });
        });
    };


    let editSingleChild = (child) => {
        console.log(child);
        console.log("inside editSingleChild in factory");
        return $q((resolve, reject) => {
            $http.put(`${FIREBASE_CONFIG.databaseURL}/children/${child.Id}.json`,
                    JSON.stringify({
                        childName:child.childName,
                        parentId:child.parentId,
                        age:child.age,
                        pic:child.pic,
                        // id:child.childId
                    }))
                .then((resultz) => {
                    resolve(resultz.data);
                    console.log("resultz.data inside editChild : ", resultz.data);
                })
                .catch((error) => {
                    reject(error);
                    console.log("error in editChild :", error);
                });
        });
    };


    return { postNewChild: postNewChild, getChildrenForParent: getChildrenForParent, getSingleChild: getSingleChild, getAllChildren: getAllChildren, deletz: deletz, editSingleChild: editSingleChild };

});
