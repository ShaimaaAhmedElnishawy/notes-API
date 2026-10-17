const noteService = require('../services/noteService');

const createNotes = async(req,res)=>{
    try{

        const {title,content} = req.body;
        const userId = req.user.userId;
        const note = await noteService.createNote(title,content,userId);

        res.status(201).json({
            success:true , 
            message:'Note created successfully' , 
            data:note
        });
    }catch(error){
        res.status(400).json({
            success:false , 
            message:error.message
        });
    }
};

const getNotes = async(req,res)=>{
    try{
        const userId = req.user.userId;
        const notes = await noteService.getNotes(userId);

        res.status(200).json({
            success:true , 
            message:'Notes fetched successfully' , 
            count : notes.length,
            data:notes
        });
    }catch(error){
        res.status(400).json({
            success:false , 
            message:error.message
        });
    }
};


const updateNote = async(req,res)=>{
    try{
        const {id} = req.params;
        const userId = req.user.userId;
        const updatedNote = await noteService.updateNote(id,userId,req.body);

        res.status(200).json({
            success:true , 
            message:'Note updated successfully' , 
            data:updatedNote
        });
    }catch(error){
        res.status(404).json({
            success:false , 
            message:error.message
        });
    }
};

const deleteNote = async(req,res)=>{
    try{
        const {id} = req.params;
        const userId = req.user.userId;
        const deletedNote = await noteService.deleteNote(id,userId);

        res.status(200).json({
            success:true , 
            message:'Note deleted successfully' 
    });
    }catch(error){
        res.status(404).json({
            success:false , 
            message:error.message
        });
    }
};    

module.exports = {
    createNotes,
    getNotes,
    updateNote,
    deleteNote
};