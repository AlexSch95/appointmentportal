# Terminmanagement System

>Die folgende Anwendung ist ein Grundgerüst für ein Portal in dem ein Nutzer Terminanfragen absenden kann. Die eingehenden Terminanfragen werden verbucht und können über das Adminpanel dementsprechend sortiert werden. 

## Schlüsselpunkte

- Absenden einer Terminanfrage wird via API-Call (POST) im Backend gespeichert
- Der Zugriff auf die Daten im Adminbereich findet via API-Call (GET) statt
- Die Datenspeicherung ist aktuell nicht persistiert. Datenbankanbindung nicht vorhanden
- Verwendete Technologien:
    - HTML
    - CSS (Bootstrap)
    - JavaScript
    - ExpressJS (API)
    - Morgan (logging)

## Implementierte Routen und Funktionen

- GET-Request aller vorliegenden Termine
    - Das Laden der aktuell vorliegenden Termine findet automatisch beim Aufruf des Adminbereichs statt
- POST-Request um einen neuen Termin anzufragen
    - Termine werden an die API geschickt und dementsprechend hinterlegt sodass Sie im Adminbereich sichtbar sind
- Annehmen und Ablehnen von Terminen
    - Die Annahme und Ablehnung führt aktuell nur zu einem Alert der als Platzhalter reingeladen ist, hier soll im weiteren Verlauf eine Email erzeugt werden die je nach Button eine Zu- oder Absage sendet


## Weitere Ideen

- Aus dem Adminbereich ein Alternatives Datum vorschlagen und das via Email versenden
- 3 Unterschiedliche Bereiche für die Termine, in der Datenstruktur sind die Voraussetzungen dafür schon gegeben
    - Neue Termine (new: true, accepted: false)
    - bestätigte Termine (accepted: true, new: false)
    - abgelehnte Termine (accepted: false, new: false)