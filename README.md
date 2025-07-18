# Terminmanagement System (Mini-Projekt 17.07.2025 - 18.07.2025)

>Die folgende Anwendung ist ein Grundgerüst für ein Portal in dem ein Nutzer Terminanfragen absenden kann. Die eingehenden Terminanfragen werden verbucht und können über das Adminpanel dementsprechend sortiert werden. 

## Schlüsselpunkte

- Absenden einer Terminanfrage wird via API-Call (POST) im Backend gespeichert
- Der Zugriff auf die Daten im Adminbereich findet via API-Call (GET) statt
- Die Datenspeicherung ist aktuell nicht persistiert. Datenbankanbindung nicht vorhanden
- Verwendete Technologien:
    - HTML
    - CSS (Bootstrap Studio)
    - JavaScript
    - ExpressJS (API)
    - Morgan (logging)

## Webseitenbereich "Buchen" (index.html / index.js)

### index.html
- In der index.html können via Formular neue Termine an die API gesendet werden, diese werden dort im Localstorage hinterlegt.

### index.js
- Die Verarbeitung der im Formular eingetragenen Daten findet hier statt
    - Funktionen
        - async function submitAppointment()
            - die Funktion wird beim klicken auf "Anfrage einreichen" aufgerufen
            - die Daten aus den Eingabefeldern werden via API-Fetch ans Backend versendet
                - Name
                - Email
                - Datum
                - Nachricht
                - alle weiteren Daten werden automatisch Backendseitig gesetzt
        - function showError()
            - die Funktion wird aufgerufen wenn Fehler beim abschicken eines Termins auftreten
            - keine direkte Kommunikation mit dem Backend

## Webseitenbereich "Adminportal" (admin.html / admin.js)

### admin.html
- Beim Aufruf der Seite werden die Termine aus dem Backend geladen und je nach Status (accepted: true/false) in den entsprechenden Bereich gerendert
- Termine im Bereich "Ausstehende Bearbeitung" sind mit 2 Buttons versehen
    - Akzeptieren: Ändert den Status der Eigenschaft "accepted" auf true, wird dementsprechend automatisch in den Bereich "Akzeptierte Termine" verschoben
    - Löschen: Löscht den Termin via DELETE-Request
- Termine im Bereich "Akzeptierte Termine" sind nur mit dem Löschen Button ausgestattet

### admin.js
- Die Darstellung der Daten aus unsererm Backend findet hier mit diversen Funktionen statt
    - Funktionen
        - async function getAppointmentsFromAPI()
            - eine relativ kompakte Funktion die via fetch alle Termine vom Backend holt und Sie im lokalen Array "bookedAppointmentsLocal" abspeichert
            - Ausserdem wird hier automatisch die Render-Funktion aufgerufen (renderOpenAppointments())
        - function renderOpenAppointments()
            - der Inhalt der 2 Anzeigebereiche wird beim Funktionsaufruf geleert
            - in einer for-Schleife wird abhängig vom Status (accepted: true/false) ein Listen-Item im jeweiligen Bereich erstellt (ausstehend/akzeptiert)
        - function transformDate()
            - Eine Hilfsfunktion um das Datum aus dem Objekt in einen Lesbaren Zeitstempel zu Transformieren
            - Format "YYYY-MM-DDTHH:mm" wird zu "DD.MM.YYY um HH:mm Uhr"
        - async function acceptAppointment(index)
            - Wird via drücken auf den Akzeptieren Button eines Termins aufgerufen mit übergabe des index des zu akzeptierenden Objekts
            - Innerhalb der Funktion wird ein fetch mit der methode PUT durchgeführt. Die Eigenschaften "accepted" und "newAppointment" werden angepasst.
            - Nach dem fetch werden die Daten von der API erneut angefordert via Funktionsaufruf von getAppointmentsFromAPI() (noch nicht Optimal)
            - ein Alert wird als Platzhalter für die automatische generierung einer Email angezeigt.
        - async function declineAppointment(index)
            - Wird via drücken auf den Löschen Button eines Termins aufgerufen mit übergabe des index des zu löschenden Objekts
            - Innerhalb der Funktion wird ein fetch mit der methode DELETE durchgeführt. Der jeweilige Termin wird dementsprechend Backendseitig gelöscht.
            - Nach dem fetch werden die Daten von der API erneut angefordert via Funktionsaufruf von getAppointmentsFromAPI() (noch nicht Optimal)
            - ein Alert wird als Platzhalter für die automatische generierung einer Email angezeigt.

## ExpressJS API (backend/backendprocess.js)

- Definierte Routen
    - GET-Request aller vorliegenden Termine
        - Das Laden der aktuell vorliegenden Termine findet automatisch beim Aufruf des Adminbereichs statt
    - POST-Request um einen neuen Termin anzufragen
        - Termine werden an die API geschickt und dementsprechend hinterlegt sodass Sie im Adminbereich sichtbar sind
    - PUT-Request um den Status eines Termins zu ändern (Funktional PATCH)
        - Der Status "accepted" wird beim drücken auf den Akzeptieren Button als API-Call ans Backend gemeldet, im Backend wird das Lokal gespeicherte Objekt dementsprechend verändert.
    - DELETE-Request um einen, zur Bearbeitung ausstehenden, Termin zu löschen
        - Beim Drücken auf den Löschen Button wird der API gemeldet, dass der Termin mit der jeweiligen ID gelöscht werden soll.


## Weitere Ideen

- Aus dem Adminbereich ein Alternatives Datum vorschlagen und das via Email versenden