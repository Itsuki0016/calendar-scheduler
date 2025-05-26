document.addEventListener("DOMContentLoaded", () => {
    const calendar = document.getElementById("calendar");
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    function renderCalendar(y, m) {
        const firstDay = new Date(y, m, 1);
        const lastDay = new Date(y, m + 1, 0);
        const daysOfWeek = ["日", "月", "火", "水", "木", "金", "土"];

        let html = "<thead><tr>" + daysOfWeek.map(day => `<th>${day}</th>`).join("") + "</tr></thead><tbody><tr>";

        for (let i = 0; i < firstDay.getDay(); i++) {
            html += "<td></td>";
        }

        for (let date = 1; date <= lastDay.getDate(); date++) {
            const current = new Date(y, m, date);
            const yyyy_mm_dd = `${y}-${String(m + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
            html += `<td data-date="${yyyy_mm_dd}">${date}</td>`;
            if (current.getDay() === 6) html += "</tr><tr>";
        }

        html += "</tr></tbody>";
        calendar.innerHTML = html;

        // クリックで予定追加
        calendar.querySelectorAll("td[data-date]").forEach(td => {
            td.addEventListener("click", () => {
                const date = td.dataset.date;
                const title = prompt(`${date} の予定を入力してください:`);
                if (title) {
                    fetch("/api/events", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            title,
                            date,
                            username: "guest",
                            deadline: null,
                            created_at: new Date().toISOString()
                        })
                    })
                    .then(res => res.json())
                    .then(result => {
                        alert("予定を登録しました！");
                        // 必要なら再描画やマーク更新
                    });
                }
            });
        });
    }

    renderCalendar(year, month);
});
