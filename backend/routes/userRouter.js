const express = require('express')
const router = express.Router();
const { user } = require('../controllers/user')
// const { uploadImageCloudTemporary } = require('../utils/middleware')
const { validateUser } = require('../utils/validations')
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');


router.route('/auth')
    .get(user.isAuthorized)
    .post(passport.authenticate('local'), user.login)


router.route('/auth/token').
    post(user.verifyToken)

router.route('/register')
    .post(validateUser, user.create)
router.put('/changepassword', user.changePassword);

// router.route('/verify/email')
//     .get(user.renderVerificationPage)
//     .post(user.verifyEmail)

router.route('/logout')
    .get(user.logout)

module.exports = router