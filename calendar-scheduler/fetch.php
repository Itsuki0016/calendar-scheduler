<?php
header('Content-Type: application/json');
require_once 'db.php';

try {
    $stmt = $pdo->query("SELECT * FROM events ORDER BY date ASC");
    $events = [];

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        // メインの予定（カレンダー表示用）
        $events[] = [
            'title' => "{$row['username']}：{$row['title']}",
            'start' => $row['date'],
            'color' => $row['deadline'] && $row['deadline'] < date('Y-m-d') ? '#999999' : null // 締切切れはグレー
        ];

        // 締切も別のイベントとして表示（色付き）
        if (!empty($row['deadline'])) {
            $events[] = [
                'title' => "〆切：{$row['title']}",
                'start' => $row['deadline'],
                'color' => '#ff0000'
            ];
        }
    }

    echo json_encode($events);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'データ取得に失敗しました: ' . $e->getMessage()]);
    exit;
}
