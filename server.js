// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 9000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Routes:
// notes.html route
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});
// index.html route
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});




// Listener (starts server)
app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
});