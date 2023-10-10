const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser')
const Note = require('../models/Notes')
const {body ,validationResult } = require('express-validator')


// ROUTE: 1 Get all the notes using: GET at /api/notes/fetchallnotes, login required
router.get('/fetchallnotes',fetchUser, async (req, res)=>{
    try {
        const notes = await Note.find({user : req.user.id})
        res.json(notes)
        
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Internal error occured');
    }
})

// ROUTE: 2 Add a new note using: POST at /api/notes/addnote, login required

router.post('/addnote',fetchUser,[
    body('title', 'Enter a Valid Title').isLength({min : 3}),
    body('description', 'description must be atleast 5 characters').isLength(
        {min : 5})
], async (req, res)=>{

    
    // If there are errors, return Bad request along with the error
    
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {title, description, tag} = req.body;

    try {
        const note = new Note({
            title, description, tag, user: req.user.id
    
        })
        const savedNote = await note.save()
        res.json(savedNote)
        
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Internal error occured');
    }
})

// ROUTE: 3 Update an existing note using: PUT at /api/notes/updatenote, login required
router.put('/updatenote/:id',fetchUser, async (req, res)=>{
    const {title, description, tag} = req.body;
    // Create newNote Object
    const newNote = {};
    if (title){
        newNote.title = title;
    }
    if (description){
        newNote.description = description;
    }
    if (tag) {
        newNote.tag = tag;
    }

  // Find the note to be updated
    let note = await Note.findById(req.params.id)
    if(!note){return res.status(404).send("Not Found")}

    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed");
    }
    note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
    res.json(note)

})

module.exports = router;