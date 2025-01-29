const express = require('express');
const router = express.Router({ mergeParams: true });
const patientSchema = require('../models/Patient');
const patientCounterSchema = require('../models/PatientCounter');

const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fetchuser = require('../middleware/fetchuser')
const { stringify } = require("flatted");

const getNextSequenceValue = async () => {
    let result = await patientCounterSchema.find().limit(1);
    //console.log('resulttt'+JSON.stringify(result))
    if (!result || result.length<0) {
        result=await patientCounterSchema.create({
            sequenceValue:1
        })
        //console.log('ressssulttt'+JSON.stringify(result))
        return result.sequenceValue;
    }

    result = await patientCounterSchema.findOneAndUpdate(
        { _id: result[0]._id }, // Find the counter document
        { $inc: { sequenceValue: 1 } }, // Increment the sequence_value
        { returnDocument: "after", upsert: true }// Return the updated document
    );
    return result.sequenceValue;
}

router.post('/api/createpatient', [
    body('PatientName', 'Enter a valid Patient Name').isLength({ min: 3 }),
    body('Age', 'Please Enter a valid Age').exists(),
    body('Gender', 'Please Enter a valid Gender').exists(),
    body('AadharNumber', 'Please Enter a valid AadharNumber').exists()
], fetchuser, async (req, res) => {
    //console.log(stringify(req));
    if (req.user.email === req.body.email) {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() });
        }
        const patientNumber=await getNextSequenceValue();
        let patient = await patientSchema.findOne({ PatientNumber: patientNumber });
        if (patient) {
            return res.status(400).json({ error: "patient already exist with this patient number " + patientNumber })
        }
        try {
            patient = await patientSchema.create({
                PatientNumber: patientNumber,
                PatientName: req.body.PatientName,
                Age: req.body.Age,
                Gender: req.body.Gender,
                MobileNumber: req.body.MobileNumber,
                AadharNumber: req.body.AadharNumber,
                State: req.body.State,
                District: req.body.District,
                FatherName: req.body.FatherName,
                HusbandName: req.body.HusbandName,
                createdBy: req.body.email,
            })
            res.json({
                message: "Patient created sucesfully",
                PatientNumber: patient.PatientNumber
            })
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