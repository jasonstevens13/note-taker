// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");

// const OUTPUT_DIR = path.resolve(__dirname, "db");
// const outputPath = path.join(OUTPUT_DIR, "db.json");

// require("./public/assets/js/index");


// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 9000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



// ROUTES

// HTML Routes:
// notes.html route
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// index.html route
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

// If no matching route is found default to home
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});



// API Routes
app.get("/api/notes", (req, res) => {
    // Use db.json to store and retrieve notes using fs 
    fs.readFile("./db/db.json", "utf-8", (err, dbData) => {
        if (err) throw err;

        const savedNotes = JSON.parse(dbData);

        return savedNotes;
    })

});


// Create a post request to add new note
app.post("/api/notes", (req, res) => {
    fs.readFile("./db/db.json", "utf-8", (err, dbData) => {
        if (err) throw err;

        const savedNotes = JSON.parse(dbData);
        const newNote = req.body;
        savedNotes.push(newNote);

        fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes), (err, data) => {
            if (err) throw err;

            res.json(newNote);
        });
    });

});




// Listener (starts server)
app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
});


