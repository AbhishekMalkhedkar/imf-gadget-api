
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const gadgetRoutes = require("./routes/gadgets");
const authRoutes = require("./routes/auth");
const authMiddleware = require("./middlewares/auth");

const app = express();
app.use(express.json());


app.use("/auth", authRoutes);
app.use("/gadgets", authMiddleware, gadgetRoutes);

// Connect DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
    console.log("Database Connected");
    
    app.listen(process.env.PORT, () =>
        console.log(`🚀 Server running on port ${process.env.PORT}`)
  );
}).catch((err) => console.error("❌ MongoDB connection error:", err));
