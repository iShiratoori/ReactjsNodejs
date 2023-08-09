const express = require('express');
const Token = require('../../models/token');
const ExpressError = require('../../utils/expressError');
const catchAsync = require('../../utils/catchAsync');
const jwt = require('jsonwebtoken');
const admin = require('../../controllers/admin');
const { validatePatient } = require('../../utils/validations');

const router = express.Router();

router.use(catchAsync(async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    try {
        let decoteToken = jwt.verify(token, process.env.TOKEN_SECRET);
    } catch (error) {
        const message = {
            title: 'Session expired',
            text: 'You Session Expired Please Login'
        };
        throw next(new ExpressError(message, 401))
    }
    const isFoundToken = await Token.findOne({ token: token })
    if (!isFoundToken) {
        const message = {
            title: 'Please Login First',
            text: 'You are not auhenticated to access this page'
        };
        throw next(new ExpressError(message, 401))
    }
    if (isFoundToken.role !== 'admin') {
        const message = {
            title: 'Un-Authorized Access',
            text: 'You are not authorized to  access this page'
        };
        throw next(new ExpressError(message, 401))
    }
    next()
}))


router.route('/')
    .get(admin.index)

//patients
router.route('/patients')
    // .get(all patients)
    .post(validatePatient, admin.patient.register)
    .put(validatePatient, admin.patient.update)
    .delete(admin.patient.deleteP, admin.patient.all)

//dentsits
router.route('/dentists')
    .post(admin.dentist.register)
    .put(admin.dentist.update)
    .delete(admin.dentist.deleteD, admin.dentist.all)


router.route('/appointments')
    .get(admin.appointment.all) //index
    .post(admin.appointment.create) //new
    .put(admin.appointment.update) //update
    .delete(admin.appointment.deleteAppointment, admin.appointment.all) //delete
module.exports = router