// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");

// import { v4 as uuidv4 } from 'uuid';
const { v4: uuidv4 } = require('uuid');
// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 9000;

// Sets up the Express app to handle data parsing (middleware)
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const DB_DIR = path.resolve(__dirname, "db");
const dbPath = path.join(DB_DIR, "db.json");
let dbData = JSON.parse(fs.readFileSync(dbPath, "utf8"));

// ROUTES

// API Routes
// GET route
app.get("/api/notes", (req, res) => {
    return res.json(dbData);
});

// POST route


app.post("/api/notes", (req, res) => {

    //{title:"",text:""}
    const { title, text } = req.body;
    const id = uuidv4();

    const newNote = {
        id, title, text
    };
    // read all notes jsnon parse
    //push the new note
    dbData.push(newNote);
    fs.writeFile(dbPath, JSON.stringify(dbData), function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The note was saved!");
    });
    res.json(newNote);
});



// DELETE route
app.delete("/api/notes/:id", (req, res) => {
    let idDelete = req.params.id;

    //filter dbData 
    dbData = dbData.filter(note => note.id != idDelete);

    fs.writeFile(dbPath, JSON.stringify(dbData), function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The note was deleted!");

    });
    res.json(dbData);
});




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
