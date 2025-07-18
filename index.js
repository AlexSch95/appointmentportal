async function submitAppointment() {
    const bookingName = document.getElementById("bookingName");
    const bookingEmail = document.getElementById("bookingEmail");
    const bookingDate = document.getElementById("bookingDate");
    const bookingMessage = document.getElementById("bookingMessage");

    let newAppointment = {
        name: bookingName.value,
        email: bookingEmail.value,
        date: bookingDate.value,
        message: bookingMessage.value
    };
    console.log(newAppointment);
    console.log(bookingDate.value)

    try {
        const response = await fetch('http://localhost:3001/appointments', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: bookingName.value,
                email: bookingEmail.value,
                date: bookingDate.value,
                message: bookingMessage.value
            })
        });
        const responseFromAPI = await response.json();
        console.log(responseFromAPI);
    } catch (error) {
        console.error("Ein Fehler ist aufgetreten:", error)
        showError("Es ist ein Fehler beim Buchen des Termins aufgetreten")
    }
}

function showError(message) {
    document.getElementById('errorText').textContent = message;
    // document.getElementById('errorMessage').style.display = 'block';
    document.getElementById('errorMessage').classList.add('show');
    setTimeout(() => {
        document.getElementById('errorMessage').classList.remove('show');
    }, 3000);
}

