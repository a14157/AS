const fs = require('fs');
const utils = require('../../utils/utils')
const userInformationFilePath = "./configs/user.json";

//get all users profiles
exports.writeAllUsersProfiles = async function () {
    try {
        let results = await utils.getAllUsersProfiles();
        let data = JSON.stringify(results);
        // write to json
        fs.writeFile('./configs/profiles.json', data, function (err) {
            if (err) throw err;
            console.log('File is created successfully.');
        });

        console.log("File Created!")

    } catch (err) {
        console.log("File Not Created!")
    }

}

//create new user profile
exports.createUserProfile = async function (profileID, nameProfile) {
    let user = require('../../../configs/user.json')
    let checkToken = await utils.verifyUserToken();
    if (checkToken.hasOwnProperty('auth') && checkToken.auth === true) {
        if (user && user.hasOwnProperty('token') && user.token != null && user.hasOwnProperty('profile') && user.profile == 'admin') {
            try {
                let results = await utils.createUserProfile(profileID, nameProfile);
                if (results === 'API token required.') {
                    return {
                        success: 403,
                        body: "API token required." 
                    };
                }
                if (!results) {
                    return {
                        success: 404,
                        body: "Unable to create a new user profile in our system!"
                    };
                } else {
                    return {
                        success: 201,
                        body: results 
                    };
                }
            } catch (err) {
                return {
                    success: 400,
                    body: err
                };
            }
        } else {
            return {
                success: 403,
                body: "Unauthorized"
            };
        }
    } else {
        return {
            success: 403,
            body: "Unauthorized"
        };
    }
}

//get all users profiles
exports.getAllUsersProfiles = async function () {
    let user = require('../../../configs/user.json')
    let checkToken = await utils.verifyUserToken();
    if (checkToken.hasOwnProperty('auth') && checkToken.auth === true) {
        if (user && user.hasOwnProperty('token') && user.token != null && user.hasOwnProperty('profile') && user.profile == 'admin') {
            try {
                let results = await utils.getAllUsersProfiles();
                if (results === 'API token required.') {
                    return {
                        success: 403,
                        body: "API token required." 
                    };
                }
                if (!results) {
                    return {
                        success: 204,
                        body: "There's no user profiles registered in our system!"
                    };
                } else {
                    return {
                        success: 200,
                        body: results 
                    };
                }
            } catch (err) {
                return {
                    success: 400,
                    body: err
                };
            }
        } else {
            return {
                success: 403,
                body: "Unauthorized"
            };
        }
    } else {
        return {
            success: 403,
            body: "Unauthorized"
        };
    }
}

exports.getUserByEmail = async function (email) {
    let user = require('../../../configs/user.json')
    console.log(user)
    let checkToken = await utils.verifyUserToken();
    console.log(checkToken)
    if (checkToken.hasOwnProperty('auth') && checkToken.auth === true) {
        console.log("passou primeiro if")
        if (user && user.hasOwnProperty('token') && user.token != null) {
            console.log("passou segundo if")
            try {
                let result = await utils.getUserByEmail(email);
                if (result === 'API token required.') {
                    return {
                        success: 403,
                        body: "API token required."
                    };
                }
                if (!(result.length)) {
                    return {
                        success: 204,
                        body: "There's no user registered in our system!"
                    };
                } else {
                    return {
                        success: 200,
                        body: result
                    };
                }
            } catch (err) {
                return {
                    success: 400,
                    body: err
                };
            }
        } else {
            return {
                success: 403,
                body: "Unauthorized"
            };
        }
    } else {
        return {
            success: 403,
            body: "Unauthorized"
        };
    }
}

//authenticate user
exports.authenticateUser = async function (username, password) {
    try {
        let results = await utils.checkIfUserIsAuthenticatedAndProfile(username, password);
        if(results.message){
            return {
                success: 404,
                body: "Error on authenticate user!"
            };
        }
        if (results) {
            let auxResults = JSON.stringify(results)
            let rightFile = await fs.writeFileSync(userInformationFilePath, auxResults, function (err) {
                if (err) throw err;
                console.log('File is created successfully.');
            });
            return {
                success: 200,
                body: results
            };
        } else {
            return {
                success: 404,
                body: "Error on authenticate user!"
            };
        }
    } catch (err) {
        return {
            success: 400,
            body: err
        };
    }
}

//logout user
exports.logoutUser = async function () {
    try {
        let results = await utils.logoutUser();
        fs.unlinkSync(userInformationFilePath);
        return {
            success: 200,
            body: "Success"
        };
    } catch (err) {
        return {
            success: 400,
            body: err
        };
    }
}

//save new user
exports.addUser = async function (username, userProfile, name, email, password, money, photoPath, photoType, photoOriginalName) {
    let user = require('../../../configs/user.json')
    try {
        const {
            dirname
        } = require('path');
        const appDir = dirname(require.main.filename);
        let photoPath = appDir + '/userPhotos/' + photoOriginalName;

        if (fs.existsSync(photoPath)) {
            console.log('exists') 
        }

        let ageAndGender = await utils.getUserAgeAndGender(photoPath);

        if(ageAndGender == null){
            return {
                success: 404,
                body: "Gender API is down."
            };
        }

        ageAndGender = JSON.parse(ageAndGender);
        if (ageAndGender.Error === 'API token required.') {
            return {
                success: 403,
                body: "API token required."
            };
        }

        let results = await utils.addUser(username, userProfile, name, email, password, money, ageAndGender.gender, ageAndGender.age);

        if (results === 'API token required.') {
            return {
                success: 403,
                body: "API token required."
            };
        }

        if(results['code']){
            return {
                success: 404,
                body: "User not created: some value already exists."
            };
        }

        if (!results) {
            return {
                success: 404,
                body: "User not created!"
            };
        } else {
            return {
                success: 201,
                body: results
            };
        }
    } catch (err) {
        return {
            success: 400,
            body: err
        };
    }

}

//update  user money
exports.updateUserMoney = async function (email, money, operation) {
    let checkToken = await utils.verifyUserToken();
    if (checkToken.hasOwnProperty('auth') && checkToken.auth === true) {
        try {
            let results = await utils.updateUserMoney(email, money, operation);

            if (results === 'API token required.') {
                return {
                    success: 403,
                    body: "API token required."
                };
            }

            if (!results) {
                return {
                    success: 404,
                    body: "There's no users with that email registered in our system!"
                };
            } else {
                return {
                    success: 201,
                    body: results
                };
            }
        } catch (err) {
            return {
                success: 400,
                body: err
            };
        }
    } else {
        return {
            success: 403,
            body: "Unauthorized"
        };
    }
}