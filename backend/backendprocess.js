const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { connectToDatabase } = require("./db.js");

const app = express();

app.use(express.json())
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

let bookedAppointments = [
    {id: 1, name: "Max Mustermann", email: "Max.Mustermann@Mustermail.com", date: "2025-07-17T13:30", message: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam odit architecto impedit exercitationem unde illum atque cum voluptates, voluptatum, adipisci quae consectetur ut vel ipsum quo voluptatem animi a reprehenderit.", newAppointment: true, accepted: false},
    {id: 2, name: "Hans Müller", email: "Hans.Mueller@Mustermail.com", date: "2025-07-17T13:30", message: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam odit architecto impedit exercitationem unde illum atque cum voluptates, voluptatum, adipisci quae consectetur ut vel ipsum quo voluptatem animi a reprehenderit.", newAppointment: true, accepted: false},
    {id: 3, name: "Peter Peterson", email: "Peter.Peterson@Mustermail.com", date: "2025-07-17T13:30", message: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam odit architecto impedit exercitationem unde illum atque cum voluptates, voluptatum, adipisci quae consectetur ut vel ipsum quo voluptatem animi a reprehenderit.", newAppointment: false, accepted: true},
    {id: 4, name: "Franz Franziskus", email: "Franz.Franziskus@Mustermail.com", date: "2025-07-17T13:30", message: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam odit architecto impedit exercitationem unde illum atque cum voluptates, voluptatum, adipisci quae consectetur ut vel ipsum quo voluptatem animi a reprehenderit.", newAppointment: false, accepted: true},

]

app.get('/', (req, res) => {
    res.send("Success")
})

app.get("/appointments", async (req, res) => {
    try {
        const connection = await connectToDatabase();
        const [rows] = await connection.execute('SELECT * FROM appointmentlist;');
        await connection.end();
        res.status(200).json(rows);
    } catch (error) {
        console.error("Fehler beim laden der Termine", error);
        res.status(500).json({error: "Fehler beim Laden der Termine"});
    }
});

app.post("/appointments", async (req, res) => {
    try {
        const { name, email, date, message } = req.body;
        if (!name || !email || !date || !message) {
            return res.status(400).json({error: "Unvollständige Daten übermittelt"})
        }
        const connection = await connectToDatabase();
        const [result] = await connection.execute("INSERT INTO appointmentlist (name, email, date, message) VALUES (?, ?, ?, ?)", [name, email, date, message]);
        await connection.end();
        res.status(201).json({id: result.insertId});
    } catch (error) {
        console.error("Fehler beim erstellen des Termins", error);
        res.status(500).json({error: "Fehler beim erstellen des Termins"});
    }
})

app.put('/appointments/:appointmentID', async (req, res) => {
    try {
        const idFromUrl = parseInt(req.params.appointmentID);
        const { accepted, newAppointment } = req.body;
        if (accepted === undefined || newAppointment === undefined || isNaN(idFromUrl)){
            return res.status(400).json({error: "Unvollständige Daten übermittelt"})
        }
        const connection = await connectToDatabase();
        const [result] = await connection.execute("UPDATE appointmentlist SET accepted = ?, newAppointment = ? WHERE id = ?", [accepted, newAppointment, idFromUrl])
        await connection.end();
        if (result.affectedRows === 0) {
            return res.status(404).json({error: "Termin nicht gefunden"});
        };
        res.status(200).json({message: "Termin wurde angepasst", changes: result.affectedRows})
    } catch (error) {
        console.error("Fehler beim ändern des Termins", error);
        res.status(500).json({error: "Fehler beim ändern des Termins"});
    }
});

app.delete('/appointments/:appointmentID', async (req,res) => {
    try {
        const idFromUrl = parseInt(req.params.appointmentID);
        if (isNaN(idFromUrl)){
            return res.status(400).json({error: "Es wurde kein korrekter Parameter genutzt"})
        }
        const connection = await connectToDatabase();
        const [result] = await connection.execute("DELETE FROM appointmentlist WHERE id = ?;", [idFromUrl])
        await connection.end();
        if (result.affectedRows === 0) {
            return res.status(404).json({error: "Termin nicht gefunden"});
        };
        res.status(200).json({message: "Termin wurde gelöscht", changes: result.affectedRows})
    } catch (error) {
        console.error("Fehler beim löschen des Termins", error);
        res.status(500).json({error: "Fehler beim löschen des Termins"});
    }
})

app.listen(3001, () => {
    console.log("Server läuft auf http://localhost:3001");
})