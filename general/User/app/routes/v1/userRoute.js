const express = require('express');
const router = express.Router();
const userController = require('../../controllers/v1/userController');



/**
 * @route Get /user/
 * @group User operations.
 * @description Route to fetch all users
 * @returns {object} 200 - Return All Users
 * @returns {object} 204 -No Content
 * @returns {Error}  400  - Bad request
 */
router.get('/', userController.getAllUsers); 

/**
 * @route Get /user/
 * @group User operations.
 * @description Route to get user by email
 * @param {String} email  - User Email
 * @returns {object} 200 - Return All Users
 * @returns {object} 204 -No Content
 * @returns {Error}  400  - Bad request
 */
 router.get('/:email', userController.getUser);

 /**
 * @route Patch /user/
 * @group User operations.
 * @description Route to update user money by ID
 * @param {String} email  - User Email
 * @returns {object} Resource Updated(User)
 * @returns {Error}  400  - Bad request
 */
  router.patch('/:email/:money/:operation', userController.updateUserMoney); 

/**
 * @route Post /user/
 * @group User operations.
 * @description Route to add user
 * @param {object} User - User
 * @returns {object} 201 - Resource Created(User)
 * @returns {Error}  400  - Bad request
 */
 router.post('/', userController.addUser); 

/**
 * @route Post /user/authenticateUser/
 * @group User operations.
 * @description Route to authenticate user
 * @param {object} User -User
 * @returns {object} 200 - Authenticated User
 * @returns {Error}  404 - Unauthorized
 * @returns {Error}  400 - Bad request
 */
 router.post('/authenticateUser/', userController.authenticateUser);
 
 /**
 * @route Post /user/logoutUser/
 * @group User operations.
 * @description Route to logout user
 * @param {object} User -User
 * @returns {object} 200 - Logout User
 * @returns {Error}  400 - Bad request
 */
router.post('/logoutUser/', userController.logoutUser); 


module.exports = router;