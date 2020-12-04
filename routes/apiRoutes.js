// Dependencies
const fs = require("fs");
const uid = require("uid");
const util = require("util");

// Define const to read and wite files using promisify
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// Module export function
module.exports = function(app) {

    // Get API requests
    app.get("/api/notes", function(req, res){

        // Read db.json file
        readFileAsync("./db/db.json", "utf8").then(data => {

            // Return response as json object
            res.json(db);
        }).catch(err => {
            if(err) throw err;
        })
    });
    
    // Post API requests
    app.post("/api/notes", function(req, res){

        // Read db.json file
        readFileAsync("./db/db.json", "utf8").then(data => {

            // console log
            console.log(req.body);
            // Add id key to req.body
            req.body.id = uid();
            const db = JSON.parse(data);

            // Push post info from req.body
            db.push(req.body);
    
            // Write updated db to db.json
            writeFileAsync("./db/db.json", JSON.stringify(db)).then(() => {
                // Return response as true
                res.json(true)
            });
        }).catch(err => {
            if(err) throw err;
        })
    });

    // Delete API requests
    app.delete("/api/notes/:id", function(req, res){
        
        // Read db.json file
        readFileAsync("./db/db.JSON", "utf8").then(data => {
            const db = JSON.parse(data);

            // Filter DB to exclude deleted, then rewrite db file
            writeFileAsync("./db/db.json",JSON.stringify(db.filter(ele => ele.id != req.params.id)))
            .then(()=>{
                res.json(true);
            })
        }).catch(err => {
            if(err) throw err;
        })
    });
}