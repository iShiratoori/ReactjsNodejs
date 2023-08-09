const User = require('../models/users');
const Token = require('../models/token');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/expressError');
const { cloudinary } = require('../cloudinary');

function generateToken(payload) {
    const secretKey = process.env.TOKEN_SECRET;
    const expiresIn = '1h'; //remember here!!!!!!!!!!!
    return jwt.sign(payload, secretKey, { expiresIn });
}


const isAuthorized = (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: 'you are not aauthorized' });
    }
    const redirectUrl = `/dashboard/${req.user.getDirectory}`;
    res.status(200).json({ redirectUrl });
}

const login = catchAsync(async (req, res) => {
    const payload = { user: req.user, role: req.user.getDirectory };
    const gentoken = generateToken(payload);
    const token = new Token({ user: req.user, token: gentoken, role: req.user.getDirectory })
    await token.save()

    const user = {
        token: token.token
    }
    res.status(200).json({ user });
})

const create = catchAsync(async (req, res, next) => {
    const { email, username, password, image } = req.body.user;
    const user = new User({ email, username });

    const whereTo = cloudinary.pathTo.user.profile

    let temporaryPath = null
    if (image && image.public_id && image.url) {
        temporaryPath = image.public_id
        const result = await cloudinary.updateFolder(image.url, whereTo)
        user.image = ({
            public_id: result.public_id,
            url: result.url
        })
    } else {
        const defaultProfileImage = 'https://res.cloudinary.com/dm7zftkof/image/upload/v1686965695/dentalClinic/unknow-person_fj6car.jpg'
        await cloudinary.updateFolder(defaultProfileImage, whereTo)
            .then(async (result) => {
                // console.log('File uploaded successfully to Cloudinary:', result);
                user.image = ({
                    public_id: result.public_id,
                    url: result.url
                })
            })
            .catch((error) => {
                throw new Error('Error uploading file:', error);
            });
    }

    await User.register(user, password);
    if (temporaryPath) {
        await cloudinary.deleteFile(temporaryPath)
    }
    res.status(200).json({ message: 'successfully created your account' });
})

const changePassword = catchAsync(async (req, res, next) => {
    const { email, oldPassword, newPassword } = req.body.user
    const user = await User.findOne({ email })

    if (!user) {
        const message = {
            title: 'User Not Found',
            text: 'The email you were provided that not exist with our database'
        };
        throw next(new ExpressError(message, 404))
    }
    const isMatch = await user.authenticate(oldPassword);
    if (!isMatch.user) {
        const message = {
            title: 'Incorrect password',
            text: 'Your old password does not match',
        };
        return next(new ExpressError(message, 401))
    }
    await user.updatePassword(newPassword);
    res.status(200).json({ success: true, message: 'Your password has been changed successfully' });
})

const verifyToken = catchAsync(async (req, res, next) => {
    const { token } = req.body
    res.status(200).json({ success: true, message: 'Authorised token' })
})
const logout = (req, res, next) => {
    // req.logout(function (err) {
    //     if (err) { return next(err); }
    //     req.flash('success', 'Logout GoodBye!')
    //     res.redirect('/login')
    // });
};
module.exports.user = {
    isAuthorized,
    login,
    create,
    changePassword,
    verifyToken,
    logout
}