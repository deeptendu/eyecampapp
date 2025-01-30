const express = require('express');
const router = express.Router({ mergeParams: true });
const patientSchema = require('../models/Patient');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fetchuser = require('../middleware/fetchuser')
const { stringify } = require("flatted");

router.get('/api/findpatient/:number',  fetchuser, async (req, res) => {
    //console.log(stringify(req));
    if (req.user.email) {      
        try {
            let patient = await patientSchema.findOne({ PatientNumber: req.params.number });
            if (!patient) {
                return res.status(500).json({ error: "patient doesn't exist with this patient number " + req.params.number })
            }
            res.status(200).json(patient);
        }
        catch (error) {
            console.log('error occured' + error);
            res.status(500).json({ error: error.message });
        }
    }
    else {
        res.status(401).json({ error: 'Please login again session expired' })
    }
});

module.exports = router;