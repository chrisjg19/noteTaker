const express = require ('express');
const fs = require('fs');
const path = require('path');
const notesData = require('./db/db.json');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

app.get('/api/notes', (req, res) =>{
    res.json(notesData)
});
app.get('/api/notes/:id', (req, res) => {
    res.json(notesData[req.params.id])
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    const id = notesData.length.toString();
    newNote.id = id;
    notesData.push(newNote);
    fs.writeFileSync('./db/db.json', JSON.stringify(notesData));
    res.json(newNote);
});

app.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`)
});