const express = require('express');
const router = express.Router();
const Unit = require('../models/Unit');

// Create a new unit
router.post('/units', async (req, res) => {
    try {
        const { type, symbol, formalName, unitQualityCode, decimalPlaces } = req.body;
        const newUnit = new Unit({ type, symbol, formalName, unitQualityCode, decimalPlaces });
        await newUnit.save();
        res.status(201).json({ message: "Unit created successfully", unit: newUnit });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all units
router.get('/units', async (req, res) => {
    try {
        const units = await Unit.find();
        res.status(200).json(units);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get unit by ID
router.get('/units/:id', async (req, res) => {
    try {
        const unit = await Unit.findById(req.params.id);
        if (!unit) return res.status(404).json({ message: "Unit not found" });
        res.status(200).json(unit);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update unit by ID
router.put('/units/:id', async (req, res) => {
    try {
        const updatedUnit = await Unit.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUnit) return res.status(404).json({ message: "Unit not found" });
        res.status(200).json({ message: "Unit updated successfully", unit: updatedUnit });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete unit by ID
router.delete('/units/:id', async (req, res) => {
    try {
        const deletedUnit = await Unit.findByIdAndDelete(req.params.id);
        if (!deletedUnit) return res.status(404).json({ message: "Unit not found" });
        res.status(200).json({ message: "Unit deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
