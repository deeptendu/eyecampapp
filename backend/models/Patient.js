const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    PatientNumber: {
        type: Number,
        required : true,
        unique: true
    },
    PatientName: {
        type: String,
        required : true
    },
    Age: {
        type: Number,
        required : true
    },
    Gender: {
        type: String,
        required : true
    },
    MobileNumber: {
        type: String
    },
    AadharNumber: {
        type: String,
    },
    State: {
        type: String
    },
    District: {
        type: String
    },
    FatherName: {
        type: String
    },
    HusbandName: {
        type: String
    },
    createdBy: {
        type: String,
        required :true
    },
    operationDate: {
        type: String,
    },
    updatedBy:{
        type: String,
    }

})

module.exports = mongoose.model('patient', patientSchema);
