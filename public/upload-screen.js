const form = document.getElementById('eventForm');
const formMessageText = document.getElementsByClassName('form-message-text')[0];
const title = document.getElementById('title');
const details = document.getElementById('details');
const datetime = document.getElementById('datetime');
const location = document.getElementById('location');

form.addEventListener('submit', async function (event) {
    event.preventDefault();

    const locationData = location.value;
    const datetimeData = datetime.value;
    const titleData = title.value;
    const textData = details.value;

    if (!locationData || !textData || !titleData) {
        formMessageText.textContent = `Please complete all fields!`;
        return;
    }

    if (!datetimeData) {
        formMessageText.textContent = 'Please select a date and time!';
        return;
    }

    const date = new Date(datetimeData);
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    };
    const readableDateData = date.toLocaleString('en-GB', options);

    const storyData = {
        location: locationData,
        timeStamp: readableDateData,
        title: titleData,
        text: textData,
    };

    try {
        formMessageText.textContent = '';
        const response = await fetch('./api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(storyData),
        });
        if (response.ok) {
            formMessageText.innerHTML = `Your sighting was uploaded. View it <a href="./story-screen.html">here</a>.`;
            form.reset();
        } else {
            formMessageText.textContent = `The server Ghosted you(!). Please try again.`;
            console.error('Server Error:', response.statusText);
        }
    } catch (error) {
        formMessageText.textContent = `Serious ghouls! Please try again.`;
        console.error('Error:', error);
    }
});
