const express = require('express');
const router = express.Router();
const userController = require('../../controllers/v1/userController');

/**
 * @route Get /logout/
 * @group User operations.
 * @description Route to logout user
 * @param {object} User -User
 * @returns {object} 200 - Logout User
 * @returns {Error}  400 - Bad request
 */
router.get('/logout/', userController.logoutUser); 


/**
 * @route Post /login/
 * @group User operations.
 * @description Route to authenticate user
 * @param {object} User -User
 * @returns {object} 200 - Authenticated User
 * @returns {Error}  404 - Unauthorized
 * @returns {Error}  400 - Bad request
 */
router.post('/login/', userController.authenticateUser); 


module.exports = router;