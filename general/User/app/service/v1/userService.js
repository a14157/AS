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

    const userProfil = await UserProfile.find({
        "nameProfile": userProfile
    });

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
exports.updateUserMoney = async function (email, money, operation) {
    try {

        const auxUser = await User.find({
            "email": email
        });

        // add logic
        // add or remove money from user
        let updatedMoney;

        
        if(operation == "add"){
            updatedMoney =  parseInt(auxUser[0].money) + parseInt(money);
        }else{
            updatedMoney =  parseInt(auxUser[0].money) - parseInt(money);
        }


        let user = await User.findOneAndUpdate({
            "email": auxUser[0].email
        }, {
            $set: {
                money:  updatedMoney
            }
        });

        const userUpdated = await User.find({
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