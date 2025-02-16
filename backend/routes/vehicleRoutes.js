const express = require("express");
const Vehicle = require("../models/Vehicle");

const router = express.Router();

// Get all vehicles
router.get("/", async (req, res) => {
    try {
        const vehicles = await Vehicle.find();
        res.status(200).json(vehicles);
    } catch (error) {
        res.status(500).json({ message: "Error fetching vehicles", error });
    }
});

// Add a new vehicle
router.post("/", async (req, res) => {
    const { vehicleName, vehicleNumber, vehicleOwnership, vehicleType } = req.body;

    if (!vehicleName || !vehicleNumber || !vehicleOwnership || !vehicleType) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const vehicle = new Vehicle({ vehicleName, vehicleNumber, vehicleOwnership, vehicleType });
        await vehicle.save();
        res.status(201).json(vehicle);
    } catch (error) {
        res.status(500).json({ message: "Error creating vehicle", error });
    }
});

module.exports = router;
