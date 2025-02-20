const mongoose = require("mongoose");

const lrSchema = new mongoose.Schema({
  lrNumber: { type: String, required: true, unique: true, index: true },
  lrDate: { type: Date, required: true },
  consignorName: { type: String, required: true },
  consigneeName: { type: String, required: true },
  ewayBillNo: { type: String, required: true, unique: true, index: true },
  ewayBillDate: { type: Date, required: true },
  expiryDate: { 
    type: Date, 
    required: true, 
    validate: {
      validator: function(value) {
        return value >= this.ewayBillDate;
      },
      message: "Expiry date should be after or equal to e-way bill date"
    }
  },
  invoiceNo: { type: String, required: true },
  invoiceDate: { type: Date, required: true },
  invoiceAmount: { type: Number, required: true },
  toPay: { type: Number, required: true },
  transportType: { type: String, required: true },
  vehicleNo: { 
    type: String, 
    required: true
  },
  from: { type: String, required: true },
  to: { type: String, required: true },
  table: [{
// HSN Code for tax classification
    productDescription: { type: String, required: true },// Description of the product
    hsnCode: { type: String, required: true }, 
    rate: { type: Number, required: true },
    unit: { type: Number, required: true }, // Units (e.g., kg, liter, pcs)
    taxableAmount: { type: Number} // Taxable amount per item
  }],
  total: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model("LR", lrSchema);
