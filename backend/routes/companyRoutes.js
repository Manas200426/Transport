const express = require("express");
const multer = require("multer");
const path = require("path");
const Company = require("../models/Company");

const router = express.Router();

// Configure Multer for File Uploads (Images)
const storage = multer.diskStorage({
  destination: "./uploads/", // Folder where images will be stored
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});
const upload = multer({ storage });

// Route: Add Company Details
router.post("/add", upload.single("logo"), async (req, res) => {
  try {
    const { name, address, CIN, PAN, GSTIN, consignerSupport } = req.body;
    const logo = req.file ? req.file.filename : "";

    const company = new Company({
      name,
      address,
      logo,
      CIN,
      PAN,
      GSTIN,
      consignerSupport,
    });

    await company.save();
    res.status(201).json({ message: "Company details added successfully!", company });
  } catch (error) {
    res.status(500).json({ error: "Error adding company details." });
  }
});

// Route: Get Company Details (Assuming only 1 company exists)
router.get("/get", async (req, res) => {
  try {
    const company = await Company.findOne();
    if (!company) {
      return res.status(404).json({ message: "No company details found." });
    }
    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ error: "Error fetching company details." });
  }
});

module.exports = router;
