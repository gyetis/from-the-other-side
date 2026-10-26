const form = document.getElementById('eventForm');
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

    const storyData = {
        location: locationData,
        timeStamp: datetimeData,
        title: titleData,
        text: textData,
    };

    await fetch('./api', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(storyData),
    });
});
