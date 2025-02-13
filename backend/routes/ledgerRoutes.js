const express = require("express");
const router = express.Router();
const Ledger = require("../models/Ledger");


// Create Ledger Route
router.post("/create", async (req, res) => {
  try {
    const {
      name,
      alias,           // ✅ New field
      ledgerType,
      mailingName,     // ✅ New field
      address,
      country,
      state,
      city,
      pin,             // ✅ New field
      gst,
      contactPerson,   // ✅ New field
      mobile,
      email,
    } = req.body;

    // ✅ Required field validation
    if (!name || !ledgerType || !email || !mobile) {
      return res.status(400).json({ message: "Name, Ledger Type, Email, and Mobile are required!" });
    }

    // ✅ Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format!" });
    }

    // ✅ Validate mobile number (assuming 10-digit format)
    if (!/^\d{10}$/.test(mobile)) {
      return res.status(400).json({ message: "Invalid mobile number! It should be 10 digits." });
    }

    const newLedger = new Ledger({
      name,
      alias,
      ledgerType,
      mailingName,
      address,
      country,
      state,
      city,
      pin,
      gst,
      contactPerson,
      mobile,
      email,
    });

    await newLedger.save();
    res.status(201).json({ message: "Ledger created successfully!" });

  } catch (error) {
    console.error("Error creating ledger:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



// Fetch All Ledgers (Only Name & Email)
router.get("/all", async (req, res) => {
  try {
    const ledgers = await Ledger.find({}); // Fetch only required fields
    res.json(ledgers);
  } catch (error) {
    console.error("Error fetching ledgers:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Fetch Single Ledger (Full Details for Editing)
const mongoose = require("mongoose");

router.get("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid Ledger ID" });
    }

    const ledger = await Ledger.findById(req.params.id);
    if (!ledger) {
      return res.status(404).json({ message: "Ledger not found" });
    }

    res.json(ledger);
  } catch (error) {
    console.error("Error fetching ledger:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Update Ledger
router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body; // Get all fields from request body

    const updatedLedger = await Ledger.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedLedger) {
      return res.status(404).json({ message: "Ledger not found" });
    }

    res.json({ message: "Ledger updated successfully!", updatedLedger });
  } catch (error) {
    console.error("Error updating ledger:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



module.exports = router;
