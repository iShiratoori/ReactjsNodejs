const Dentist = require('../../models/dentists')
const Patient = require('../../models/patients')
const ExpressError = require('../../utils/expressError');
const catchAsync = require('../../utils/catchAsync');
const { cloudinary } = require('../../cloudinary');

// const utils = ({
//     titles: ['Mr.', 'Mrs.', 'Miss', 'Ms.', 'Dr.', 'Prof.'],
//     gender: ['male', 'female', 'others']
// })

//index
const all = catchAsync(async (req, res, next) => {
    const patients = await Patient.find({});
    res.status(200).json({ patients })
});

//register patient
const register = catchAsync(async (req, res, next) => {
    const newPatient = req.body.patient;
    console.log(newPatient)
    // const whereTo = cloudinary.pathTo.patient(newPatient._id).profile
    // if (req.file) {
    //     await cloudinary.updateFolder(req.file.path, whereTo)
    //         .then((result) => {
    //             if (result.created_at) {
    //                 newPatient.image.public_id = result.public_id
    //                 newPatient.image.url = result.url
    //             } else {
    //                 const msg = ({
    //                     title: 'Error Uploading Image Cloudinary',
    //                     text: 'While Uploading Patient image there is error accured'
    //                 })
    //                 throw next(new ExpressError(msg, 404));
    //             }
    //         })
    //         .catch((error) => {
    //             console.error('Error uploading file:', error);
    //         });
    //     await cloudinary.deleteFile(req.file.filename)
    // } else {
    //     if (req.body.patient.image.url) {
    //         const { url } = req.body.patient.image
    //         await cloudinary.updateFolder(url, whereTo)
    //             .then(async (result) => {
    //                 // console.log('File uploaded successfully to Cloudinary:', result);
    //                 newPatient.image = ({
    //                     public_id: result.public_id,
    //                     url: result.url
    //                 })
    //             })
    //             .catch((error) => {
    //                 console.error('Error uploading file:', error);
    //             });
    //     } else {
    //         const unknow = 'https://res.cloudinary.com/dm7zftkof/image/upload/v1686965695/dentalClinic/unknow-person_fj6car.jpg'
    //         await cloudinary.updateFolder(unknow, whereTo)
    //             .then(async (result) => {
    //                 // console.log('File uploaded successfully to Cloudinary:', result);
    //                 newPatient.image = ({
    //                     public_id: result.public_id,
    //                     url: result.url
    //                 })
    //             })
    //             .catch((error) => {
    //                 console.error('Error uploading file:', error);
    //             });
    //     }
    // }

    // await newPatient.save();
    res.status(200).json({ message: 'New pateint successfully registered' })
});

// //update patient info
const update = catchAsync(async (req, res, next) => {
    const { patient } = req.body;
    const updatePatient = await Patient.findById(patient._id)
    if (!updatePatient) {
        const msg = ({
            title: 'Not Found Patient',
            text: `Sorry we cant the patient you are looking/try to updating please maku patient id ${patient._id} exit you database`
        })
        throw next(new ExpressError(msg, 404));
    }

    const whereTo = cloudinary.pathTo.patient(updatePatient._id).profile
    if (patient.image) {
        const temporaryPath = patient.image.public_id
        const result = await cloudinary.updateFolder(patient.image.url, whereTo)
        patient.image = ({
            public_id: result.public_id,
            url: result.url
        })
        await cloudinary.deleteFile(temporaryPath)
    }
    // else {
    //     if (req.body.patient.image) {
    //         const { url } = req.body.patient.image
    //         const result = await cloudinary.updateFolder(url, whereTo)
    //         req.body.patient.image = ({
    //             public_id: result.public_id,
    //             url: result.url
    //         })
    //     }
    // }
    await Patient.findByIdAndUpdate(patient._id, patient)
    res.status(200).json({ message: 'updated successfully patient' })
})

//delete patient 
const deleteP = catchAsync(async (req, res, next) => {
    const { patientId } = req.body;
    const patient = await Patient.findById(patientId)
    if (!patient) {
        const msg = {
            title: 'Not Found Patient',
            text: 'Sorry we cant find that Patient make your id was right'
        }
        throw next(new ExpressError(msg, 404));
    }
    await Patient.findByIdAndDelete(patientId)
    next()
})

// const linkingDentistPage = catchAsync(async (req, res, next) => {
//     const { patientId } = req.params
//     const patient = await Patient.findById(patientId)
//     if (!patient) {
//         const msg = ({
//             title: 'Not Found Patient',
//             text: 'Sorry the patient you are looking not found'
//         })

//         throw next(new ExpressError(msg, 404));
//     }
//     if (patient.dentist) {
//         const msg = ({
//             title: 'Already Linked',
//             text: 'Sorry Already Linkd this patient to a dentist'
//         })
//         throw next(new ExpressError(msg, 404));

//     }
//     res.render('dashboard/admin/patients/lintodentist', { patient })
// });
// const linkToDentist = catchAsync(async (req, res, next) => {
//     const { patientId, } = req.params;
//     const { dentistId } = req.body.dentist;
//     const dentist = await Dentist.findById(dentistId)
//     if (!dentist) {
//         const msg = ({
//             title: 'Not Found dentist',
//             text: `Sorry we cant the dentist you are looking/try to updating please maku patient id ${dentistId} exit you database`
//         })
//         throw next(new ExpressError(msg, 400));
//     }
//     const patient = await Patient.findByIdAndUpdate(patientId, { dentist: dentist })
//     dentist.patients.push(patient)
//     await dentist.save()
//     res.redirect(`/admin/dashboard/patients/${patientId}`)
// })

module.exports.patient = {
    all,
    register,
    update,
    deleteP,
    // linkingDentistPage,
    // linkToDentist,
}