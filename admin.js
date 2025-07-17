let bookedAppointmentsLocal = []

async function getAppointmentsFromAPI() {
    try {
        const response = await fetch('http://localhost:3000/appointments');
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
    for (appointment of bookedAppointmentsLocal) {
        const formattedDate = transformDate(appointment.date);
        const newListItem = `
            <li class="list-group-item m-3" id="appointmentItem-${appointment}">
                <p class="m-2 p-2">
                    <span id="bookedName-${appointment}">${appointment.name}</span><br>
                    <span id="bookedEmail-${appointment}">(${appointment.email})</span><hr>
                </p>
                    <p class="m-2 p-2"><span id="bookedMessage-${appointment}">${appointment.message}</span>
                </p><hr>
                <p class="m-2 p-2">
                    <span id="bookedDate-${appointment}">${formattedDate}</span>
                </p>
                <p class="text-center m-2 p-2">
                    <button class="btn btn-success m-2" id="acceptBtn-${appointment}" type="button">Akzeptieren</button>
                    <button class="btn btn-danger m-2" id="declineBtn-${appointment}" type="button">Ablehnen</button>
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

getAppointmentsFromAPI();