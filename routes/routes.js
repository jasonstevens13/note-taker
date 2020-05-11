

let dbData = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

// ROUTES

// API Routes

app.get("/api/notes", (req, res) => {
    return res.json(dbData);
});



// Create a post request to add new note
app.post("/api/notes", (req, res) => {

    let newNote = req.body;
    // how do I add a new unique id here automatically?

    // Do I have to read the db.json and then push the new note to it...??????
    let savedNotes = dbData.push(json(newNote));

    fs.writeFileSync("./db/db.json", savedNotes, (err, data) => {
        if (err) throw err;

        res.json(savedNotes);
    });


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





