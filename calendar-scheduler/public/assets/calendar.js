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
        eventClick: function (info) {
            const eventId = info.event.id;

            if (!eventId) return;

            if (confirm(`この予定「${info.event.title}」を削除しますか？`)) {
                fetch('delete.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: `id=${eventId}`
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        info.event.remove();
                    } else {
                        alert('削除に失敗しました');
                    }
                })
                .catch(() => alert('通信エラーが発生しました'));
            }
        },
        events: './fetch.php'
    });

    calendar.render();
});
