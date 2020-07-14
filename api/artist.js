const mysql = require("mysql");
// IMPORT MYSQL CONFIG
const conn = require('../config/config');
const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    // SQL STATEMENT FOR GETTING ALL ARTIST
    var getQuery = "SELECT * FROM artist";
    conn.query(getQuery, (err,result) => {
        // Check if Error
        if(err){
            // Send a 404 status and message
            res.status(404).send({message: "Some Error", error:err});
        }
        // Check result length        
        if(result.length == 0){
            // If no entry in database send 204 status
            res.status(200).send({message: "No Artist Found"});
        }else{
            // If All good, send result
            res.status(200).send(result);
        }
    });
});

router.get('/ID/:id', (req,res) => {
    let artist_id = req.params.id;
    console.log(isNaN(artist_id))
    if(isNaN(artist_id)){
    // Send a 404 status and message, WHEN ID is non numeric
    res.status(404).send({message: "Invalid Artist ID"});     
    }else{
        var getQuery = `SELECT * FROM artist WHERE artist_id = '${artist_id}'`;
        conn.query(getQuery, (err,result) => {
            console.log(result.length);

            // Check if Error
            if(err){
                // Send a 404 status and message
                res.status(404).send({message: "Some Error", error:err});
            }
            // Check result length        
            if(result.length == 0){
                // If no entry in database send 200rs status
                res.status(200).send({message: "No Artist Found"});
            }else{
                // If All good, send result
                res.status(200).send(result);
            }
        }); 
    }
});

module.exports = router;
