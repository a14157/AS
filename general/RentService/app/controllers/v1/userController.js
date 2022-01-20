const userService = require('../../service/v1/userService');


exports.getAllUsersProfiles = async function (req, res) {
    try {
        const result = await userService.getAllUsersProfiles();
        res.status(result.success).json(result.body);
    } catch (err) {
        res.status(400).json(err);
    }
};

exports.createUserProfile = async function (req, res) {
    try {
        let profileID = req.body.profileID;
        let nameProfile = req.body.nameProfile;
        const result = await userService.createUserProfile(profileID, nameProfile);
        res.status(result.success).json(result.body);
    } catch (err) {
        res.status(400).json(err);
    }
};

exports.getUserByEmail = async function (req, res) {
    try {
        let email = req.params.email;
        const result = await userService.getUserByEmail(email);
        res.status(result.success).json(result.body);
    } catch (err) {
        res.status(400).json(err);
    }
};

exports.authenticateUser = async function (req, res) {
    try {
        let username = req.body.username;
        let password = req.body.password;
        const result = await userService.authenticateUser(username, password);
        res.status(result.success).json(result.body);
    } catch (err) {
        res.status(400).json(err);
    }
};

exports.logoutUser = async function (req, res) {
    try {
        const result = await userService.logoutUser();
        res.status(result.success).json(result.body);
    } catch (err) {
        res.status(400).json(err);
    }
};

exports.addUser = async function (req, res) {
    try {
        let username = req.body.username;
        let userProfile = req.body.userProfile;
        let name = req.body.name;
        let email = req.body.email;
        let password = req.body.password;
        let money = req.body.money;
        let photoPath = req.file.path;
        let photoType =  req.file.mimetype;
        let photoOriginalName =  req.file.originalname;

        const result = await userService.addUser(username, userProfile, name, email, password, money, photoPath, photoType, photoOriginalName);
        res.status(result.success).json(result.body);
    } catch (err) {
        res.status(400).json(err);
    }
};

exports.updateUserMoney = async function (req, res) {
    try {
        let email = req.params.email;
        let operation = req.params.operation;
        let money = req.params.money;
        const result = await userService.updateUserMoney(email, money, operation);
        res.status(result.success).json(result.body);
    } catch (err) {
        res.status(400).json(err);
    }
}; 