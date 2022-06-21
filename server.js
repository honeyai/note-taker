let express = require('express');
let app = express();
//let router = express.Router();
let path = require('path');
let port = 3000;
let fs = require('fs');
const routes = require('./Routes/routes.js');

//Middleware
app.use(express.json());
app.use(express.urlencoded( {
  extended: true
}));
app.use(express.static('public'));
app.use('/api/notes', routes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname+'/public/notes.html'));
})

app.listen(port, () => {
  console.log('listening');
})