
let express = require('express');
let app = express();
//let router = express.Router();
let path = require('path');
let port = 3000;
let fs = require('fs');
let notes = require('./db/db.json');

//Middleware
app.use(express.json());
app.use(express.urlencoded( {
  extended: true
}));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.listen(port, () => {
  console.log('listening');
})