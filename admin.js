let bookedAppointments = [
    {id: 1, name: "Max Mustermann", email: "Max.Mustermann@Mustermail.com", date: "2025-07-17T13:30", message: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam odit architecto impedit exercitationem unde illum atque cum voluptates, voluptatum, adipisci quae consectetur ut vel ipsum quo voluptatem animi a reprehenderit.", new: true, accepted: false},
    {id: 2, name: "Hans Müller", email: "Hans.Mueller@Mustermail.com", date: "2025-07-17T13:30", message: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam odit architecto impedit exercitationem unde illum atque cum voluptates, voluptatum, adipisci quae consectetur ut vel ipsum quo voluptatem animi a reprehenderit.", new: true, accepted: false},

]


function renderOpenAppointments() {
    const appointmentListGroup = document.getElementById("appointmentList");
    for (appointment of bookedAppointments) {
        const formattedDate = transformDate(appointment.date);
        const newListItem = `
            <li class="list-group-item m-3" id="appointmentItem-${appointment}">
                <p class="m-2 p-2">
                    <span id="bookedName-${appointment}">${appointment.name}</span><br>
                    <span id="bookedEmail-${appointment}">(${appointment.email})</span>
                </p>
                    <p class="m-2 p-2"><span id="bookedMessage-${appointment}">${appointment.message}</span>
                </p>
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

renderOpenAppointments();