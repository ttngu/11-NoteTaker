// Dependencies
const fs = require("fs");
const path = require("path");
const db = require("../db/db.json");
const uuidv1 = require("uuid/v1");
const util = require("util");

// Define const to read and wite files using promisify
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// Module export function
module.exports = function(app) {

    // Get API requests
    app.get("/api/notes", function(req, res){
        // Read db.json file
        return readFileAsync(path.join(__dirname + "/../db/db.json"), "utf8").then(data => {
            // Return response as json object
            res.json(JSON.parse(data));
        }).catch(err => {
            if(err) throw err;
        })
    });
    
    // Post API requests
    app.post("/api/notes", function(req, res){
        const { title, text } = req.body
        console.log(req.body);
        id = uuidv1();
        const newData = {
            id,
            title,
            text,
        }

        let db = readFileAsync(path.join(__dirname + "/../db/db.json"), "utf8").then(data => {
            // Return response as json object
            db =JSON.parse(data);
            db.push(newData);
            fs.writeFile(path.join(__dirname + "/../db/db.json"), JSON.stringify(db), (err) => err ? console.error(err) : console.log("Note added"));
            res.json(db);
        }).catch(err => {
            if(err) throw err;
        })
    });

    
    // Delete API requests
    app.delete("/api/notes/:id", function(req, res){
        
        fs.readFile(path.join(__dirname + "/../db/db.json"), "utf8", (err, data) => {
            if (err) {
                console.log("File read failed:", err)
                return
            }
            try {
                const db = JSON.parse(data)
                for (let i = 0; i < db.length; i++){
                    if (req.params.id === db[i].id){
                        db.splice(i,1);
                        console.log("This is where the data is spliced to remove the obj with the matching ID")
                    }
                }
                res.json(true);
                    
                fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(db), function(err) {
                    if (err) throw err;
                });
            } catch(err) {
                console.log('Error parsing JSON string:', err)
            }
        })



    });

}



