// Dependencies
const fs = require("fs");

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
    })
    
    // Post API requests
        // Read db.json file
        // console log
        // Add id key to req.body

        // Add Post info from req.body

        // Write updated db to db.json
            // Return response as true
            // if err, throw err

    // Delete API requests
        // Read db.json file
        // Filter DB to exclude deleted, then rewrite db file

}