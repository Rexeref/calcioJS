const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./controllers/dbMan.js');
const fs = require("fs");

const app = express();

if (!fs.existsSync(db.position)) {
    console.log("WARN: File DB è assente, creazione in corso");
    db.generate();
    db.insertExample();
    console.log("  ... Completato");
}

app.set('view engine', 'pug');
app.set('views', './views');

//db.insertNewMatch(3, 2, 5, 0);
//db.insertNewSquad("Roma");

var data = db.readAllMatches();
console.log(data);