const ExpressError = require('./expressError')
const { userSchema, patientSchema } = require('./Schema');

module.exports.validateUser = (req, res, next) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
        const msg = ({
            title: 'Back end Validator Error',
            text: error.details.map(el => el.message).join(',')
        })
        // const [url, queryParams] = req.originalUrl.split('?');
        // const method = req.method;
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.validatePatient = (req, res, next) => {
    const { error } = patientSchema.validate(req.body);
    if (error) {
        const msg = ({
            title: 'Back end Validator Error',
            text: error.details.map(el => el.message).join(',')
        })
        // const [url, queryParams] = req.originalUrl.split('?');
        // const method = req.method;
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}