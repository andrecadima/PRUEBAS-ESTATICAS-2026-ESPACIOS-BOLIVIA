// Calendario_de_eventos_script.js
document.addEventListener('DOMContentLoaded', function () {
    let calendarEl = document.getElementById('calendar');

    let calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        events: function (fetchInfo, successCallback, failureCallback) {
            fetch('https://api.example.com/events') // Cambia esta URL por la de tu API
                .then(response => response.json())
                .then(data => {
                    let events = data.map(event => {
                        return {
                            title: event.title,
                            start: event.start,
                            end: event.end,
                            description: event.description
                        };
                    });
                    successCallback(events);
                })
                .catch(error => {
                    console.error('Error fetching events:', error);
                    failureCallback(error);
                });
        }
    });

    calendar.render();
});
