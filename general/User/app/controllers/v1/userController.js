const userService = require('../../service/v1/userService');
const passport = require('passport')
const apiTokens = require('../../config/apiTokens.json');

exports.getAllUsers = async function (req, res) {
    if (req.headers['user-api-token'] && req.headers['user-api-token'] == apiTokens.userAPI && req.headers['rent-api-token'] && req.headers['rent-api-token'] == apiTokens.rentAPI) {
        try {
            const result = await userService.getAll();
            res.status(result.success).send(result.body);
        } catch (err) {
            res.status(400).send(err);
        }
    } else {
        res.status(403).json('API token required.');
    }
};

exports.addUser = async function (req, res) {
    if (req.headers['user-api-token'] && req.headers['user-api-token'] == apiTokens.userAPI && req.headers['rent-api-token'] && req.headers['rent-api-token'] == apiTokens.rentAPI) {
        try {
            let username = req.body.username;
            let userProfile = req.body.userProfile;
            let name = req.body.name;
            let email = req.body.email;
            let password = req.body.password;
            let money = req.body.money;
            let age = req.body.age;
            let gender = req.body.gender;
            const result = await userService.addUser(username, userProfile, name, email, password, money, age, gender);
            res.status(result.success).send(result.body);
        } catch (err) {
            res.status(400).send(err);
        }
    } else {
        res.status(403).json('API token required.');
    }
};

exports.authenticateUser = (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    const allParams = username && password;
    if (!allParams) {
        return res
            .status(400)
            .json({
                "message": "All fields are required"
            })
    }
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(404).json(err)
        }
        if (user) {
            const token = user.generateJwT();
            let finalObj = {
                username: user.username,
                email: user.email,
                token: token,
                profile: user.profile
            }
            res.status(200).send(finalObj);
        } else {
            res.status(401) // não está autorizado
                .json(info)
        }
    })(req, res)
}

exports.logoutUser = (req, res) => {
    req.logout();
    res.status(200).json({
        "Message": "Logout with success!"
    });
}

exports.getUser = async function (req, res) {
    if (req.headers['user-api-token'] && req.headers['user-api-token'] == apiTokens.userAPI && req.headers['rent-api-token'] && req.headers['rent-api-token'] == apiTokens.rentAPI) {
        try {
            let email = req.params.email;
            const result = await userService.getUser(email);
            res.status(result.success).send(result.body);
        } catch (err) {
            res.status(400).send(err);
        }
    } else {
        res.status(403).json('API token required.');
    }
};

exports.updateUserMoney = async function (req, res) {
    if (req.headers['user-api-token'] && req.headers['user-api-token'] == apiTokens.userAPI && req.headers['rent-api-token'] && req.headers['rent-api-token'] == apiTokens.rentAPI) {
        try {
            let email = req.params.email;
            let operation = req.params.operation;
            let money = req.params.money;
            const result = await userService.updateUserMoney(email, money, operation);
            res.status(result.success).send(result.body);
        } catch (err) {
            res.status(400).send(err);
        }
    } else {
        res.status(403).json('API token required.');
    }
};