let express = require('express');
let app = express();
let port = 3000;
let fs = require('fs');

app.get('/', (req, res) => {
  res.send('Hello')
});

app.get('/api/notes', (req, res) => {
  let data = JSON.parse(fs.readFileSync('../../../db/db.json', 'utf8'));
  res.send(data);
})

app.listen(port, () => {
  console.log('listening');
})