const express = require('express');
const router = express.Router();
const userController = require('../../controllers/v1/userController');
const multer = require('multer');
const configs = require('../../config/folder.config.json')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './' + configs.usersPhotoFolderName + '/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

//FILTER BY IMAGE TYPE
const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

// IMAGE LIMIT
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});


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
 * @route Post /user/
 * @group User operations.
 * @description Route to add user
 * @param {object} User - User
 * @returns {object} 201 - Resource Created(User)
 * @returns {Error}  400  - Bad request
 */
 router.post('/', upload.single('photo'), userController.addUser); 

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





module.exports = router;