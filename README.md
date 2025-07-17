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

---

## Implementierte Routen und funktionen

- GET-Request aller vorliegenden Termine
    - Das Laden der aktuell vorliegenden Termine findet automatisch beim Aufruf des Adminbereichs statt