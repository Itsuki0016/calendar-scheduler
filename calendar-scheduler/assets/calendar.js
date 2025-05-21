document.addEventListener('DOMContentLoaded', function () {
    const calendarEl = document.getElementById('calendar');

    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'ja',
        selectable: true,
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: ''
        },
        dateClick: function (info) {
            const dateInput = document.getElementById('eventDate');
            dateInput.value = info.dateStr;

            const modal = new bootstrap.Modal(document.getElementById('eventModal'));
            modal.show();
        },
        events: './fetch.php'
    });

    calendar.render();
});
