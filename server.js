// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 9000;

// Sets up the Express app to handle data parsing (middleware)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const DB_DIR = path.resolve(__dirname, "db");
const dbPath = path.join(DB_DIR, "db.json");
const dbData = JSON.parse(fs.readFileSync(dbPath, "utf8"));

// ROUTES

// API Routes
// GET route
app.get("/api/notes", (req, res) => {
    return res.json(dbData);
});

// POST route


app.post("/api/notes", (req, res) => {

    const newNote = req.body;

    fs.writeFile("db/db.json", JSON.stringify(newNote))
    res.json(newNote);
});

// DELETE route
// app.delete("/api/notes/:id", (req, res) => {


// };





// HTML Routes:
// notes.html route
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});


// // index.html route OR If no matching route is found default to this home
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});


// Listener (starts server)
app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
});
