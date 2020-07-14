const mysql = require("mysql");
// IMPORT MYSQL CONFIG
const conn = require('../config/config');
const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    res.send('All Caught Up');
});



module.exports = router;
