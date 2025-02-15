const mongoose = require("mongoose");

const LedgerTypeSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    unique: true, // Ensures no duplicate types
    trim: true
  }
});

const LedgerType = mongoose.model("LedgerType", LedgerTypeSchema);
module.exports = LedgerType;
