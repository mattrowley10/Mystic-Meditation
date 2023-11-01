const express = require("express");
const meditationsRouter = express.Router();
const meditationsAdapter = require("../Database/adapters/meditations");

meditationsRouter.post("/meditations", async (req, res) => {
  try {
    const { title, description, duration, content } = req.body;
    const newMeditation = await meditationsAdapter.insertMeditation(
      title,
      description,
      duration,
      content
    );
    res.status(201).json(newMeditation);
  } catch (error) {
    console.error("Error creating new meditation", error);
    res.status(500).json({ error: "Internal Service Error" });
  }
});

meditationsRouter.get("/meditations/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const meditation = await meditationsAdapter.getMeditationById(id);
    res.status(200).json(meditation);
  } catch (error) {
    console.error("Error getting a meditation by ID", error);
    res.status(500).json({ error: "Internal Service Error" });
  }
});

meditationsRouter.get("/meditations", async (req, res) => {
  try {
    const meditations = await meditationsAdapter.listMeditations();
    res.status(200).json(meditations);
  } catch (error) {
    console.error("Error listing meditations", error);
    res.status(500).json({ error: "Internal Service Error" });
  }
});

meditationsRouter.put("/meditations/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, duration, description, content } = req.body;
    const updatedMeditation = await meditationsAdapter.updateMeditation(
      id,
      title,
      duration,
      description,
      content
    );
    res.status(200).json(updatedMeditation);
  } catch (error) {
    console.error("Error updating meditation", error);
    res.status(500).json({ error: "Internal Service Error" });
  }
});

meditationsRouter.delete("/meditations/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await meditationsAdapter.deleteMeditation(id);
    res.status(204).json("Meditation Deleted Successfully");
  } catch (error) {
    console.error("Error deleting meditation", error);
    res.status(500).json({ error: "Internal Service Error" });
  }
});

module.exports = meditationsRouter;
