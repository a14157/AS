const UserProfile = require('../../models/v1/UserProfile');
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

//get all profiles
exports.getAll = async function () {
    try {
        const userProfiles = await UserProfile.find();
        if (!(userProfiles.length)) {
            return {
                success: 204,
                body: "There's no user profiles registered in our system!"
            };
        } else {
            return {
                success: 200,
                body: userProfiles
            };
        }
    } catch (err) {
        return {
            success: 400,
            body: err
        };
    }
}

//save new type Vehicle
exports.addUserProfile = async function (profileID, nameProfile) {
    
    const userProfile = new UserProfile({
        profileID : profileID,
        nameProfile : nameProfile,
    });

    console.log(userProfile)

    try {
        const finalUserProfile = await userProfile.save();

        return { success: 201, body: finalUserProfile };

    } catch (err) {
        return { success: 400, body: err };
    }
}