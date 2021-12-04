const User = require('../../models/v1/User');
const UserProfile = require('../../models/v1/UserProfile');
const express = require("express");
const passport = require('passport')
var fs = require('fs');


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
exports.addUser = async function (username, userProfile, name, email, password, money, age, gender) {
    console.log(username)
    console.log(userProfile)
    console.log(name)
    console.log(email)
    console.log(password)
    console.log(money)
    console.log(age)
    console.log(gender)
    const userProfil = await UserProfile.find({
        "nameProfile": userProfile
    });

    console.log(userProfil)

    if (userProfil) {
        const user = new User()

        user.username = username;
        user.name = name;
        user.email = email;
        user.password = {
            hash: '',
            salt: ''
        };
        user.profile = userProfil[0].nameProfile;
        user.setPassword(password);
        user.money = money;
        user.age = age;
        user.gender = gender;



        try {
            let finalUser = await user.save();
            console.log(finalUser)
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
    } else {
        return {
            success: 400,
            body: "User profile not found!"
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