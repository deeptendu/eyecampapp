const express = require('express');
const router = express.Router({ mergeParams: true });
const patientSchema = require('../models/Patient');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fetchuser = require('../middleware/fetchuser')
const { stringify } = require("flatted");

router.post('/api/updatepatient', [
    body('operationDate', 'Enter a valid operation date').exists(),
    body('PatientNumber', 'Enter a valid operation date').exists(),


], fetchuser, async (req, res) => {
    //console.log(stringify(req));
    if (req.user.email === req.body.email) {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() });
        }
        //console.log("pathe" + req.body.PatientNumber)
        try {

            patient = await patientSchema.updateOne({ PatientNumber:req.body.PatientNumber }, 
                {  $set: {operationDate: req.body.operationDate} }, { new: true })
            //console.log('patiner' + JSON.stringify(patient));
            res.json({ message: "Patient updated sucesfully" })
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