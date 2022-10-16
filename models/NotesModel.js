const mongoose = require('mongoose');
const NoteSchema = mongoose.Schema({
    noteTitle: {
        type: String,
        required: true,
        lowercase: true
    },
    noteDescription: String,
    priority:{
        type: String,
        enum: ['HIGH', 'LOW', 'MEDUIM']
    },
    dateAdded: Date,
    dateUpdated: Date
})
const Note = mongoose.model('Note', NoteSchema)
module.exports = Note