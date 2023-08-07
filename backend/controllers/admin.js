const Patient = require('../models/patients');
const Dentist = require('../models/dentists');
const User = require('../models/users');
const Appointments = require('../models/appointments');

const { dentist } = require('./admin/dentist')
const { patient } = require('./admin/patient')
// const { user } = require('./admin/user')
const { appointment } = require('./admin/appointment')

module.exports.index = async (req, res) => {
    const dentists = await Dentist.find({});
    const users = await User.find({})
    const patients = await Patient.find({});
    const appointments = await Appointments.find({}).populate('dentist').populate('patient');
    const usersDetails = {
        unAssotiatedUsers: () => {
            let total = 0;
            users.forEach((user, i) => {
                if (!user.isAssociated) {
                    total += 1;
                }
            })
            return total;
        },
        Admins: () => {
            let total = 0;
            users.forEach((user, i) => {
                if (user.isAdmin) {
                    total += 1;
                }
            })
            return total;
        }
    }
    res.status(200).json({ dentists, users, patients, usersDetails, appointments })
}

module.exports.dentist = dentist
module.exports.patient = patient
// module.exports.user = user
module.exports.appointment = appointment