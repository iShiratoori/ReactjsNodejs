const express = require('express')
const router = express.Router();
const adminRoute = require('./api/admin')

router.use('/admin', adminRoute)

router.use('/dentist', (req, res) => {
    res.status(200).json({ message: 'dentist page requested' })

})
router.use('/patient', (req, res) => {
    res.status(200).json({ message: 'patient page requested' })

})
router.use('/guest', (req, res) => {
    res.status(200).json({ message: 'guest page requested' })
})


module.exports = router