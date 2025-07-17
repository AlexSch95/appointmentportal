const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

app.use(express.json())
app.use(morgan('dev'));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

let bookedAppointments = [
    {id: 1, name: "Max Mustermann", email: "Max.Mustermann@Mustermail.com", date: "2025-07-17T13:30", message: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam odit architecto impedit exercitationem unde illum atque cum voluptates, voluptatum, adipisci quae consectetur ut vel ipsum quo voluptatem animi a reprehenderit.", new: true, accepted: false},
    {id: 2, name: "Hans Müller", email: "Hans.Mueller@Mustermail.com", date: "2025-07-17T13:30", message: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam odit architecto impedit exercitationem unde illum atque cum voluptates, voluptatum, adipisci quae consectetur ut vel ipsum quo voluptatem animi a reprehenderit.", new: true, accepted: false},

]

app.get('/', (req, res) => {
    res.send("Success")
})

app.get("/appointments", (req, res) => {
    res.status(200).json(bookedAppointments)
})

app.post("/appointments", (req, res) => {
    const { name, email, date, message } = req.body;
    if (!name || !email || !date || !message) {
        return res.status(400).json({error: "Unvollständige Daten übermittelt"})
    }
    const incomingAppointment = {
        id: bookedAppointments[bookedAppointments.length - 1].id + 1,
        name: name,
        email: email,
        date: date,
        message: message,
        new: true,
        accepted: false
    }
    bookedAppointments.push(incomingAppointment)
    res.status(201).json(incomingAppointment)
})

app.listen(3000, () => {
    console.log("Server läuft auf http://localhost:3000");
})