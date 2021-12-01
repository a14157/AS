const User = require('../../models/v1/User');
const express = require("express");
const passport = require('passport')



//get all users
exports.getAll = async function () {
    try {
        const users = await User.find();
        if (!(users.length)) {
            return {
                success: 204,
                body: "There's no users registered in our system!"
            };
        } else {
            return {
                success: 200,
                body: users
            };
        }
    } catch (err) {
        return {
            success: 400,
            body: err
        };
    }
}

//save new user
exports.addUser = async function (username, name, email, password, money) {

    const user = new User()

    user.username = username;
    user.name = name;
    user.email = email;
    user.password = {
        hash: '',
        salt: ''
    };

    user.setPassword(password);
    user.money = money;

    // api call to send user photo and return age and gender
    // For now, just static values
    user.age = 30;
    user.gender =  "Male";

    try {
        let finalUser = await user.save();
        let auxUser = user.toObject();
        let token = await user.generateJwT();
        auxUser["token"] = token;

        return {
            success: 201,
            body: auxUser
        };

    } catch (err) {
        return {
            success: 400,
            body: err
        };
    }
}

//update user mony
exports.updateUserMoney = async function (email, money) {
    try {

        let user = await Vehicle.findOneAndUpdate({
            "email": email
        }, {
            $set: {
                money: money
            }
        });

        const userUpdated = await Vehicle.find({
            "email": email
        });

        if (user) {
            return {
                success: 200,
                body: userUpdated
            };
        } else {
            return {
                success: 204,
                body: "There's no user registered in our system with that ID!"
            };
        }
    } catch (err) {
        return {
            success: 400,
            body: err
        };
    }

};

//get one user
exports.getUser = async function (email) {
    try {

        const user = await User.find({
            "email": email
        });

        if (!user.length) {
            return {
                success: 204,
                body: "There's no user registered in our system!"
            };
        } else {
            return {
                success: 200,
                body: user
            };
        }
    } catch (err) {
        return {
            success: 400,
            body: err
        };
    }
}