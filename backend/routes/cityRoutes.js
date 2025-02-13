const express = require("express");
const City = require("../models/City"); // Import City model
const router = express.Router();

router.post("/add-city", async (req, res) => {
  try {
    const { name, state, country } = req.body;
    const newCity = new City({ name, state, country });
    await newCity.save();
    res.json({ success: true, message: "City added successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error adding city" });
  }
});


router.get("/all", async (req, res) => {
  try {
    const cities = await City.find();
    res.json({ success: true, data: cities });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching cities" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const city = await City.findById(req.params.id);
    if (!city) {
      return res.status(404).json({ success: false, message: "City not found!" });
    }
    res.json({ success: true, data: city });
  } catch (error) {
    console.error("Error fetching city:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});
module.exports = router;
