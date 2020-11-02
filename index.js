var express = require('express')
const bodyParser = require('body-parser')
var app = express()

// middleware for application/json type content
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true 
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.get('/', function (req, res) {
  res.json({ data: 'hello world'})
})
require('./movie/routes/movie.routes.js')(app);
app.listen(3000)