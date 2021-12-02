const fs = require('fs');
const utils = require('../../utils/utils')
const userInformationFilePath = "./configs/user.json";

//get all users profiles
// write to json
exports.getAllUsersProfiles = async function () {
    try {

        let results = await utils.getAllUsersProfiles();
        let data = JSON.stringify(results);

        fs.writeFile('./configs/profiles.json', data, function (err) {
            if (err) throw err;
            console.log('File is created successfully.');
        });

        console.log("File Created!")

    } catch (err) {
        console.log("File Not Created!")
    }
}

//authenticate user
exports.authenticateUser = async function (username, password) {
    try {
        // criar uma nova rota na outra api para ir buscar os resultados por data
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