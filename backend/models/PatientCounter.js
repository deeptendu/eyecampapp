const mongoose = require('mongoose');

const patientCounterSchema = new mongoose.Schema({
    sequenceValue: {
        type: Number,
        required : true,
        unique: true
    }
})

module.exports = mongoose.model('patientCounter', patientCounterSchema);
