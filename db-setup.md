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
('Thomas', 'thomas@mail.com', '2025-07-17T13:30', 'Hallo ich bins, Thomas'),
('Martin', 'martin@mail.com', '2025-07-18T10:15', 'Terminanfrage von Martin'),
('Stefan', 'stefan@mail.com', '2025-07-19T14:45', 'Stefan möchte einen Termin'),
('Peter', 'peter@mail.com', '2025-07-20T09:00', 'Peter fragt nach Verfügbarkeit'),
('Max', 'max@mail.com', '2025-07-21T16:30', 'Max braucht Beratung');
```

8. Überprüfe das mit `SELECT * FROM appointmentlist;`