const Dentist = require('../../models/dentists')
const Patient = require('../../models/patients')
const ExpressError = require('../../utils/expressError');
const catchAsync = require('../../utils/catchAsync');
const { cloudinary } = require('../../cloudinary');

//index
const all = catchAsync(async (req, res, next) => {
    const dentists = await Dentist.find({});
    res.status(200).json({ dentists })
});
const register = catchAsync(async (req, res, next) => {
    const { newDentist } = req.body;
    console.log(newDentist)
    // const whereTo = cloudinary.pathTo.dentist(dentist._id).profile
    // if (req.file) {

    //     await cloudinary.updateFolder(req.file.path, whereTo)
    //         .then((result) => {
    //             if (result.created_at) {
    //                 dentist.image.public_id = result.public_id
    //                 dentist.image.url = result.url
    //             } else {
    //                 const msg = ({
    //                     title: 'Error Uploading Image Cloudinary',
    //                     text: 'While Uploading Dentist image there is error accured'
    //                 })
    //                 throw next(new ExpressError(msg, 404));
    //             }
    //         })
    //         .catch((error) => {
    //             console.error('Error uploading file:', error);
    //         });

    //     await cloudinary.deleteFile(req.file.filename)
    // } else {
    //     if (req.body.dentist.image.url) {
    //         const { url } = req.body.dentist.image
    //         await cloudinary.updateFolder(url, whereTo)
    //             .then(async (result) => {
    //                 // console.log('File uploaded successfully to Cloudinary:', result);
    //                 dentist.image = ({
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
    //                 dentist.image = ({
    //                     public_id: result.public_id,
    //                     url: result.url
    //                 })
    //             })
    //             .catch((error) => {
    //                 console.error('Error uploading file:', error);
    //             });
    //     }
    // }
    // await dentist.save();
    res.status(200).json({ message: 'registered successfully dentist' })
})


//updating dentist info
const update = catchAsync(async (req, res, next) => {
    const { dentist } = req.body;
    console.log(dentist)
    // const dentist = await Dentist.findById(dentistId)

    // if (!dentist) {
    //     const msg = ({
    //         title: 'Not Found dentist',
    //         text: `Sorry we cant the dentist you are looking/try to updating please maku patient id ${dentistId} exit you database`
    //     })
    //     throw next(new ExpressError(msg, 404));
    // }


    // const whereTo = cloudinary.pathTo.dentist(dentist._id).profile
    // if (req.file) {
    //     const result = await cloudinary.updateFolder(req.file.path, whereTo)
    //     req.body.dentist.image = ({
    //         public_id: result.public_id,
    //         url: result.url
    //     })

    //     // console.log(req.file.filename)
    //     await cloudinary.deleteFile(req.file.filename)
    // } else {
    //     if (req.body.dentist.image) {
    //         const { url } = req.body.dentist.image
    //         const result = await cloudinary.updateFolder(url, whereTo)
    //         req.body.dentist.image = ({
    //             public_id: result.public_id,
    //             url: result.url
    //         })

    //     }
    // }
    // await Dentist.findByIdAndUpdate(dentistId, req.body.dentist);
    res.status(200).json({ message: 'updated successfully dentist' })
})

// delete dentist
const deleteD = catchAsync(async (req, res, next) => {
    const { dentistId } = req.body;
    const findDentist = await Dentist.findById(dentistId)
    if (!findDentist) {
        const msg = {
            title: 'Not Found Dentist',
            text: 'Sorry we cant find that Dentist make your id was right'
        }
        throw next(new ExpressError(msg, 404));
    }

    const dentist = await Dentist.findByIdAndDelete(dentistId).populate('patients');
    if (dentist.patients) {
        for (const patient of dentist.patients) {
            await Patient.findByIdAndUpdate(patient._id, { dentist: null });
        }
    }
    next()
})

module.exports.dentist = {
    all,
    register,
    update,
    deleteD,
}