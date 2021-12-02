const userService = require('../../service/v1/userService');


exports.authenticateUser = async function (req, res) {
    try {
        let username = req.body.username;
        let password = req.body.password;
        const result = await userService.authenticateUser(username, password);
        res.status(result.success).send(result.body);
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.logoutUser = async function (req, res) {
    try {
        const result = await userService.logoutUser();
        res.status(result.success).send(result.body);
    } catch (err) {
        res.status(400).send(err);
    }
};