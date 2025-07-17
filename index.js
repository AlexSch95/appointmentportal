let appointmentsLocalStorage = []

function submitAppointment() {
    const bookingName = document.getElementById("bookingName");
    const bookingEmail = document.getElementById("bookingEmail");
    const bookingDate = document.getElementById("bookingDate");
    const bookingMessage = document.getElementById("bookingMessage");
    let newAppointment = {
        name: bookingName.value,
        email: bookingEmail.value,
        date: bookingDate.value,
        message: bookingMessage.value,
    };
    appointmentsLocalStorage.push(newAppointment);
}