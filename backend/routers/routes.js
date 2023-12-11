const express = require("express");
const router = express.Router();
const Notes = require("../models/notes");

// * Create a new Notes document
router.post("/create-notes", async (req, res) => {
  try {
    const notesData = req.body;
    const createdNotes = new Notes({
      ...notesData,
    });

    await createdNotes.save();
    console.log(new Date().toLocaleString() + " " + "Creating Notes...");

    res.status(201).json({
      status: true,
      message: "Notes document created successfully",
      data: createdNotes,
    });
    console.log(
      new Date().toLocaleString() + " " + "Create Notes Document Successfully!"
    );
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error creating Notes document", error: error.message });
  }
});
465;
// // * Get all Notes documents
router.get("/get-all-notes", async (req, res) => {
  try {
    const notes = await Notes.find();
    if (!notes) {
      console.log("Notes documents not found");
      return res.status(404).json({ message: "Notes not found" });
    }

    console.log("Notes documents retrieved successfully");
    res.status(200).json({ status: true, data: notes });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error getting Notes documents", error: error.message });
  }
});
router.get("/fetchnotes/:todoId", async (req, res) => {
  try {
    const todoId = req.params.todoId;

    const todo = await Notes.findById(todoId);

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// * Update a Notes document by ID
router.put("/updatenotes", async (req, res) => {
  try {
    const notesId = req.body.notesId;
    const updates = req.body;

    const updatedNotes = await Notes.findByIdAndUpdate(notesId, updates, {
      new: true,
    });

    if (!updatedNotes) {
      console.log(`Notes document with ID: ${notesId} not found`);
      return res.status(404).json({
        status: false,
        message: `Notes document with ID: ${notesId} not found`,
      });
    }

    console.log(`Notes document with ID: ${notesId} updated successfully`);
    res.status(200).json({
      status: true,
      message: "Notes document updated successfully",
      data: updatedNotes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Error updating Notes document",
      error: error.message,
    });
  }
});

// * Delete a Notes document by ID
router.delete("/deletenotes", async (req, res) => {
  try {
    const notesId = req.body.id;
    const deletedNotes = await Notes.findByIdAndDelete(notesId);

    if (!deletedNotes) {
      console.log(`Notes document with ID: ${notesId} not found`);
      return res
        .status(404)
        .json({ message: `Notes document with ID: ${notesId} not found` });
    }

    console.log(`Notes document with ID: ${notesId} deleted successfully`);
    res.status(200).json({
      status: true,
      message: "Notes document deleted successfully",
      data: deletedNotes,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error deleting Notes document", error: error.message });
  }
});

// * Delete all Notes documents
router.delete("/delete-all-notes", async (req, res) => {
  try {
    const result = await Notes.deleteMany({});
    if (result.deletedCount === 0) {
      return res.status(404).send({
        status: false,
        message: "No Notes documents found to delete!",
      });
    }

    res.status(200).send({
      status: true,
      message: "All Notes documents have been deleted!",
      data: result,
    });
    console.log(
      new Date().toLocaleString() +
        " " +
        "DELETE All Notes documents Successfully!"
    );
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ message: e.message });
  }
});

router.delete("/clear-complete", async (req, res) => {
  try {
    const deletedNotes = await Notes.deleteMany({ Completed: true });

    if (!deletedNotes) {
      console.log(`Notes document with ID: ${deletedNotes} not found`);
      return res
        .status(404)
        .json({ message: `Notes document with ID: ${deletedNotes} not found` });
    }

    console.log(`Notes document with ID: ${deletedNotes} deleted successfully`);
    res.status(200).json({
      status: true,
      message: "Notes document deleted successfully",
      data: deletedNotes,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error deleting Notes document", error: error.message });
  }
});

module.exports = router;
