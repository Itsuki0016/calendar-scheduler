document.addEventListener("DOMContentLoaded", () => {
    const calendar = document.getElementById("calendar");
    const modal = document.getElementById("modal");
    const modalDate = document.getElementById("modal-date");
    const eventList = document.getElementById("event-list");
    const eventInput = document.getElementById("event-input");
    const saveBtn = document.getElementById("save-event");
    const closeBtn = document.getElementById("close-modal");

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    let eventsByDate = {};  // { '2025-05-28': [{ title: '会議' }, ...] }

    function renderCalendar(y, m) {
        const firstDay = new Date(y, m, 1);
        const lastDay = new Date(y, m + 1, 0);
        const daysOfWeek = ["日", "月", "火", "水", "木", "金", "土"];

        let html = "<thead><tr>" + daysOfWeek.map(d => `<th>${d}</th>`).join("") + "</tr></thead><tbody><tr>";

        for (let i = 0; i < firstDay.getDay(); i++) html += "<td></td>";

        for (let d = 1; d <= lastDay.getDate(); d++) {
            const date = `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
            html += `<td data-date="${date}">${d}`;
            if (eventsByDate[date]) {
                html += eventsByDate[date].map(e => `<div class='event-mark'>• ${e.title}</div>`).join("");
            }
            html += `</td>`;
            if (new Date(y, m, d).getDay() === 6) html += "</tr><tr>";
        }

        html += "</tr></tbody>";
        calendar.innerHTML = html;

        calendar.querySelectorAll("td[data-date]").forEach(td => {
            td.addEventListener("click", () => openModal(td.dataset.date));
        });
    }

    function openModal(date) {
        modal.classList.remove("hidden");
        modalDate.textContent = date;
        eventInput.value = "";
        renderEventList(date);
    }

    function closeModal() {
        modal.classList.add("hidden");
    }

    function renderEventList(date) {
        const list = eventsByDate[date] || [];
        eventList.innerHTML = list.map(e => `<li>${e.title}</li>`).join("");
    }

    saveBtn.addEventListener("click", () => {
        const title = eventInput.value.trim();
        const date = modalDate.textContent;
        if (!title) return;

        fetch("/api/events", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title,
                date,
                username: "guest",
                deadline: null,
                created_at: new Date().toISOString()
            })
        })
        .then(res => res.json())
        .then(() => {
            if (!eventsByDate[date]) eventsByDate[date] = [];
            eventsByDate[date].push({ title });
            renderCalendar(year, month);
            openModal(date);
        });
    });

    closeBtn.addEventListener("click", closeModal);

    fetch("/api/events")
        .then(res => res.json())
        .then(data => {
            data.forEach(e => {
                if (!eventsByDate[e.date]) eventsByDate[e.date] = [];
                eventsByDate[e.date].push(e);
            });
            renderCalendar(year, month);
        });
});