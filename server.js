// Dependencies
const express = require("express");
const bodyParser = require('body-parser');
const path = require("path");
const fs = require("fs");

// const OUTPUT_DIR = path.resolve(__dirname, "db");
// const outputPath = path.join(OUTPUT_DIR, "db.json");
// require("./public/assets/js/index");


// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 9000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const routes = require('./routes/routes.js')(app, fs);







// Listener (starts server)
app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
});
