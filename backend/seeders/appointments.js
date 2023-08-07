const data = require('./appointmentData')
const Appointment = require('../models/appointments')
const Patient = require('../models/patients')
const Dentist = require('../models/dentists')
const seedDB = async () => {
    for (let i = 0; i < data.length; ++i) {
        const patient = await Patient.findById(data[i].patientName)
        const dentist = await Dentist.findById(data[i].dentistName)
        const newAppointment = Appointment({
            date: data[i].date,
            time: data[i].time,
            patient: patient._id,
            dentist: dentist._id,
            status: data[i].status,
            type: data[i].type
        })
        patient.appointments.push(newAppointment);
        dentist.appointments.push(newAppointment);
        await newAppointment.save();
        await patient.save();
        await dentist.save();
    }

}

module.exports = seedDB