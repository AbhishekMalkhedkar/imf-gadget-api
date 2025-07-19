
const express = require("express");
const Gadget = require("../models/Gadget");
const generateCodename = require("../utils/generateCodename");
const router = express.Router();

// GET /gadgets?status=Available
router.get("/", async (req, res) => {
  try {
    const filter = req.query.status ? { status: req.query.status } : {};
    const gadgets = await Gadget.find(filter);
    const withProbability = gadgets.map(g => ({
      ...g.toObject(),
      missionSuccessProbability: `${Math.floor(Math.random() * 101)}%`
    }));
    res.json(withProbability);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch gadgets.", error: err.message });
  }
});

// POST /gadgets
router.post("/", async (req, res) => {
  try {
    const name = generateCodename();
    
    
    const gadget = new Gadget({ name });
    await gadget.save();
    res.status(201).json(gadget);
  } catch (err) {
    res.status(500).json({ message: "Failed to add gadget.", error: err.message });
  }
});

// PATCH /gadgets/:id
router.patch("/:id", async (req, res) => {
  try {
    const gadget = await Gadget.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!gadget) return res.status(404).json({ message: "Gadget not found." });
    res.json(gadget);
  } catch (err) {
    res.status(500).json({ message: "Failed to update gadget.", error: err.message });
  }
});

// DELETE /gadgets/:id
router.delete("/:id", async (req, res) => {
  try {
    const gadget = await Gadget.findByIdAndUpdate(
      req.params.id,
      { status: "Decommissioned", decommissionedAt: new Date() },
      { new: true }
    );
    if (!gadget) return res.status(404).json({ message: "Gadget not found." });
    res.json({ message: "Gadget decommissioned.", gadget });
  } catch (err) {
    res.status(500).json({ message: "Failed to decommission gadget.", error: err.message });
  }
});

// POST /gadgets/:id/self-destruct
router.post("/:id/self-destruct", async (req, res) => {
  try {
    const gadget = await Gadget.findById(req.params.id);
    if (!gadget) return res.status(404).json({ message: "Gadget not found." });

    const confirmationCode = Math.floor(100000 + Math.random() * 900000); // 6-digit code
    // Simulate sending code (e.g., via console)
    console.log(`Self-destruct code for ${gadget.name}: ${confirmationCode}`);

    res.json({ message: `Self-destruct initiated for ${gadget.name}.`, confirmationCode });
  } catch (err) {
    res.status(500).json({ message: "Failed to trigger self-destruct.", error: err.message });
  }
});

module.exports = router;