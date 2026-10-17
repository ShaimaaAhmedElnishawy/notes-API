const Note = require('../models/Notes');
const mongoose = require('mongoose');

const createNote = async (title , content , userId)=>{
    const note = new Note({title , content , userId})
    await note.save();
    return note;
};

const getNotes = async (userId)=>{
    const notes = await Note.find({userId});
    return notes;
};

const updateNote = async (noteId , userId , updateData)=>{

    if(!mongoose.Types.ObjectId.isValid(noteId)){
        throw new Error ('invalid note id format');
    }

    const note = await Note.findOne({
        _id: new mongoose.Types.ObjectId(noteId),
        userId: new mongoose.Types.ObjectId(userId)
    });

    if (!note){
        throw new Error ('note not found');
    }

    note.title = updateData.title || note.title;
    note.content = updateData.content || note.content;
    await note.save();
    return note;

};

const deleteNote = async (noteId , userId)=>{

    if(!mongoose.Types.ObjectId.isValid(noteId)){
        throw new Error ('invalid note id format');
    }

    const note = await Note.findOneAndDelete({
        _id: new mongoose.Types.ObjectId(noteId),
        userId: new mongoose.Types.ObjectId(userId)
    });

    if(!note){
        throw new Error('Note not found');
    }

    return {message:'Note deleted successfully'}
};

module.exports ={
    createNote,
    getNotes,
    updateNote,
    deleteNote
};
