const express = require('express');
const {NotesModel} = require('../models/notes.model');


const  notesRouter = express.Router();

notesRouter.get("/",async(req,res)=>{
    try{
        res.send(await NotesModel.find());
    }catch{
        res.send({'msg':'Error while retrieving the data'})
    }
})
notesRouter.get("/:id",async(req,res)=>{
    const id = req.params.id;
    try{
        res.send(await NotesModel.find({userID:id}));
    }catch{
        res.send({'msg':'Error while retrieving the data'})
    }
})


notesRouter.post('/create', async(req,res)=>{
    const data = req.body;
    try{
        const notes = new NotesModel(data);
        await notes.save();
        res.send({'msg':'New Data has been added..'})
    }catch{
        res.send({'msg':'Error while adding a new data..'})
    }
})


notesRouter.patch("/:id",async(req,res)=>{
    const id = req.params.id;
    const data = req.body
    try{
        const updatedData = await NotesModel.findByIdAndUpdate({_id:id})
        res.send(updatedData);
    }catch{
        res.send({'msg':'Error while updating the data'})
    }
})
notesRouter.delete("/:id",async(req,res)=>{
    const id = req.params.id;
    try{
        await NotesModel.findByIdAndDelete({_id:id})
        res.send({'msg':'Deleted the Data'});
    }catch{
        res.send({'msg':'Error while retrieving the data'})
    }
})


module.exports = {notesRouter}