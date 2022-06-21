const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
let notes = require('../db/db.json');
// API Routes

router.get('/', (req, res) => {
  res.json(notes);
});

router.post('/', (req, res) => {
  console.info(`${req.method} request received to add a review`);
  const { title, text } = req.body;
  console.log(title, text);

  const newNote = {
    id: uuidv4(),
    title,
    text,
  }
  if (newNote.title && newNote.text) {
    notes.push(newNote);
    console.info(notes);
    fs.writeFile(path.dirname('../db/db.json'), JSON.stringify(newNote),
      (err) => {
        if (err)
          console.log(err);
        else {
          console.log("File written successfully\n");
          console.log("The written has the following contents:");
          console.log(fs.readFileSync(path.dirname('../db/db.json'), "utf8"));
        }
      });

    const response = {
      status: 'success',
      body: newNote,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json('Error in posting new note');
  }
})
module.exports = router;