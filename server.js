// Dependancies
const express = require("express");
// Configuration
const app = express();

// Declaring PORT
const PORT = process.env.PORT || 8080;

// Middlewear
app.use(express.urlencoded({extended: true}));
app.use(express.json()); 

// We need a middlewear to have our css and javascript files be loaded from the public folder
app.use(express.static('public'))
// app.use(express.static("db"));

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// Start server listener
app.listen(PORT, () => {
    console.log("App listening on PORT: " + PORT);
})