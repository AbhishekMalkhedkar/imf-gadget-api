const mongoose = require("mongoose");

const gadgetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Available", "Deployed", "Destroyed", "Decommissioned"],
    default: "Available",
  },
  decommissionedAt: {
    type: Date,
    default: null,
  },
}, { timestamps: true });

module.exports = mongoose.model("Gadget", gadgetSchema);
