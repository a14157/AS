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

//get all users profiles
exports.getAllUsersProfiles = async function () {
    const user = require('../../../configs/user.json')
    if (user && user.hasOwnProperty('token') && user.token != null && user.hasOwnProperty('profile') && user.profile == 'admin') {
        try {
            let results = await utils.getAllUsersProfiles();
            if(results === 'API token required.'){
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
            success: 404,
            body: "Unauthorized"
        };
    }
}

exports.getUserByEmail = async function (email) {
    const user = require('../../../configs/user.json')
    if (user && user.hasOwnProperty('token') && user.token != null) {
        try {
            let result = await utils.getUserByEmail(email);
            if(result === 'API token required.'){
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
            success: 404,
            body: "Unauthorized"
        };
    }
}

//authenticate user
exports.authenticateUser = async function (username, password) {
    try {

        let results = await utils.checkIfUserIsAuthenticatedAndProfile(username, password);
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
                success: 204,
                body: "There's no types of vehicles registered in our system!"
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
        // criar uma nova rota na outra api para ir buscar os resultados por data
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
    const user = require('../../../configs/user.json')
    try {
        const {
            dirname
        } = require('path');
        const appDir = dirname(require.main.filename);
        let photoPath = appDir + '/userPhotos/' + photoOriginalName;

        let ageAndGender = await utils.getUserAgeAndGender(photoPath);
        ageAndGender = JSON.parse(ageAndGender);

        let results = await utils.addUser(username, userProfile, name, email, password, money, ageAndGender.gender, ageAndGender.age);
        console.log(results)
        
        if(results === 'API token required.'){
            return {
                success: 403,
                body: "API token required."
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
    try {
        let results = await utils.updateUserMoney(email, money, operation);

        if(results === 'API token required.'){
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

}