const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('data/memory.db');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

