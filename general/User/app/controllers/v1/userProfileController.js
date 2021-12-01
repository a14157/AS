const userProfileService = require('../../service/v1/userProfileService');

exports.getAll = async function (req, res) {
    try {
        const result = await userProfileService.getAll();
        res.status(result.success).send(result.body);
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.addTypeVehicle = async function (req, res) {
    try {
        let profileID = req.body.profileID;
        let nameProfile = req.body.nameProfile;
        const result = await userProfileService.addUserProfile(profileID, nameProfile);
        res.status(result.success).send(result.body);
    } catch (err) {
        res.status(400).send(err);
    }
};
