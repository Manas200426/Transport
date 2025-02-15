const express = require("express");
const router = express.Router();
const LedgerType = require("../models/LedgerType");

// @route   POST /api/ledger-types
// @desc    Create a new ledger type
router.post("/", async (req, res) => {
  try {
    const { type } = req.body;

    if (!type) {
      return res.status(400).json({ message: "Type is required" });
    }

    // Check if the type already exists
    const existingType = await LedgerType.findOne({ type });
    if (existingType) {
      return res.status(400).json({ message: "Ledger type already exists" });
    }

    const newLedgerType = new LedgerType({ type });
    await newLedgerType.save();

    res.status(201).json(newLedgerType);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// @route   GET /api/ledger-types
// @desc    Get all ledger types
router.get("/", async (req, res) => {
  try {
    const ledgerTypes = await LedgerType.find();
    res.status(200).json(ledgerTypes);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

module.exports = router;
