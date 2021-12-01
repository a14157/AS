const userService = require('../../service/v1/userService');
const passport = require('passport')


exports.getAllUsers = async function (req, res) {
    try {
        const result = await userService.getAll();
        res.status(result.success).send(result.body);
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.addUser = async function (req, res) {

    try {
        let username = req.body.username;
        let name = req.body.name;
        let email = req.body.email;
        let password = req.body.password;
        let money = req.body.money;
        let photoPath = req.file.path;
        let photoType =  req.file.mimetype;
        let photoOriginalName =  req.file.originalname;
        const result = await userService.addUser(username, name, email, password, money, photoPath, photoType, photoOriginalName);
        res.status(result.success).send(result.body);
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.authenticateUser = (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    const allParams = username && password;
    if (!allParams) {
        return res
            .status(400)
            .json({"message": "All fields are required"})
    }
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(404).json(err)
        }
        if (user) {
            const token = user.generateJwT();
            res.status(200).json({token});
        } else {
            res.status(401) // não está autorizado
                .json(info)
        }
    })(req, res)
}

exports.getUser = async function (req, res) {
    try {
        let email = req.params.email;
        console.log(email)
        const result = await userService.getUser(email);
        res.status(result.success).send(result.body);
    } catch (err) {
        res.status(400).send(err);
    }
};

