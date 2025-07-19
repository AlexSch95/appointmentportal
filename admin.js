let bookedAppointmentsLocal = []

async function getAppointmentsFromAPI() {
    try {
        const response = await fetch('http://localhost:3001/appointments');
        const responseJson = await response.json();
        if (!response.ok){
            throw new Error(`HTTP Error: ${response.status}`);
        }
        responseJson.forEach(appointment => {
            bookedAppointmentsLocal.push(appointment);
        });
        console.log(bookedAppointmentsLocal);
        renderOpenAppointments();
    } catch (error) {
        console.error(error);
    } finally {
        //wird immer ausgeführt am Ende
    }
}


function renderOpenAppointments() {
    const unacceptedGroup = document.getElementById("unacceptedAppointmentList");
    const acceptedGroup = document.getElementById("acceptedAppointmentList");
    unacceptedGroup.innerHTML = "";
    acceptedGroup.innerHTML = "";
    for (let appointmentIndex = 0; appointmentIndex < bookedAppointmentsLocal.length; appointmentIndex++) {
        const currentAppointment = bookedAppointmentsLocal[appointmentIndex];
        const formattedDate = transformDate(currentAppointment.date);
        const newListItem = `
            <li class="list-group-item m-3" id="appointmentItem-${appointmentIndex}">
                <p class="m-2 p-2">
                    <span id="bookedName-${appointmentIndex}">${currentAppointment.name}</span><br>
                    <span id="bookedEmail-${appointmentIndex}">(${currentAppointment.email})</span><hr>
                </p>
                    <p class="m-2 p-2"><span id="bookedMessage-${appointmentIndex}">${currentAppointment.message}</span>
                </p><hr>
                <p class="m-2 p-2">
                    <span id="bookedDate-${appointmentIndex}">${formattedDate}</span>
                </p>
                <p class="text-center m-2 p-2">
                    <button class="btn btn-success m-2" id="acceptBtn-${appointmentIndex}" onclick="acceptAppointment(${appointmentIndex})" type="button">Akzeptieren</button>
                    <button class="btn btn-danger m-2" id="declineBtn-${appointmentIndex}" onclick="declineAppointment(${appointmentIndex})" type="button">Löschen</button>
                </p>
            </li>
        `;
        const acceptedListItem = `
            <li class="list-group-item m-3" id="appointmentItem-${appointmentIndex}">
                <p class="m-2 p-2">
                    <span id="bookedName-${appointmentIndex}">${currentAppointment.name}</span><br>
                    <span id="bookedEmail-${appointmentIndex}">(${currentAppointment.email})</span><hr>
                </p>
                    <p class="m-2 p-2"><span id="bookedMessage-${appointmentIndex}">${currentAppointment.message}</span>
                </p><hr>
                <p class="m-2 p-2">
                    <span id="bookedDate-${appointmentIndex}">${formattedDate}</span>
                </p>
                <p class="text-center m-2 p-2">
                    <button class="btn btn-danger m-2" id="declineBtn-${appointmentIndex}" onclick="declineAppointment(${appointmentIndex})" type="button">Löschen</button>
                </p>
            </li>
        `;
        switch (currentAppointment.accepted) {
            case 1:
                acceptedGroup.innerHTML += acceptedListItem
                break;
        
            case 0:
                unacceptedGroup.innerHTML += newListItem;
                break;
        }
    }
}

function transformDate(originalDate) {
    const date = new Date(originalDate);

    const datePart = date.toLocaleDateString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    const timePart = date.toLocaleTimeString('de-DE', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });

    const formattedDate = `${datePart} um ${timePart} Uhr`;
    return formattedDate; // "17.07.2025 um 13:30 Uhr"
}

async function acceptAppointment(index) {
    const appointmentID = bookedAppointmentsLocal[index].id
    const appointment = bookedAppointmentsLocal[index]
    try {
        const response = await fetch(`http://localhost:3001/appointments/${appointmentID}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify({
            accepted: 1,
            newAppointment: 0
            })
        });
        if (!response.ok){
            throw new Error(`HTTP Error: ${response.status}`);
        }
        const formattedDate = transformDate(appointment.date);

        const mailRecipient = appointment.email;
        const mailName = appointment.name;
        const mailTopic = appointment.message;
        const mailSubject = `Ihr Termin am ${formattedDate} wurde bestätigt`
        const mailBody = `Guten Tag ${mailName},\n\nHiermit bestätigen wir Ihre Anfrage für einen Termin am ${formattedDate} mit dem Anlass "${mailTopic}".\n\nMit freundlichen Grüßen,\nMax Mustermann`;;
        window.location.href = `mailto:${mailRecipient}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;
        bookedAppointmentsLocal = [];
        getAppointmentsFromAPI();
    } catch (error) {
        console.error(error);
    }
}

async function declineAppointment(index) {
    const appointmentID = bookedAppointmentsLocal[index].id
    const appointment = bookedAppointmentsLocal[index]
    try {
        const response = await fetch(`http://localhost:3001/appointments/${appointmentID}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        };
        const formattedDate = transformDate(appointment.date);

        const mailRecipient = appointment.email;
        const mailName = appointment.name;
        const mailTopic = appointment.message;
        const mailSubject = `Ihr Termin am ${formattedDate} wurde leider abgelehnt`
        const mailBody = `Guten Tag ${mailName},\n\nLeider müssen wir Ihnen berichten, dass wir Ihren Termin am ${formattedDate} mit dem Anlass "${mailTopic}" nicht realisieren können.\n\nMit freundlichen Grüßen,\nMax Mustermann`;;
        window.location.href = `mailto:${mailRecipient}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;
        bookedAppointmentsLocal = [];
        getAppointmentsFromAPI();
    } catch (err) {
        console.error(`Fehler beim Löschen: ${err.name}: ${err.message}`);
    } finally {
        alert("Platzhalter: beim Ablehnen einer Terminanfrage wird automatisch eine Mail generiert in der die Ursprüngliche Terminanfrage beinhaltet ist und zeitgleich die Nachricht, dass der Termin abgelehnt wurde. Der Termin wird unwiederruflich entfernt");
    }

}

getAppointmentsFromAPI();