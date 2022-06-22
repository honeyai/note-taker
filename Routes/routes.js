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
});

router.delete(`/:id`, (req, res) => {
  console.info(`${req.method} request received to delete a review`);

  const exists = notes.some(note => note.id === req.params.id);
  console.log("exists", exists);
  if (exists) {
    let toDelete = notes.filter(elem => elem.id !== req.params.id);
    notes.pop(toDelete);
    console.log("notes", notes);
    fs.writeFile(path.dirname('../db/db.json'), JSON.stringify(notes, null, " "),
      (err) => {
        if (err)
          console.log(err);
        else {
          console.log("File written successfully\n");
          console.log("The written has the following contents:");
          console.log(fs.readFileSync(path.dirname('../db/db.json'), "utf8"));
        }
      });
    res.json(notes);
  } else {
    res.status("400").json({ message: `${req.params.id} not found.` });
  }
})

module.exports = router;