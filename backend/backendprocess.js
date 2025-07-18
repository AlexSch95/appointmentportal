const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

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

app.put('/appointments/:appointmentID', (req, res) => {
    const idFromUrl = parseInt(req.params.appointmentID);
    const appointment = bookedAppointments.find(appointment => appointment.id === idFromUrl);
    if (!appointment) {
        return res.status(404).json({error: "Termin nicht gefunden"});
    };
    const { accepted, newAppointment } = req.body;
    appointment.accepted = accepted;
    appointment.new = newAppointment;
    res.status(200).json(appointment)
});

app.delete('/appointments/:appointmentID', (req,res) => {
    // Hole dir die ID aus den URL Parametern und caste sie in einen Integer
    const idFromUrl = parseInt(req.params.appointmentID);
    // Finde den Index von dem Element, wo die Bedingung wahr ist
    const appointmentIndex = bookedAppointments.findIndex(appointment => appointment.id === idFromUrl);
    // Falls nicht gefunden, schmeiße einen Fehler
    // Wir überprüfen auf -1, da findIndex -1 zurückgibt wenn nicht gefunden
    if (appointmentIndex === -1){
        return res.status(404).json({error: "Termin nicht gefunden"});
    };
    // Lösche aus dem todos-Array, das Element an dem Index todoIndex
    bookedAppointments.splice(appointmentIndex, 1);
    res.status(200).json({ message: "Termin wurde gelöscht"});
    // Alternative: nur 204 als Statuscode ohne Message zurückgeben
    // res.status(204).send();

})

app.listen(3001, () => {
    console.log("Server läuft auf http://localhost:3001");
})