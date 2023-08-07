module.exports = func => {
    return (req, res, next) => {
        func(req, res, next).catch(err => {
            if (err && err.name === 'MongoServerError' && err.code === 11000 && err.keyPattern.email) {
                err.message = 'Email is already taken';
            }
            next(err);
        });
    }
}