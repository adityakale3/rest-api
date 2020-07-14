const mysql = require("mysql");
// IMPORT MYSQL CONFIG
const conn = require('../config/config');
const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {

    // SQL STATEMENT FOR GETTING ALL ARTIST
    var getQuery = "SELECT * FROM artist";

    conn.query(getQuery, (err,result) => {
        if(err){
            res.status(404).send({message: "Some Error", error:err});
        }
        res.status(200).send(result);
    });


});



module.exports = router;
