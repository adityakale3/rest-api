const mysql = require("mysql");
// IMPORT MYSQL CONFIG
const conn = require('../config/config');
const express = require('express');
const router = express.Router();


// Get all artist
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

// Get artist by ID
router.get('/ID/:id', (req,res) => {
    let artist_id = req.params.id;
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
                res.status(404).send({message: "No Artist Found"});
            }else{
                // If All good, send result
                res.status(200).send(result);
            }
        }); 
    }
});


// Add New Artist
router.post('/', (req,res) => {
    var artist_name = req.body.artist_name;
    if(isNaN(artist_name)){
        if(artist_name.length > 4){
            var sqlAddArtist = `INSERT INTO artist (name) VALUE ('${artist_name}')`;
            conn.query(sqlAddArtist, (err,result) => {
                if(err){
                // Send a 404 status and message
                res.status(404).send({message: "Some Error", error:err});
                } 
                    if(result.length == 0){
                    // If no entry in database send 200rs status
                    res.status(404).send({message: "Error Inserting Artist", info : result});
                    }else{
                        // If All good, send result
                        console.log(result);
                        res.status(200).send(result);                        
                    }

            });

        }else{
            res.status(200).send({message: "Artist Name too small"});
        }
    }else{
        res.status(400).send({message: "Artist Name must be a String"});
    }

});

// Update Artist By Artist
router.put('/:id', (req,res) => {
    let artist_id = req.params.id;
    console.log(isNaN(artist_id), artist_id);
    if(isNaN(artist_id)){
    // Send a 404 status and message, WHEN ID is non numeric
    res.status(404).send({message: "Invalid Artist ID"});     
    }else{
        var getQuery = `SELECT * FROM artist WHERE artist_id = '${artist_id}'`;
        conn.query(getQuery, (err,result) => {
            // Check if Error
            if(err){
                // Send a 404 status and message
                res.status(404).send({message: "Some Error", error:err});
            }else{
            // Check result length        
            if(result.length == 0){
                // If no entry in database send 200rs status
                res.status(404).send({message: "Artist ID not Found"});
            }else{
                var artist_name = req.body.artist_name;
                if(isNaN(artist_name)){
                    if(artist_name.length > 4){
                        var sqlUpdate = `UPDATE artist SET name = '${artist_name}' WHERE artist_id = '${artist_id}'`; 
                        conn.query(sqlUpdate, (err1, result1) => {
                            console.log(result1);
                            if(err1){
                            // Send a 404 status and message
                            res.status(404).send({message: "Some Error", error:err1});
                            }else{
                            // Check result length        
                            if(result1.length == 0){
                                // If no entry in database send 200rs status
                                res.status(404).send({message: "Artist ID not Found"});
                            }else{
                                // If no entry in database send 200 status
                                res.status(200).send({message: "Artist Updated", result1});
                            }
                          }
                        });
                    }else{
                        res.status(404).send({message: "Artist Name too short"});                        
                    }
                }
                // If All good, send result
                res.status(200).send(result);
            }
         }
        }); 
    }    
});

// Delete Artist By ID

module.exports = router;
