const Patient = require('../../models/patients');
const Dentist = require('../../models/dentists')
const Appointment = require('../../models/appointments')
const ExpressError = require('../../utils/expressError');
const catchAsync = require('../../utils/catchAsync');

//index
const all = catchAsync(async (req, res, next) => {
    const appointments = await Appointment.find({}).populate('patient').populate('dentist')
    res.status(200).json({ message: 'Appointmetn Index' })
});

//create appointment
const create = catchAsync(async (req, res, next) => {
    const { appointment } = req.body;
    const patient = await Patient.findByName(appointment.patient.name)
    const dentist = await Dentist.findByName(appointment.dentist.name)
    if (!patient) {
        throw next(new ExpressError('NOT FOUND PAITENT'));
    } if (!dentist) {
        throw next(new ExpressError('NOT FOUND DENTIST'));
    }
    const newAppointment = Appointment({
        date: appointment.date,
        time: appointment.time,
        patient: patient._id,
        dentist: dentist._id,
        status: appointment.status,
        type: appointment.type
    })
    patient.appointments.push(newAppointment);
    dentist.appointments.push(newAppointment);
    await newAppointment.save();
    await patient.save();
    await dentist.save();
    res.status(200).json({ message: 'Creating Appointment' })
})

//update appointment
const update = catchAsync(async (req, res, next) => {
    const { appointmentId } = req.params;
    const { appointment } = req.body;
    const patient = await Patient.findByName(appointment.patient.name)
    const dentist = await Dentist.findByName(appointment.dentist.name)

    if (!patient) {
        throw next(new ExpressError('NOT FOUND PAITENT'));
    } if (!dentist) {
        throw next(new ExpressError('NOT FOUND DENTIST'));
    }
    await Appointment.findByIdAndUpdate(appointmentId, {
        date: appointment.date,
        time: appointment.time,
        patient: patient._id,
        dentist: dentist._id,
        status: appointment.status,
        type: appointment.type
    })
    res.status(200).json({ message: 'Updating Appointment' })
});

//delete appointment
const deleteAppointment = catchAsync(async (req, res, next) => {
    const { appointmentId } = req.body;
    const app = await Appointment.findByIdAndDelete(appointmentId).populate('patient').populate('dentist')
    if (!app) {
        const msg = {
            title: 'NOT FOUND APPOINTMENT',
            text: 'Sorry we cant find that appointment'
        }
        throw next(new ExpressError(msg, 404));
    }
    await Patient.findByIdAndUpdate(
        app.patient._id,
        { $pull: { appointments: { $in: app._id } } }
    );
    await Dentist.findByIdAndUpdate(
        app.dentist._id,
        { $pull: { appointments: { $in: app._id } } }
    );
    res.status(200).json({ message: 'Deleting Appointment' })
})


module.exports.appointment = {
    all,
    create,
    update,
    deleteAppointment,
}