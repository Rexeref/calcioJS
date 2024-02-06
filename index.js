const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./controllers/dbMan.js');

const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

console.log(db.check());
if(!db.check()){
    db.generate();
}
