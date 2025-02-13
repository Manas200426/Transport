const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    
    try {
      const admin = await Admin.findOne({ username, password });
  
      if (!admin) {
        return res.status(401).json({ message: "Invalid Credentials" });
      }
  
      // Simulating a session token
      const sessionToken = Math.random().toString(36).substring(2);
  
      res.status(200).json({
        message: "Login Successful",
        adminId: admin._id,
        sessionToken: sessionToken,  // Send this to the frontend
      });
  
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  });
  
  

module.exports = router;
