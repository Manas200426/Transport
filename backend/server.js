const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();
const authRoutes = require("./routes/authRoutes");
const ledgerRoutes = require("./routes/ledgerRoutes");
const cityRoutes = require("./routes/cityRoutes");
const companyRoutes = require("./routes/companyRoutes");
const lrRoutes = require("./routes/lrEntryRoutes"); 
const ledgerTypeRoutes = require("./routes/ledgerTypeRoutes");

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/ledger", ledgerRoutes);
app.use("/api/cities", cityRoutes);
app.use("/uploads", express.static("uploads")); // Serve images from uploads folder
app.use("/api/company", companyRoutes);
app.use("/api/lr", lrRoutes);
app.use("/api/ledger-types", ledgerTypeRoutes);


mongoose.connect("mongodb://localhost:27017/ledgerDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.listen(5000, () => console.log("Server running on port 5000"));
