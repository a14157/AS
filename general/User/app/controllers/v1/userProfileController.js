const userProfileService = require('../../service/v1/userProfileService');
const apiTokens = require('../../config/apiTokens.json');



exports.getAll = async function (req, res) {
    if (req.headers['user-api-token'] && req.headers['user-api-token'] == apiTokens.userAPI && req.headers['rent-api-token'] && req.headers['rent-api-token'] == apiTokens.rentAPI) {
        try {
            const result = await userProfileService.getAll();
            res.status(result.success).json(result.body);
        } catch (err) {
            res.status(400).json(err);
        }
    } else {
        res.status(403).json('API token required.');
    }
};

exports.addUserProfile = async function (req, res) {
    if (req.headers['user-api-token'] && req.headers['user-api-token'] == apiTokens.userAPI && req.headers['rent-api-token'] && req.headers['rent-api-token'] == apiTokens.rentAPI) {
        try {
            let profileID = req.body.profileID;
            let nameProfile = req.body.nameProfile;
            const result = await userProfileService.addUserProfile(profileID, nameProfile);
            res.status(result.success).json(result.body);
        } catch (err) {
            res.status(400).json(err);
        }
    } else {
        res.status(403).json('API token required.');
    }
};