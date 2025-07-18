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
    const appointmentListGroup = document.getElementById("appointmentList");
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
                    <button class="btn btn-danger m-2" id="declineBtn-${appointmentIndex}" onclick="declineAppointment(${appointmentIndex})" type="button">Ablehnen</button>
                </p>
            </li>
        `;
        appointmentListGroup.innerHTML += newListItem;
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

function acceptAppointment(index) {
    alert("Platzhalter: beim Annehmen einer Terminanfrage wird automatisch eine Mail generiert in der die Ursprüngliche Terminanfrage beinhaltet ist und zeitgleich die Bestätigung, dass der Termin akzeptiert wurde");
}

function declineAppointment(index) {
    alert("Platzhalter: beim Ablehnen einer Terminanfrage wird automatisch eine Mail generiert in der die Ursprüngliche Terminanfrage beinhaltet ist und zeitgleich die Nachricht, dass der Termin abgelehnt wurde");

}

getAppointmentsFromAPI();