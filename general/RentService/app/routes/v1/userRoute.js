const express = require('express');
const router = express.Router();
const userController = require('../../controllers/v1/userController');
const multer = require('multer');
const configs = require('../../config/folder.config.json')

/**
 * @route Get /user/userprofiles/
 * @group User Profile operations.
 * @description Route to get all user profiles
 * @returns {object} 200 -  User Profiles
 * @returns {Error}  400 - Bad request
 */
router.get('/userprofiles/', userController.getAllUsersProfiles);

/**
 * @route Get /user/logout/
 * @group User operations.
 * @description Route to logout user
 * @param {object} User -User
 * @returns {object} 200 - Logout User
 * @returns {Error}  400 - Bad request
 */
router.get('/logout/', userController.logoutUser);

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
 * @route Post /user/adduser/
 * @group User operations.
 * @description Route to add  user
 * @param {object} User -User
 * @returns {object} 200 - User Created
 * @returns {Error}  400 - Bad request
 */
router.post('/adduser/', upload.single('photo'), userController.addUser); 

/**
 * @route Get /user/adduser/
 * @group User operations.
 * @description Route to get user
 * @param {String} email - User email
 * @returns {object} 200 -  User
 * @returns {Error}  400 - Bad request
 */
router.get('/:email', userController.getUserByEmail);

/**
 * @route Patch /user/
 * @group User operations.
 * @description Route to update user money by ID
 * @param {String} email  - User Email
 * @returns {object} Resource Updated(User)
 * @returns {Error}  400  - Bad request
 */
router.get('/:email/:money/:operation', userController.updateUserMoney);

/**
 * @route Post /user/login/
 * @group User operations.
 * @description Route to authenticate user
 * @param {object} User -User
 * @returns {object} 200 - Authenticated User
 * @returns {Error}  404 - Unauthorized
 * @returns {Error}  400 - Bad request
 */
router.post('/login/', userController.authenticateUser);

/**
 * @route Get /user/userprofiles/
 * @group User Profile operations.
 * @description Return user profile created
 * @returns {object} 201 - Added User Profiles
 * @returns {Error}  400 - Bad request
 */
 router.post('/userprofiles/', userController.createUserProfile);


module.exports = router;