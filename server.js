let express = require('express');
let app = express();
//let router = express.Router();
let path = require('path');
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

app.listen(process.env.PORT || 3000, () => {
  console.log('listening');
})