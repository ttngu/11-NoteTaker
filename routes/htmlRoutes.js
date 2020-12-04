// Dependencies
const path = require("path");

// Page routing
module.exports = function(app) {
    // Note page here to read, write and delete notes, add GET
    app.get("/notes", function (req, res) {
        res.sendFile(path.join(_dirname, "../public/notes.html"));
    });

    // Home page here for other links, add GET
    app.get("*", function (req, res){
        res.sendFile(path.join(_dirname, "../public/index.html"));
    });
    
};