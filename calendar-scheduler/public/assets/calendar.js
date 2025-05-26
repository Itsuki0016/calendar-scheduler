const calendar = document.getElementById("calendar");
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();

function renderCalendar() {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    let html = "<tr>";
    const daysOfWeek = ["日", "月", "火", "水", "木", "金", "土"];

    // 曜日ヘッダー
    html += daysOfWeek.map(day => `<th>${day}</th>`).join("") + "</tr><tr>";

    // 空白埋め
    for (let i = 0; i < firstDay.getDay(); i++) {
        html += "<td></td>";
    }

    // 日付表示
    for (let date = 1; date <= lastDay.getDate(); date++) {
        const current = new Date(year, month, date);
        html += `<td>${date}</td>`;
        if (current.getDay() === 6) html += "</tr><tr>";
    }

    calendar.innerHTML = html + "</tr>";
}

renderCalendar();

// 取得して表示も可
fetch('/api/events')
    .then(res => res.json())
    .then(data => {
        console.log("取得イベント:", data);
    });