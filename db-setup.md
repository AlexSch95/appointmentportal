## Database Setup
1. Öffne mysql in deiner Git Bash, indem du `mysql -u root -p` eingibst
2. Überprüfe, welche Datenbanken bei dir lokal liegen mit `SHOW DATABASES;`
3. Wir legen uns eine neue Datenbank an mit dem folgenden Befehl:
```sql
CREATE DATABASE appointment_app;
```
4. Mit `SHOW DATABASES;` können wir das ganze überprüfen
Wir legen uns einen User mit den passenden Berechtigungen für die neue Datenbank an
```sql
CREATE USER 'appointment_user'@'localhost' IDENTIFIED BY 'password123';
GRANT ALL PRIVILEGES ON appointment_app.* TO 'appointment_user'@'localhost';
FLUSH PRIVILEGES;
```
5. Wir erstellen die Tabelle mit dem folgenden Befehl
```sql
USE appointment_app;
CREATE TABLE appointmentlist (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    date DATETIME NOT NULL,
    message TEXT,
    newAppointment BOOLEAN NOT NULL DEFAULT TRUE,
    accepted BOOLEAN NOT NULL DEFAULT FALSE
);
```
6. Überprüfen kannst du das mit
```sql
USE appointment_app;
SHOW TABLES;
```
7. Wir fügen Testdaten hinzu mit
```sql
INSERT INTO appointmentlist (name, email, date, message) VALUES 
('Anna Müller', 'anna.mueller@example.com', '2025-07-22T11:20', 'Fragen zu Produkt X'),
('Julia Schmidt', 'julia.schmidt@example.com', '2025-07-23T15:10', 'Rückruf erwünscht'),
('Michael Bauer', 'michael.bauer@example.com', '2025-07-24T08:45', 'Termin für Vorstellungsgespräch'),
('Sarah König', 'sarah.koenig@example.com', '2025-07-25T14:00', 'Beratungstermin benötigt'),
('David Wagner', 'david.wagner@example.com', '2025-07-26T10:30', 'Anfrage Projektbesprechung'),
('Lisa Hoffmann', 'lisa.hoffmann@example.com', '2025-07-27T13:15', 'Fragen zur Rechnung'),
('Markus Weber', 'markus.weber@example.com', '2025-07-28T09:45', 'Terminbestätigung?'),
('Nina Schwarz', 'nina.schwarz@example.com', '2025-07-29T16:20', 'Dringende Anfrage'),
('Tobias Meyer', 'tobias.meyer@example.com', '2025-07-30T12:00', 'Follow-Up Meeting'),
('Sophie Lehmann', 'sophie.lehmann@example.com', '2025-07-31T17:30', 'Erstberatung gewünscht'),
('Alexander Fischer', 'alexander.fischer@example.com', '2025-08-01T09:30', 'Bitte um Rückmeldung'),
('Claudia Neumann', 'claudia.neumann@example.com', '2025-08-02T14:15', 'Angebotsanfrage'),
('Felix Richter', 'felix.richter@example.com', '2025-08-03T10:00', 'Technische Beratung'),
('Hannah Vogel', 'hannah.vogel@example.com', '2025-08-04T16:45', 'Terminänderung benötigt'),
('Jan Keller', 'jan.keller@example.com', '2025-08-05T11:10', 'Kundengespräch'),
('Katrin Wolf', 'katrin.wolf@example.com', '2025-08-06T13:50', 'Rechnungsklärung'),
('Lukas Huber', 'lukas.huber@example.com', '2025-08-07T08:20', 'Vertragsunterzeichnung'),
('Melanie Sommer', 'melanie.sommer@example.com', '2025-08-08T15:30', 'Produktschulung'),
('Oliver Krause', 'oliver.krause@example.com', '2025-08-09T12:40', 'Projektabschluss'),
('Petra Winter', 'petra.winter@example.com', '2025-08-10T17:00', 'Neukundenberatung');
```

8. Überprüfe das mit `SELECT * FROM appointmentlist;`