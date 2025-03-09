const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

// 🟩 Route 1: Fetch all notes (Login required)
router.get('/fetchallnotes', fetchUser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error("Error fetching notes:", error);
        res.status(500).send("Internal Server Error");
    }
});


// 🟩 Route 3: Add a new note (Login required)
router.post('/addnote', fetchUser, [
    body('title', 'Title is required').notEmpty(),
    body('description', 'Description must be at least 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
        const { title, description, tag } = req.body;

        const newNote = new Notes({
            title,
            description,
            tag,
            user: req.user.id
        });

        const savedNote = await newNote.save();
        res.json(savedNote);
    } catch (error) {
        console.error("Error adding note:", error);
        res.status(500).send("Internal Server Error");
    }
});

// 🟩 Route 4: Update a note (Login required)
router.put('/updatenote/:id', fetchUser, async (req, res) => {
    const { title, description, tag } = req.body;

    try {
        let note = await Notes.findById(req.params.id);
        if (!note) return res.status(404).json({ error: "Note not found" });

        // Check if the note belongs to the logged-in user
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ error: "Unauthorized access" });
        }

        // Update the note
        const updatedNote = await Notes.findByIdAndUpdate(req.params.id, { $set: { title, description, tag } }, { new: true });
        res.json(updatedNote);
    } catch (error) {
        console.error("Error updating note:", error);
        res.status(500).send("Internal Server Error");
    }
});

// 🟩 Route 5: Delete a note (Login required)
router.delete('/deletenote/:id', fetchUser, async (req, res) => {
    try {
        let note = await Notes.findById(req.params.id);
        if (!note) return res.status(404).json({ error: "Note not found" });

        // Check if the note belongs to the logged-in user
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ error: "Unauthorized access" });
        }

        // Delete the note
        await Notes.findByIdAndDelete(req.params.id);
        res.json({ message: "Note deleted successfully" });
    } catch (error) {
        console.error("Error deleting note:", error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
