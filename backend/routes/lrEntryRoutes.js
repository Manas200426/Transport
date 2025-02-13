const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const LR = require("../models/LrEntry"); // Import the LR model
const generateLRPdf = require("../utils/generatePdf");
const path = require("path");

// Create a new LR entry
router.post("/", async (req, res) => {
  try {
    // Validate required fields
    if (!req.body.lrNumber || !req.body.invoiceNo || !req.body.table) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newLR = new LR(req.body);
    const savedLR = await newLR.save();
    res.status(201).json(savedLR);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all LR entries
router.get("/", async (req, res) => {
  try {
    const lrEntries = await LR.find();
    res.status(200).json(lrEntries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single LR entry by ID
router.get("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid LR Entry ID" });
    }

    const lrEntry = await LR.findById(req.params.id);
    if (!lrEntry) {
      return res.status(404).json({ message: "LR Entry not found" });
    }
    res.status(200).json(lrEntry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an LR entry by ID
router.put("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid LR Entry ID" });
    }

    const updatedLR = await LR.findByIdAndUpdate(req.params.id, req.body, { 
      new: true, 
      runValidators: true 
    });

    if (!updatedLR) {
      return res.status(404).json({ message: "LR Entry not found" });
    }
    res.status(200).json(updatedLR);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete an LR entry by ID
router.delete("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid LR Entry ID" });
    }

    const deletedLR = await LR.findByIdAndDelete(req.params.id);
    if (!deletedLR) {
      return res.status(404).json({ message: "LR Entry not found" });
    }
    res.status(200).json({ message: "LR Entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Generate PDF for an LR Entry
router.get("/:id/pdf", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid LR Entry ID" });
    }

    const lrEntry = await LR.findById(req.params.id);
    if (!lrEntry) {
      return res.status(404).json({ message: "LR Entry not found" });
    }

    const pdfPath = await generateLRPdf(lrEntry);

    // Send PDF file as response
    res.download(pdfPath, `LR-${lrEntry.lrNumber}.pdf`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

module.exports = router;
