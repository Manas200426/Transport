const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
    vehicleName: { type: String, required: true },
    vehicleNumber: { type: String, required: true, unique: true },
    vehicleOwnership: { type: String, required: true, enum: ["Owned", "Hired"] },
    vehicleType: { type: String, required: true }
}, { timestamps: true });

const Vehicle = mongoose.model("Vehicle", vehicleSchema);
module.exports = Vehicle;
