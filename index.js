// ====================
// Imporing All Packages
// ====================
const express = require('express');
const app = express();
const bodyParser = require("body-parser");



// Get all Routes
const artist = require('./api/artist');
const album = require('./api/album');
const track = require('./api/track');

// ====================
// Setting up server
// ====================
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// ====================
// using all api routes
// ====================


app.use('/api/artist', artist);
app.use('/api/album', album);
app.use('/api/track', track);



// ====================
// Listen to PORT
// ====================
app.listen(3000, () => {
    console.log('Server Up and Running')
})