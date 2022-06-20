const express = require('express');
const router = express.Router();
// API Routes

app.get('/', (req, res) => {
  res.json(notes);
});

// app.get('/notes', (req, res) => {
//   res.sendFile(path.join(__dirname+'/public/notes.html'));
// })

app.get('/api/notes', (req, res) => {
  let data = JSON.parse(fs.readFileSync(notes, 'utf8'));
  res.send(data);
});

module.exports = router;