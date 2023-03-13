const express = require ('express');
const fs = require('fs');
const path = require('path');
const notesData = require('./db/db.json');
const app = express();
const port = process.env.Port || 3001;

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

