const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  logo: { type: String }, // Will store the image file path
  CIN: { type: String, required: true },
  PAN: { type: String, required: true },
  GSTIN: { type: String, required: true },
  consignerSupport: { type: String, required: true }
});

const Company = mongoose.model("Company", companySchema);
module.exports = Company;
