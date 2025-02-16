const mongoose = require('mongoose');

const unitSchema = new mongoose.Schema({
    type: { type: String, required: true }, 
    symbol: { type: String, required: true },
    formalName: { type: String, required: true },
    unitQualityCode: { type: String, required: true },
    decimalPlaces: { type: Number, required: true, min: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Unit', unitSchema);
