const { json } = require("express");
const express = require("express");
const fs = require("fs");
const path = require("path");


const app = express();
PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "public/index.html"))
});

app.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname, "public/notes.html"))
});

app.get("/api/notes", function(req, res){
    allNotes = fs.readFileSync("db/db.json", "utf-8")
    allNotes = JSON.parse(allNotes)
    res.json(allNotes)
});

app.post("/api/notes", function(req, res){
    allNotes = fs.readFileSync("db/db.json", "utf-8")
    allNotes = JSON.parse(allNotes)
    req.body.id = allNotes.length
    allNotes.push(req.body)
    allNotes = JSON.stringify(allNotes)
    fs.writeFileSync("db/db.json", allNotes)
    allNotes = JSON.parse(allNotes)
    res.json(allNotes)
});

app.delete("/api/notes/:id", function(req, res){
    allNotes = fs.readFileSync("db/db.json", "utf-8")
    allNotes = JSON.parse(allNotes)
    allNotes = allNotes.filter(function(currentNote){
        return currentNote.id != req.params.id
    })
    allNotes = JSON.stringify(allNotes)
    fs.writeFileSync("db/db.json", allNotes)
    allNotes = JSON.parse(allNotes)
    res.json(allNotes)
});

app.listen(PORT, function() {
console.log("server is listening on http://localhost:" + PORT)
})
