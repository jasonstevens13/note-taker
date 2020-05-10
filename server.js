// Dependencies
var express = require("express");
var path = require("path");

// Sets up the Express App
var app = express();
var PORT = 9000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Routes:
// notes.html route
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});
// index.html route
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
})




// Listener (starts server)
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});