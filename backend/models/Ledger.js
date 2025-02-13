const mongoose = require("mongoose");

const LedgerSchema = new mongoose.Schema({
  name: { type: String, required: true }, 
  alias: { type: String }, // ✅ Added alias field
  ledgerType: { type: String, required: true }, 
  mailingName: { type: String }, // ✅ Added mailing name
  address: { type: String }, 
  country: { type: String }, 
  state: { type: String }, 
  city: { type: String }, 
  pin: { type: String }, // ✅ Added pin (string to handle leading zeros)
  gst: { type: String }, 
  contactPerson: { type: String }, // ✅ Added contact person
  mobile: { type: String, required: true }, 
  email: { type: String, required: true },
});

module.exports = mongoose.model("Ledger", LedgerSchema);
