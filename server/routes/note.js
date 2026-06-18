import express from 'express'
import Note from '../models/Note.js'
import middleware from '../middleware/middleware.js';

const router = express.Router()

// api to add anew note
router.post('/add', middleware, async (req, res) => {
   try{
       const { title, description } = req.body;
       

       const newNote = new Note({
        title,
        description,
        userId: req.user.id
       })

       await newNote.save()

       return res.status(200).json({success: true, message: "Note Created Successfully"})
    } catch(error){
        return res.status(500).json({success: false, message: "Error in Adding Note"})
    }
})

//api for retrieving notes based on the user logged in 
router.get('/',middleware, async (req,res) => {
    try{
        const notes = await Note.find({userId : req.user.id})
        return res.status(200).json({success: true, notes})
    } catch(error){
        return res.status(500).json({success: false, message: "Cannot Retrieve Notes"})
    }
})
//api for edit
router.put("/:id", async (req, res) => {
    try{
        const{id} = req.params;
        const updateNote = await Note.findByIdAndUpdate(id, req.body)
        return res.status(200).json({success: true, updateNote})
    }catch(error){
        return res.status(500).json({success: false, message: "Cannot Update Notes"})
    }
})

//api for delete
router.delete("/:id", async (req, res) => {
    try{
        const{id} = req.params;
        const updateNote = await Note.findByIdAndDelete(id)
        return res.status(200).json({success: true, updateNote})
    }catch(error){
        return res.status(500).json({success: false, message: "Cannot Delete Notes"})
    }
})

export default router;