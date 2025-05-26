// イベント取得
fetch('/api/events')
    .then(res => res.json())
    .then(data => {
        console.log("取得イベント:", data);
        // カレンダーに描画処理を書く
    });

// 追加・削除用処理もここに追加可能