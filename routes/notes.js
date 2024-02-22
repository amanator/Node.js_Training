const express = require('express');
const Notes = require('../models/Notes')
const router = express.Router();

// Route 1: Get Notes  using : GET request
router.get('/fetchallnotes', async (req, res) => {

    const notes = await Notes.find();
    res.json(notes);

})

// Route 2: Add a new Notes  using : POST "/api/notes/addnotes" 
router.post('/addnote', async (req, res) => {

    try {

        const { title, description} = req.body;
        console.log(title)
        console.log(description)

   

        const note = new Notes({
            title, description
        })

        const saveNote = await note.save();

        res.json(saveNote);

    } catch (error) {
        return res.status(400).json({ errors: error.array() });
    }

})

// Route 3: Update an existing Notes  using : POST "/api/notes/updatenotes" 
router.put('/updatenotes/:id',  async (req, res) => {

    try {
        
    const {title,description} = req.body;
    // Create newNote object

    const newNote = {};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
   


    // Find the note to be updates
    let note = await Notes.findById(req.params.id);
    // If no Note Exist
    if(!note){return res.status(404).send("Not Found")}


    note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
    res.json({note});

    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
})


// Route 4: Delete an existing Notes  using : POST "/api/notes/deletenotes" 
router.delete('/deletenotes/:id', async (req, res) => {

    try {
        
    
    const {title,description} = req.body;
    console.log(req.params.id)
    // Find the note to be deleted and delete it
    let note = await Notes.findById(req.params.id);
    // If no Note Exist
    if(!note){return res.status(404).send("Not Found")}

    note = await Notes.findByIdAndDelete(req.params.id, {new:true})
    res.json({"Success":"Note has been deleted"});
    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
})

module.exports = router