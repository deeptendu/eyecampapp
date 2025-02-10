const express = require('express');
const router = express.Router({ mergeParams: true });
const patientSchema = require('../models/Patient');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fetchuser = require('../middleware/fetchuser')
const { stringify } = require("flatted");

router.post('/api/editpatient', [
    body('PatientName', 'Enter a valid Patient Name (Name must have more than 3 letters)').isLength({ min: 3 }).isString(),
    body('Age', 'Please Enter a valid Age').isNumeric(),
    body('Gender', 'Please Select a valid Gender').exists(),
    body('PatientNumber', 'PatientNumber is required to edit a patient').exists()
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
                {  $set: {
                    PatientName	    : req.body.PatientName,
                    Age			    : req.body.Age		 ,
                    Gender		    : req.body.Gender	 ,
                    MobileNumber	: req.body.MobileNumber,
                    AadharNumber	: req.body.AadharNumber,
                    State			: req.body.State		 ,
                    District		: req.body.District	 ,
                    FatherName	    : req.body.FatherName ,
                    HusbandName	    : req.body.HusbandName ,
                    updatedBy		: req.body.updatedBy		 
                  } }, { new: true })
            //console.log('patiner' + JSON.stringify(patient));
            res.status(200).json({ message: "Patient updated sucesfully" })
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