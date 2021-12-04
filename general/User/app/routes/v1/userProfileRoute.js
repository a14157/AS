const express = require('express');
const router = express.Router();
const userProfileController = require('../../controllers/v1/userProfileController');


/**
 * @route Get /userprofile/
 * @group User Profile operations.
 * @description Route to get all types of user profiles
 * @returns {object} 200 - Return All User Profiles
 * @returns {object} 204 - No Content
 * @returns {Error}  400 - Bad request
 */
router.get('/', userProfileController.getAll); 


/**
 * @route Post /userprofile/
 * @group User Profile operations.
 * @description Route to add an new type of user profile
 * @param {object} User Profile - User Profile
 * @returns {object} 201 - Resource Created(User Profile)
 * @returns {Error}  400  - Bad request
 */
router.post('/', userProfileController.addUserProfile); 


module.exports = router;