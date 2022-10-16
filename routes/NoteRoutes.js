const noteModel = require('../models/NotesModel');
const express = require('express');
const app = express.Router();
//http://mongoosejs.com/docs/api.html#document_Document-save
app.post('/notes', (req, res) => {
   const note = new noteModel(req.body);
    note.save().then((note) => {
        res.send(note);
    }).catch((err) => {
        res.status(500).send({
            message: err.message || "couldnt add the note."
        });
    });
});

//TODO - Retrieve all Notes
//http://mongoosejs.com/docs/api.html#find_find
app.get('/notes', async (req, res) => {
    try{
        const note = await noteModel.find()
        res.status(200).send(note)
        }
        catch(error)
        {
            res.status(500).send({message: "no notes found"})
        }
});

//TODO - Retrieve a single Note with noteId
//http://mongoosejs.com/docs/api.html#findbyid_findById
app.get('/notes/:noteId', async(req, res) => {
    // Validate request
    try 
    {
        const noteId = await noteModel.findById(req.params.noteId)
        res.status(200).send(noteId)
    }
    catch(error)
    {
        res.status(500).send({message: "no notes found"})
    }
});

//TODO - Update a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandupdate_findByIdAndUpdate
app.patch('/notes/:noteId', async(req, res) => {
    // Validate request
    try
    {
        const updateNote = await noteModel.findByIdAndUpdate(req.params.noteId, req.body)
        res.status(200).send(updateNote)
    }
    catch(error)
    {
        res.status(500).send({message: "Note not found"})
    }
});

//TODO - Delete a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandremove_findByIdAndRemove
app.delete('/notes/:noteId', async(req, res) => {
    // Validate request
    try
    {
        const deleteNote = await noteModel.findByIdAndRemove(req.params.noteId)
        if(!deleteNote)
        {
            res.status(404).send({message: "Note not found to delete"})
        }
        res.status(200).send({message: "Note deleted successfully"})
    }
    catch(error)
    {
        res.status(400).send(error)
    }
});
module.exports = app