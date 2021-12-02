const utils = require('../../utils/utils')
const user = require('../../../configs/user.json')

//getAllTypesOfVehicles
exports.getAllTypesOfVehicles = async function () {
    if (user && user.hasOwnProperty('token') && user.token != null && user.hasOwnProperty('profile') && user.profile == 'admin') {
        try {
            let results = await utils.getAllTypesOfVehicles();
            if (!(results.length)) {
                return {
                    success: 204,
                    body: "There's no types of vehicles registered in our system!"
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

//getAllVehicles
exports.getAllVehicles = async function () {
    if (user && user.hasOwnProperty('token') && user.token != null && user.hasOwnProperty('profile') && user.profile == 'admin') {
        try {
            let results = await utils.getAllVehicles();
            if (!(results.length)) {
                return {
                    success: 204,
                    body: "There's no types of vehicles registered in our system!"
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